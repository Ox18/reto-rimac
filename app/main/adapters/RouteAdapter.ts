import { Controller } from "../../presentation/protocols/Controller";
import { ServerlessResponse } from "../../presentation/protocols/ServerlessResponse";

export const routeAdapter = (controller: Controller) => {
  return async (event: any): Promise<ServerlessResponse> => {
    try {
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
