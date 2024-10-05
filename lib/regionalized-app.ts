import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ServerlessAPIStack } from "./serverless-api-stack";

export class RegionalizedApp extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new ServerlessAPIStack(this, 'ServerlessAPIStack');
    }
}