#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack } from '../lib/cdk-demo-stack';
import { cdkVpcTwosubnet } from '../lib/cdk-vpc-twosubnet';
import { cdkVpcThreesubnet } from '../lib/cdk-vpc-threesubnet';
import { route53Settings } from '../lib/cdk-route53-settings';
import { LBSettings } from '../lib/cdk-LB-Creation';
import * as utils from '../util';
const app = new cdk.App();
const  configjson = utils.readJSON("./bin/config.json");

// new CdkDemoStack(app, 'CdkDemoStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });
new cdkVpcTwosubnet(app, configjson.APP_NAME.biyiktest.Name + "-vpc1", {
  env: { account: configjson.env.accountnumber, region: configjson.env.region },
  APP_NAME: configjson.APP_NAME.biyiktest.Name,
  LABEL: configjson.APP_NAME.biyiktest.LABEL,
  domainName: configjson.domainName,
  region: configjson.env.region
});

// new cdkVpcThreesubnet(app, configjson.APP_NAME.biyiktest.Name + "-vpc2", {
//   env: { account: configjson.env.accountnumber, region: configjson.env.region },
//   APP_NAME: configjson.APP_NAME.biyiktest.Name,
//   LABEL: configjson.APP_NAME.biyiktest.LABEL,
//   domainName: configjson.domainName,
//   region: configjson.env.region
// });

new route53Settings(app, configjson.APP_NAME.biyiktest.Name + "-route53", {
  env: { account: configjson.env.accountnumber, region: configjson.env.region },
  APP_NAME: configjson.APP_NAME.biyiktest.Name,
  LABEL: configjson.APP_NAME.biyiktest.LABEL,
  domainName: configjson.domainName,
  region: configjson.env.region,
  myvpc: cdkVpcTwosubnet.myvpc,
});

new LBSettings(app, configjson.APP_NAME.biyiktest.Name + "-LB", {
  env: { account: configjson.env.accountnumber, region: configjson.env.region },
  APP_NAME: configjson.APP_NAME.biyiktest.Name,
  LABEL: configjson.APP_NAME.biyiktest.LABEL,
  domainName: configjson.domainName,
  region: configjson.env.region,
  myvpc: cdkVpcTwosubnet.myvpc,
});