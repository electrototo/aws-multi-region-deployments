import * as cdk from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ServerlessAPIStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this, 'LambdaFunction', {
      entry: 'lib/lambda_handler.ts',
      handler: 'handler'
    });

    const apiGateway = new LambdaRestApi(this, 'apigw', {
      handler: lambdaFunction
    });

    const globalizedDomainName = 'global.c.liendo.net';
    const acmCertificate = new Certificate(this, `${this.region}-RegionalizedACM`, {
      domainName: globalizedDomainName,
      validation: CertificateValidation.fromDns()
    });

    apiGateway.addDomainName(`${this.region}-DomainName`, {
      domainName: globalizedDomainName,
      certificate: acmCertificate
    });
  }
}
