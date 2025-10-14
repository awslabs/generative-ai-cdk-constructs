/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as kms from 'aws-cdk-lib/aws-kms';
import { AwsSolutionsChecks } from 'cdk-nag';
import { Cluster } from '../../../src/cdk-lib/aurora-dsql/cluster';

describe('CDK-Created-Cluster with single region', () => {
  let stack: cdk.Stack;
  let template: Template;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  test('Basic Creation', () => {
    new Cluster(stack, 'TestCluster', {});

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DSQL::Cluster', {
      // test defaults
      DeletionProtectionEnabled: false,
      KmsEncryptionKey: Match.absent(),
      MultiRegionProperties: Match.absent(),
      Tags: Match.absent(),
    });
  });

  test('Basic Creation with deletion protection enabled', () => {
    new Cluster(stack, 'TestCluster', {
      deletionProtectionEnabled: true,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DSQL::Cluster', {
      DeletionProtectionEnabled: true,
      // test defaults
      KmsEncryptionKey: Match.absent(),
      MultiRegionProperties: Match.absent(),
      Tags: Match.absent(),
    });
  });

  test('Basic Creation with kms key', () => {
    new Cluster(stack, 'TestCluster', {
      kmsKey: kms.Key.fromKeyArn(stack, 'TestKmsKey', 'arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012'),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DSQL::Cluster', {
      DeletionProtectionEnabled: false,
      KmsEncryptionKey: 'arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012',
      // test defaults
      MultiRegionProperties: Match.absent(),
      Tags: Match.absent(),
    });
  });
});

describe('CDK-Created-Cluster with multi-region properties', () => {
  let stack: cdk.Stack;
  let template: Template;

  beforeEach(() => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  test('Basic Creation with witness region', () => {
    new Cluster(stack, 'TestCluster', {
      multiRegionProperties: {
        witnessRegion: 'us-east-2',
      },
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DSQL::Cluster', {
      MultiRegionProperties: {
        WitnessRegion: 'us-east-2',
      },
      // test defaults
      DeletionProtectionEnabled: false,
      KmsEncryptionKey: Match.absent(),
      Tags: Match.absent(),
    });
  });

  test('Witness region cannot be the same as the cluster\'s Region', () => {
    expect(() => {
      new Cluster(stack, 'TestCluster', {
        multiRegionProperties: {
          witnessRegion: 'us-east-1',
        },
      });
    }).toThrow('Witness region cannot be the same as the cluster\'s Region');
  });

  test('Basic Creation with peered clusters', () => {

    const peeredCluster1 = Cluster.fromClusterAttributes(stack, 'TestPeeredCluster1', {
      clusterArn: 'arn:aws:dsql:us-east-2:123456789012:cluster/test-peered-cluster-1',
      vpcEndpointServiceName: 'test-vpc-endpoint-service-1',
    });
    const peeredCluster2 = Cluster.fromClusterAttributes(stack, 'TestPeeredCluster2', {
      clusterArn: 'arn:aws:dsql:us-west-1:123456789012:cluster/test-peered-cluster-2',
      vpcEndpointServiceName: 'test-vpc-endpoint-service-1',
    });

    new Cluster(stack, 'TestCluster', {
      multiRegionProperties: {
        witnessRegion: 'us-east-2',
        clusters: [peeredCluster1, peeredCluster2],
      },
    });

    template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DSQL::Cluster', {
      MultiRegionProperties: {
        WitnessRegion: 'us-east-2',
        Clusters: [
          'arn:aws:dsql:us-east-2:123456789012:cluster/test-peered-cluster-1',
          'arn:aws:dsql:us-west-1:123456789012:cluster/test-peered-cluster-2',
        ],
      },
      // test defaults
      DeletionProtectionEnabled: false,
      KmsEncryptionKey: Match.absent(),
      Tags: Match.absent(),
    });
  });
});

describe('Cluster static methods tests', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    app.synth();
  });

  test('fromClusterAttributes should create a Cluster reference from existing attributes', () => {
    const cluster = Cluster.fromClusterAttributes(stack, 'test-cluster', {
      clusterArn: 'arn:aws:dsql:us-east-1:123456789012:cluster/test-cluster',
      creationTime: '2021-01-01T00:00:00Z',
      status: 'ACTIVE',
      vpcEndpointServiceName: 'test-vpc-endpoint-service',
      encryptionKey: kms.Key.fromKeyArn(stack, 'TestKmsKey', 'arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012'),
    });

    expect(cluster.clusterArn).toBe('arn:aws:dsql:us-east-1:123456789012:cluster/test-cluster');
    expect(cluster.creationTime).toBe('2021-01-01T00:00:00Z');
    expect(cluster.clusterId).toBe('test-cluster');
    expect(cluster.status).toBe('ACTIVE');
    expect(cluster.vpcEndpointServiceName).toBe('test-vpc-endpoint-service');
    expect(cluster.encryptionKey?.keyArn).toBe('arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012');
  });
});

describe('Cluster tags validation tests', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  test('Should accept valid tags', () => {
    expect(() => {
      new Cluster(stack, 'valid-tags', {
        tags: {
          'Environment': 'Production',
          'Team': 'AI/ML',
          'Cost-Center': '12345',
        },
      });
    }).not.toThrow();
  });

  test('Should accept tags with special characters', () => {
    expect(() => {
      new Cluster(stack, 'special-chars-tags', {
        tags: {
          'Environment': 'Production',
          'Team@Company': 'AI/ML',
          'Cost-Center': '12345',
          'Description': 'Test cluster with special chars',
        },
      });
    }).not.toThrow();
  });

  test('Should not accept empty tag key', () => {
    expect(() => {
      new Cluster(stack, 'empty-tag-key', {
        tags: {
          '': 'value',
        },
      });
    }).toThrow('The field Tag key is 0 characters long but must be at least 1 characters');
  });

  test('Should not accept tag key exceeding 256 characters', () => {
    const longKey = 'a'.repeat(257);
    expect(() => {
      new Cluster(stack, 'long-tag-key', {
        tags: {
          [longKey]: 'value',
        },
      });
    }).toThrow('The field Tag key is 257 characters long but must be less than or equal to 256 characters');
  });

  test('Should not accept tag value exceeding 256 characters', () => {
    const longValue = 'a'.repeat(257);
    expect(() => {
      new Cluster(stack, 'long-tag-value', {
        tags: {
          key: longValue,
        },
      });
    }).toThrow('The field Tag value is 257 characters long but must be less than or equal to 256 characters');
  });

  test('Should not accept tag key with invalid characters', () => {
    expect(() => {
      new Cluster(stack, 'invalid-tag-key', {
        tags: {
          'key#invalid': 'value',
        },
      });
    }).toThrow('The field Tag key with value "key#invalid" does not match the required pattern /^[a-zA-Z0-9\\s._:/=+@-]*$/');
  });

  test('Should accept empty tags object', () => {
    expect(() => {
      new Cluster(stack, 'empty-tags', {
        tags: {},
      });
    }).not.toThrow();
  });

  test('Should accept undefined tags', () => {
    expect(() => {
      new Cluster(stack, 'undefined-tags', {
        tags: undefined,
      });
    }).not.toThrow();
  });
});

describe('Cluster with tags CloudFormation template tests', () => {
  let template: Template;
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeAll(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    new Cluster(stack, 'test-cluster-with-tags', {
      tags: {
        Environment: 'Production',
        Team: 'AI/ML',
        Project: 'Cluster',
      },
    });

    app.synth();
    template = Template.fromStack(stack);
  });

  test('Should handle tags correctly when tags are provided', () => {
    // Verify that the Cluster resource exists and has basic properties
    const clusterResource = template.findResources('AWS::DSQL::Cluster');
    const resourceId = Object.keys(clusterResource)[0];
    const resource = clusterResource[resourceId];

    // The resource should have basic properties
    expect(resource.Properties).toHaveProperty('DeletionProtectionEnabled');
    expect(resource.Properties).toHaveProperty('Tags');

    // Tags property handling - the important thing is that the construct works
    // The tags are converted to an array format in CloudFormation
    if (resource.Properties.Tags) {
      const tags = resource.Properties.Tags;
      expect(Array.isArray(tags)).toBe(true);

      // Check that the expected tags are present
      const tagKeys = tags.map((tag: any) => tag.Key);
      expect(tagKeys).toContain('Environment');
      expect(tagKeys).toContain('Team');
      expect(tagKeys).toContain('Project');

      // Check specific tag values
      const environmentTag = tags.find((tag: any) => tag.Key === 'Environment');
      const teamTag = tags.find((tag: any) => tag.Key === 'Team');
      const projectTag = tags.find((tag: any) => tag.Key === 'Project');

      expect(environmentTag?.Value).toBe('Production');
      expect(teamTag?.Value).toBe('AI/ML');
      expect(projectTag?.Value).toBe('Cluster');
    }
  });

  test('Should have correct resource count with tags', () => {
    template.resourceCountIs('AWS::DSQL::Cluster', 1);
  });
});