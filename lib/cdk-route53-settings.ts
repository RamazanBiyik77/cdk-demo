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
  constructor(scope: Construct, id: string, props: route53SettingsProps) {
    super(scope, id, props);
    props.myvpc.selectSubnets({ subnetType: ec2.SubnetType.PRIVATE_ISOLATED });
    const myHostedZone = route53.HostedZone.fromLookup(this, 'MyHostedZone', {
        domainName: props.domainName
      });
      route53Settings.myHostedZone = myHostedZone;
  
      //1 wild-card ssl certificate
      const sslcertificiate = new acm.Certificate(this, 'Certificate', {
        domainName: "*." + props.domainName,
        validation: acm.CertificateValidation.fromDns(myHostedZone),
      });

      // const dnsNamespace = new servicediscovery.PrivateDnsNamespace(
      //   this,
      //   "PrivateDnsNamespace",
      //   {
      //     name: "biyik" + "." + props.domainName,
      //     vpc: props.myvpc,
      //     description: "Private CloudMap Domain Name"
      //   }
      // );
      // route53Settings.dnsNamespace = dnsNamespace;
  }
}
