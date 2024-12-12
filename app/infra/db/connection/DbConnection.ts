import { DynamoDB } from "aws-sdk";


// apply region config

import { config } from "aws-sdk";

config.update({ region: "us-east-1" });

export const dynamoDB = new DynamoDB.DocumentClient();
