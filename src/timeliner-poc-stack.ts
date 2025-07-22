import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as mediaconvert from 'aws-cdk-lib/aws-mediaconvert';
import { Construct } from 'constructs';
import { mediaConvertJobTemplate } from './mediaconvert-config';

export class TimelinerPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket para logs de acceso
    const logsBucket = new s3.Bucket(this, 'TimelinerLogsBucket', {
      bucketName: `timeliner-logs-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para PoC
      autoDeleteObjects: true, // Solo para PoC
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED, // Habilitar ACLs para CloudFront
      lifecycleRules: [{
        id: 'delete-old-logs',
        enabled: true,
        expiration: cdk.Duration.days(90), // Mantener logs por 90 días
      }]
    });
    cdk.Tags.of(logsBucket).add('POC', 'MediaConverter');

    // CloudWatch Log Group para MediaConvert
    const mediaConvertLogGroup = new logs.LogGroup(this, 'MediaConvertLogGroup', {
      logGroupName: '/aws/mediaconvert/timeliner-poc',
      retention: logs.RetentionDays.ONE_MONTH, // Retener por 30 días
      removalPolicy: cdk.RemovalPolicy.DESTROY // Solo para PoC
    });
    cdk.Tags.of(mediaConvertLogGroup).add('POC', 'MediaConverter');

    // S3 Bucket para videos originales (input)
    const inputBucket = new s3.Bucket(this, 'TimelinerInputBucket', {
      bucketName: `timeliner-input-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para PoC
      autoDeleteObjects: true, // Solo para PoC
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: logsBucket,
      serverAccessLogsPrefix: 'input-bucket-logs/',
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
    cdk.Tags.of(inputBucket).add('POC', 'MediaConverter');

    // S3 Bucket para videos procesados (output)
    const outputBucket = new s3.Bucket(this, 'TimelinerOutputBucket', {
      bucketName: `timeliner-output-${cdk.Stack.of(this).account}-${cdk.Stack.of(this).region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para PoC
      autoDeleteObjects: true, // Solo para PoC
      versioned: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: logsBucket,
      serverAccessLogsPrefix: 'output-bucket-logs/',
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
    cdk.Tags.of(outputBucket).add('POC', 'MediaConverter');

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
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
                'logs:DescribeLogStreams'
              ],
              resources: [
                mediaConvertLogGroup.logGroupArn,
                `${mediaConvertLogGroup.logGroupArn}:*`
              ]
            })
          ]
        })
      }
    });
    cdk.Tags.of(mediaConvertRole).add('POC', 'MediaConverter');

    // MediaConvert Job Template
    const jobTemplate = new mediaconvert.CfnJobTemplate(this, 'MediaConvertJobTemplate', {
      settingsJson: mediaConvertJobTemplate.Settings,
      name: 'TimelinerPoCTemplate',
      description: 'Job template for Timeliner PoC - Converts videos to HLS format with multiple resolutions',
      category: 'Custom',
      priority: 0,
      statusUpdateInterval: 'SECONDS_60'
    });
    cdk.Tags.of(jobTemplate).add('POC', 'MediaConverter');

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
        origin: origins.S3BucketOrigin.withOriginAccessIdentity(outputBucket, {
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
      // Habilitar logs de acceso de CloudFront
      enableLogging: true,
      logBucket: logsBucket,
      logFilePrefix: 'cloudfront-logs/',
      logIncludesCookies: false,
    });
    cdk.Tags.of(distribution).add('POC', 'MediaConverter');

    // Lambda function para procesar videos
    const videoProcessorFunction = new nodejs.NodejsFunction(this, 'VideoProcessorFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'src/lambda/video-processor.js',
      handler: 'handler',
      timeout: cdk.Duration.minutes(15),
      memorySize: 512,
      environment: {
        OUTPUT_BUCKET: outputBucket.bucketName,
        MEDIACONVERT_ROLE_ARN: mediaConvertRole.roleArn,
        JOB_TEMPLATE_NAME: jobTemplate.name!,
        CLOUDFRONT_DOMAIN: distribution.distributionDomainName
      },
      description: 'Processes uploaded videos using AWS MediaConvert',
    });
    cdk.Tags.of(videoProcessorFunction).add('POC', 'MediaConverter');

    // Rol IAM para Lambda
    const lambdaRole = videoProcessorFunction.role as iam.Role;
    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'mediaconvert:CreateJob',
        'mediaconvert:DescribeEndpoints',
        'mediaconvert:GetJob',
        'mediaconvert:ListJobs'
      ],
      resources: ['*']
    }));

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'iam:PassRole'
      ],
      resources: [mediaConvertRole.roleArn]
    }));

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents'
      ],
      resources: ['*']
    }));

    // Dar permisos a Lambda para leer del bucket input
    inputBucket.grantRead(videoProcessorFunction);

    // Configurar trigger S3 para Lambda
    inputBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(videoProcessorFunction),
      {
        suffix: '.mp4'
      }
    );

    inputBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(videoProcessorFunction),
      {
        suffix: '.mov'
      }
    );

    inputBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(videoProcessorFunction),
      {
        suffix: '.avi'
      }
    );

    inputBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(videoProcessorFunction),
      {
        suffix: '.mkv'
      }
    );

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

    new cdk.CfnOutput(this, 'LogsBucketName', {
      value: logsBucket.bucketName,
      description: 'Name of the S3 bucket for access logs',
      exportName: 'TimelinerLogsBucket'
    });

    new cdk.CfnOutput(this, 'MediaConvertLogGroupName', {
      value: mediaConvertLogGroup.logGroupName,
      description: 'Name of the CloudWatch Log Group for MediaConvert',
      exportName: 'TimelinerMediaConvertLogGroup'
    });

    new cdk.CfnOutput(this, 'VideoProcessorFunctionName', {
      value: videoProcessorFunction.functionName,
      description: 'Name of the Lambda function that processes videos',
      exportName: 'TimelinerVideoProcessorFunction'
    });

    new cdk.CfnOutput(this, 'MediaConvertJobTemplateName', {
      value: jobTemplate.name!,
      description: 'Name of the MediaConvert job template',
      exportName: 'TimelinerJobTemplate'
    });
  }
}