import { dynamoDB } from "../connection/DbConnection";
import AWSXRay from "aws-xray-sdk";

const RATE_LIMITING_TABLE =
  process.env.DYNAMODB_RATE_LIMITING_TABLE || "RateLimitingTable";

export class RateLimitingRepository {
  private table: string = RATE_LIMITING_TABLE;

  constructor(private readonly service: string = "") {}

  async findByIp(ip: string): Promise<any> {
    AWSXRay.captureFunc(
      "## RateLimitingRepository.findByIp",
      async (subsegment) => {
        if (subsegment) {
          subsegment.addAnnotation("ip", ip);
          subsegment.close();
        }
      }
    );

    const rateKey = this.getKey(ip);

    const params = {
      TableName: this.table,
      Key: {
        rateKey,
      },
    };

    const response = await dynamoDB.get(params).promise();

    return response.Item;
  }

  async incrementCounter(ip: string, ttl: number): Promise<void> {
    AWSXRay.captureFunc(
      "## RateLimitingRepository.incrementCounter",
      async (subsegment) => {
        if (subsegment) {
          subsegment.addAnnotation("ip", ip);
          subsegment.close();
        }
      }
    );

    const rateKey = this.getKey(ip);
    const updateParams = {
      TableName: RATE_LIMITING_TABLE,
      Key: { rateKey },
      UpdateExpression:
        "SET #count = if_not_exists(#count, :start) + :inc, #ttl = :ttl",
      ExpressionAttributeNames: {
        "#count": "count",
        "#ttl": "ttl",
      },
      ExpressionAttributeValues: {
        ":inc": 1,
        ":start": 0,
        ":ttl": ttl,
      },
      ReturnValues: "UPDATED_NEW",
    };

    await dynamoDB.update(updateParams).promise();
  }

  async create(ip: string, ttl: number): Promise<void> {
    AWSXRay.captureFunc(
      "## RateLimitingRepository.create",
      async (subsegment) => {
        if (subsegment) {
          subsegment.addAnnotation("ip", ip);
          subsegment.close();
        }
      }
    );

    const rateKey = this.getKey(ip);
    const params = {
      TableName: RATE_LIMITING_TABLE,
      Item: {
        rateKey,
        count: 1,
        ttl,
      },
    };

    await dynamoDB.put(params).promise();
  }

  private getKey(ip: string): string {
    return this.service + "-" + ip;
  }
}
