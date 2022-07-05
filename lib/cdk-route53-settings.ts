import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as servicediscovery from 'aws-cdk-lib/aws-servicediscovery';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface route53SettingsProps extends StackProps {
    readonly APP_NAME: string;
    readonly LABEL: string;
    readonly domainName: string;
    readonly region: string;
    readonly myvpc: ec2.Vpc;
  }

export class route53Settings extends Stack {
  static dnsNamespace: servicediscovery.PrivateDnsNamespace;
  static myHostedZone: route53.IHostedZone;
  static myPrivateHostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: route53SettingsProps) {
    super(scope, id, props);

    props.myvpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC });

    // Route 53
    const myHostedZone = new route53.HostedZone(this, 'MyHostedZone', { zoneName: props.domainName });

    route53Settings.myHostedZone = myHostedZone;

    // Cloud Map
    const myPrivateHostedZone = new route53.PrivateHostedZone(this, 'HostedZone', {
      zoneName: 'private.' + props.domainName,
      vpc: props.myvpc,    // At least one VPC has to be added to a Private Hosted Zone.
    });
  
      //1 wild-card ssl certificate
      const sslcertificiate = new acm.Certificate(this, 'Certificate', {
        domainName: "*." + props.domainName,
        validation: acm.CertificateValidation.fromDns(myHostedZone),
      });

  }
}
