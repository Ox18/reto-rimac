import { dynamoDB } from "../connection/DbConnection";
import { CreateFusionRepository } from "../../../data/protocols/db/repositories/fusion/CreateFusionRepository";
import { FindFusionRepository } from "../../../data/protocols/db/repositories/fusion/FindFusionRepository";
import { PaginatedRepository } from "../../../data/protocols/db/repositories/fusion/PaginatedRepository";
import { CreateFusion } from "../../../domain/usecases/CreateFusion";
import { FindFusion } from "../../../domain/usecases/FindFusion";
import { PaginatedFusion } from "../../../domain/usecases/PaginatedFusion";

const TABLE = process.env.DYNAMODB_FUSION_TABLE || "FusionTable";

export class FusionRepository
  implements FindFusionRepository, CreateFusionRepository, PaginatedRepository
{
  constructor() {}

  async create(data: CreateFusion.Params): Promise<CreateFusion.Response> {
    const params = {
      TableName: TABLE,
      Item: {
        fusionKey: String(data.character_id),
        data,
      },
    };

    await dynamoDB.put(params).promise();

    return true;
  }

  async findFusion(data: FindFusion.Params): Promise<FindFusion.Response> {
    const params = {
      TableName: TABLE,
      Key: {
        fusionKey: String(data.characterId),
      },
    };

    const result = await dynamoDB.get(params).promise();

    return result.Item ? (result.Item.data as FindFusion.Response) : null;
  }

  async paginated(
    data: PaginatedFusion.Params
  ): Promise<PaginatedFusion.Response> {
    const fusionKeys = [];

    const page = Number(data.page);
    const limit = Number(data.limit) || 10;

    const start = (page - 1) * limit;
    const end = page * limit + 1;

    for (let i = start; i < end; i++) {
      fusionKeys.push(i.toString());
    }

    const params: AWS.DynamoDB.DocumentClient.BatchGetItemInput = {
      RequestItems: {
        [TABLE]: {
          Keys: fusionKeys.map((key) => ({
            fusionKey: key,
          })),
        },
      },
    };

    const result = await dynamoDB.batchGet(params).promise();

    const items =
      result?.Responses && result.Responses[TABLE]
        ? result.Responses[TABLE].map((item) => item.data)
        : [];

    return {
      data: items.sort((a, b) => a.character_id - b.character_id),
      total: items.length,
      page,
      limit,
    };
  }
}
