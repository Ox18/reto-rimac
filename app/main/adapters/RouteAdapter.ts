import { BaseException } from "../../presentation/exceptions/BaseException";
import { Controller } from "../../presentation/protocols/Controller";
import { Middleware } from "../../presentation/protocols/Middleware";
import { ServerlessResponse } from "../../presentation/protocols/ServerlessResponse";

export const routeAdapter = (
  controller: Controller,
  middlewares: Middleware[] = []
) => {
  return async (event: any): Promise<ServerlessResponse> => {
    try {
      for (const middleware of middlewares) {
        const response = await middleware.execute(event);

        if (!response) {
          continue;
        }

        if (response["statusCode"] && response["body"]) {
          return {
            statusCode: response["statusCode"],
            body: JSON.stringify(response["body"]),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      }

      const response = await controller.handle(event);

      if (response["statusCode"] && response["body"]) {
        return {
          statusCode: response["statusCode"],
          body: JSON.stringify(response["body"]),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } catch (error) {
      if (error instanceof BaseException) {
        return {
          statusCode: error.statusCode,
          body: JSON.stringify({
            message: error.message,
          }),
        };
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          // @ts-ignore
          message: error.message,
        }),
      };
    }
  };
};
