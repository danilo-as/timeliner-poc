import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class TimelinerPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket para videos originales (input)
    const inputBucket = new s3.Bucket(this, 'TimelinerInputBucket', {
      bucketName: `timeliner-input-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para PoC
      autoDeleteObjects: true, // Solo para PoC
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [
          s3.HttpMethods.GET,
          s3.HttpMethods.PUT,
          s3.HttpMethods.POST,
          s3.HttpMethods.DELETE,
          s3.HttpMethods.HEAD
        ],
        allowedOrigins: ['*'], // En producción, especificar dominios
        exposedHeaders: ['ETag'],
        maxAge: 3000
      }],
      lifecycleRules: [{
        id: 'delete-old-videos',
        enabled: true,
        expiration: cdk.Duration.days(30), // Eliminar videos después de 30 días
      }]
    });

    // S3 Bucket para videos procesados (output)
    const outputBucket = new s3.Bucket(this, 'TimelinerOutputBucket', {
      bucketName: `timeliner-output-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para PoC
      autoDeleteObjects: true, // Solo para PoC
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [
          s3.HttpMethods.GET,
          s3.HttpMethods.HEAD
        ],
        allowedOrigins: ['*'], // En producción, especificar dominios
        maxAge: 3000
      }],
      lifecycleRules: [{
        id: 'delete-old-processed-videos',
        enabled: true,
        expiration: cdk.Duration.days(90), // Mantener videos procesados por 90 días
      }]
    });

    // Rol IAM para MediaConvert
    const mediaConvertRole = new iam.Role(this, 'MediaConvertRole', {
      assumedBy: new iam.ServicePrincipal('mediaconvert.amazonaws.com'),
      description: 'Role for AWS MediaConvert to access S3 buckets',
      inlinePolicies: {
        MediaConvertPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:GetObject',
                's3:GetObjectAcl',
                's3:ListBucket'
              ],
              resources: [
                inputBucket.bucketArn,
                `${inputBucket.bucketArn}/*`
              ]
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:PutObject',
                's3:PutObjectAcl'
              ],
              resources: [
                outputBucket.bucketArn,
                `${outputBucket.bucketArn}/*`
              ]
            })
          ]
        })
      }
    });

    // CloudFront Origin Access Identity
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI', {
      comment: 'OAI for Timeliner Output Bucket'
    });

    // Dar permisos a CloudFront para acceder al bucket de output
    outputBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${outputBucket.bucketArn}/*`],
      principals: [originAccessIdentity.grantPrincipal]
    }));

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'TimelinerDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(outputBucket, {
          originAccessIdentity: originAccessIdentity
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        compress: true,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      comment: 'Timeliner PoC CloudFront Distribution',
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // Solo US, Canada y Europa para PoC
      enabled: true,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
    });

    // Outputs
    new cdk.CfnOutput(this, 'InputBucketName', {
      value: inputBucket.bucketName,
      description: 'Name of the S3 bucket for input videos',
      exportName: 'TimelinerInputBucket'
    });

    new cdk.CfnOutput(this, 'OutputBucketName', {
      value: outputBucket.bucketName,
      description: 'Name of the S3 bucket for processed videos',
      exportName: 'TimelinerOutputBucket'
    });

    new cdk.CfnOutput(this, 'MediaConvertRoleArn', {
      value: mediaConvertRole.roleArn,
      description: 'ARN of the IAM role for MediaConvert',
      exportName: 'TimelinerMediaConvertRole'
    });

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'CloudFront distribution URL',
      exportName: 'TimelinerCloudFrontURL'
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID',
      exportName: 'TimelinerCloudFrontDistributionId'
    });
  }
}