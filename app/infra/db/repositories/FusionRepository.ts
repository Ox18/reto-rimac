import { dynamoDB } from "../connection/DbConnection";
import { CreateFusionRepository } from "../../../data/protocols/db/repositories/fusion/CreateFusionRepository";
import { FindFusionRepository } from "../../../data/protocols/db/repositories/fusion/FindFusionRepository";
import { PaginatedRepository } from "../../../data/protocols/db/repositories/fusion/PaginatedRepository";
import { CreateFusion } from "../../../domain/usecases/CreateFusionados";
import { FindFusionados } from "../../../domain/usecases/FindFusionados";
import { PaginatedFusionados } from "../../../domain/usecases/PaginatedFusionados";

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

  async findFusion(
    data: FindFusionados.Params
  ): Promise<FindFusionados.Response> {
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
    const page = Number(data.page);
    const limit = Number(data.limit) || 10;

    // Calcular el inicio y fin para el rango de elementos a recuperar
    const start = (page - 1) * limit;

    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: TABLE,
      ExclusiveStartKey:
        start > 0 ? { fusionKey: start.toString() } : undefined,
      Limit: limit,
    };

    // Ejecutar la consulta
    const result = await dynamoDB.scan(params).promise();

    const items =
      result?.Items && Array.isArray(result.Items)
        ? result.Items.map((item) => item.data)
        : [];

    // Calcular el total de registros
    const total = await this.getTotalCount();

    return {
      data: items.sort((a, b) => a.id - b.id),
      total,
      page,
      limit,
    };
  }

  private async getTotalCount(): Promise<number> {
    const countParams: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: TABLE,
      Select: "COUNT",
    };

    const result = await dynamoDB.scan(countParams).promise();
    return result?.Count || 0;
  }
}
