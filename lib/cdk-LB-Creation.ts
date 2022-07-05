import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface LBSettingsProps extends StackProps {
    readonly APP_NAME: string;
    readonly LABEL: string;
    readonly domainName: string;
    readonly region: string;
    readonly myvpc: ec2.Vpc;
  }

export class LBSettings extends Stack {
  static ALBLoadBalancer: elbv2.ApplicationLoadBalancer;
  constructor(scope: Construct, id: string, props: LBSettingsProps) {
    super(scope, id, props);

    const albSecGroup = new ec2.SecurityGroup(this, "albSecGroup", {
        vpc: props.myvpc,
        allowAllOutbound: true,
        description: "ALB Security Group",
        securityGroupName: props.APP_NAME + "-" + "albSecGroup",
      });
  
      albSecGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(80),
        "80 frm anywhere"
      );
      albSecGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(443),
        "443 frm anywhere"
      );
  
  
      const ALBLoadBalancer = new elbv2.ApplicationLoadBalancer(
        this,
        "ALBLoadBalancer",
        {
          vpc: props.myvpc,
          internetFacing: true,
          deletionProtection: false,
          http2Enabled: true,
          loadBalancerName: props.LABEL + "-" + props.APP_NAME,
          securityGroup: albSecGroup,
        }
      );
  
      LBSettings.ALBLoadBalancer = ALBLoadBalancer;
  }
}
