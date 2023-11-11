export abstract class JumpStartConstants {
  /*
  https://github.com/aws/sagemaker-python-sdk/blob/8462f1a1975da59304da4441aea956a43deec380/src/sagemaker/jumpstart/constants.py
  */
  public static JUMPSTART_LAUNCHED_REGIONS: Record<
    string,
    { contentBucket: string; gatedContentBucket?: string }
  > = {
    'us-west-2': {
      contentBucket: 'jumpstart-cache-prod-us-west-2',
      gatedContentBucket: 'jumpstart-private-cache-prod-us-west-2',
    },
    'us-east-1': {
      contentBucket: 'jumpstart-cache-prod-us-east-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-us-east-1',
    },
    'us-east-2': {
      contentBucket: 'jumpstart-cache-prod-us-east-2',
      gatedContentBucket: 'jumpstart-private-cache-prod-us-east-2',
    },
    'eu-west-1': {
      contentBucket: 'jumpstart-cache-prod-eu-west-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-eu-west-1',
    },
    'eu-central-1': {
      contentBucket: 'jumpstart-cache-prod-eu-central-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-eu-central-1',
    },
    'eu-north-1': {
      contentBucket: 'jumpstart-cache-prod-eu-north-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-eu-north-1',
    },
    'me-south-1': {
      contentBucket: 'jumpstart-cache-prod-me-south-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-me-south-1',
    },
    'ap-south-1': {
      contentBucket: 'jumpstart-cache-prod-ap-south-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-ap-south-1',
    },
    'eu-west-3': {
      contentBucket: 'jumpstart-cache-prod-eu-west-3',
      gatedContentBucket: 'jumpstart-private-cache-prod-eu-west-3',
    },
    'af-south-1': {
      contentBucket: 'jumpstart-cache-prod-af-south-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-af-south-1',
    },
    'sa-east-1': {
      contentBucket: 'jumpstart-cache-prod-sa-east-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-sa-east-1',
    },
    'ap-east-1': {
      contentBucket: 'jumpstart-cache-prod-ap-east-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-ap-east-1',
    },
    'ap-northeast-2': {
      contentBucket: 'jumpstart-cache-prod-ap-northeast-2',
      gatedContentBucket: 'jumpstart-private-cache-prod-ap-northeast-2',
    },
    'eu-west-2': {
      contentBucket: 'jumpstart-cache-prod-eu-west-2',
      gatedContentBucket: 'jumpstart-private-cache-prod-eu-west-2',
    },
    'eu-south-1': {
      contentBucket: 'jumpstart-cache-prod-eu-south-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-eu-south-1',
    },
    'ap-northeast-1': {
      contentBucket: 'jumpstart-cache-prod-ap-northeast-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-ap-northeast-1',
    },
    'us-west-1': {
      contentBucket: 'jumpstart-cache-prod-us-west-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-us-west-1',
    },
    'ap-southeast-1': {
      contentBucket: 'jumpstart-cache-prod-ap-southeast-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-ap-southeast-1',
    },
    'ap-southeast-2': {
      contentBucket: 'jumpstart-cache-prod-ap-southeast-2',
      gatedContentBucket: 'jumpstart-private-cache-prod-ap-southeast-2',
    },
    'ca-central-1': {
      contentBucket: 'jumpstart-cache-prod-ca-central-1',
      gatedContentBucket: 'jumpstart-private-cache-prod-ca-central-1',
    },
    'cn-north-1': {
      contentBucket: 'jumpstart-cache-prod-cn-north-1',
    },
  };

  public static JUMPSTART_DEFAULT_MANIFEST_FILE_S3_KEY = 'models_manifest.json';
}
