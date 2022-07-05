import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface cdkVpcTwosubnetProps extends StackProps {
    readonly APP_NAME: string;
    readonly LABEL: string;
    readonly domainName: string;
    readonly region: string;
  }

export class cdkVpcTwosubnet extends Stack {
  cidr = "10.0.0.0/16";
  static myvpc: ec2.Vpc;
  constructor(scope: Construct, id: string, props: cdkVpcTwosubnetProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, props.APP_NAME + "-vpc1", {
        enableDnsHostnames: true,
        enableDnsSupport: true,
        maxAzs: 2,
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: 'pub-subnet1/',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 24,
            name: 'private-subnet1/',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          }
        ]
    })

    cdkVpcTwosubnet.myvpc = vpc;
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkDemoQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
