#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Pipeline } from '../lib/pipeline';

const app = new cdk.App();

new Pipeline(app, 'PipelineStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: 'us-west-2'
  }
})