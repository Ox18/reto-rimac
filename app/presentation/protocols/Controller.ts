import { APIGatewayEvent } from "aws-lambda";

export interface Controller<T = APIGatewayEvent> {
  handle: (request: T) => Promise<any>;
}
