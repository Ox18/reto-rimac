import { dynamoDB } from "../connection/DbConnection";
import { CreateFusionRepository } from "../../../data/protocols/db/repositories/fusion/CreateFusionRepository";
import { FindFusionRepository } from "../../../data/protocols/db/repositories/fusion/FindFusionRepository";
import { PaginatedRepository } from "../../../data/protocols/db/repositories/fusion/PaginatedRepository";
import { CreateFusion } from "../../../domain/usecases/CreateFusionados";
import { FindFusionados } from "../../../domain/usecases/FindFusionados";
import { PaginatedFusionados} from "../../../domain/usecases/PaginatedFusionados";

const TABLE = process.env.DYNAMODB_FUSION_TABLE || "FusionTable";

export class FusionRepository
  implements FindFusionRepository, CreateFusionRepository, PaginatedRepository
{
  constructor() {}

  async create(data: CreateFusion.Params): Promise<CreateFusion.Response> {
    const params = {
      TableName: TABLE,
      Item: {
        fusionKey: String(data.id),
        data,
      },
    };

    await dynamoDB.put(params).promise();

    return true;
  }

  async findFusion(data: FindFusionados.Params): Promise<FindFusionados.Response> {
    const params = {
      TableName: TABLE,
      Key: {
        fusionKey: String(data.characterId),
      },
    };

    const result = await dynamoDB.get(params).promise();

    return result.Item ? (result.Item.data as FindFusionados.Response) : null;
  }

  async paginated(
    data: PaginatedFusionados.Params
  ): Promise<PaginatedFusionados.Response> {
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
      data: items.sort((a, b) => a.id - b.id),
      total: items.length,
      page,
      limit,
    };
  }
}
