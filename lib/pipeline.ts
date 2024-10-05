import { Stack, StackProps } from "aws-cdk-lib";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { RegionalizedApp } from "./regionalized-app";

export class Pipeline extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection(
                    'electrototo/aws-multi-region-deployments',
                    'master',
                    {
                        connectionArn: `arn:aws:codeconnections:${this.region}:${this.account}:connection/dc9f06dd-ca6e-4bd1-a748-aa579d16e450`
                    }
                ),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        });

        const northAmericaWave = pipeline.addWave('NorthAmerica');

        northAmericaWave.addStage(
            new RegionalizedApp(this, 'Oregon', {
                env: {
                    region: 'us-west-2'
                }
            })
        );

        northAmericaWave.addStage(
            new RegionalizedApp(this, 'Ohio', {
                env: {
                    region: 'us-east-2'
                }
            })
        );
    }
}