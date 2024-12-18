import { dynamoDB } from "../connection/DbConnection";
import { CreatePersonalizadoRepository } from "../../../data/protocols/db/repositories/personalizado/CreateRepository";
import { CreatePersonalizado } from "../../../domain/usecases/CreatePersonalizado";
import * as uuid from "uuid";
import AWSXRay from "aws-xray-sdk";

const TABLE = process.env.DYNAMODB_PERSONALIZADO_TABLE || "personalizedTable";

export class PersonalizadoRepository implements CreatePersonalizadoRepository {
  constructor() {}

  private randomId(): string {
    return uuid.v4();
  }

  async create(
    data: CreatePersonalizado.Params
  ): Promise<CreatePersonalizado.Result> {
    const id = this.randomId();

    AWSXRay.captureFunc(
      "## PersonalizadoRepository.create",
      async (subsegment) => {
        if (subsegment) {
          subsegment.addAnnotation("id", id);
          subsegment.close();
        }
      }
    );

    const payload = {
      id,
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
