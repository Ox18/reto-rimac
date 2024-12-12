import { dynamoDB } from "../connection/DbConnection";
import { CreatePersonalizadoRepository } from "../../../data/protocols/db/repositories/personalizado/CreateRepository";
import { CreatePersonalizado } from "../../../domain/usecases/CreatePersonalizado";
import * as uuid from "uuid";

const TABLE = process.env.DYNAMODB_PERSONALIZADO_TABLE || "personalizedTable";

export class PersonalizadoRepository implements CreatePersonalizadoRepository {
  constructor() {}

  private randomId(): string {
    return uuid.v4();
  }

  async create(
    data: CreatePersonalizado.Params
  ): Promise<CreatePersonalizado.Result> {
    const payload = {
      id: this.randomId(),
      ...data,
    };

    const params = {
      TableName: TABLE,
      Item: {
        perId: payload.id,
        data: payload,
      },
    };

    await dynamoDB.put(params).promise();

    return payload;
  }
}
