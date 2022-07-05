import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface cdkVpcThreesubnetProps extends StackProps {
    readonly APP_NAME: string;
    readonly LABEL: string;
    readonly domainName: string;
    readonly region: string;
  }

export class cdkVpcThreesubnet extends Stack {
  cidr = "10.0.0.0/16";
  static myvpc: ec2.Vpc;
  constructor(scope: Construct, id: string, props: cdkVpcThreesubnetProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, props.APP_NAME + "-vpc2", {
        enableDnsHostnames: true,
        enableDnsSupport: true,
        maxAzs: 1,
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: 'pub-subnet2/',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 24,
            name: 'private-subnet2/',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          },
          {
            cidrMask: 24,
            name: 'private-subnet3/',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          }
        ]
    })
    cdkVpcThreesubnet.myvpc = vpc;

  }
}
