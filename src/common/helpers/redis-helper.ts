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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import { Construct } from 'constructs';
import * as vpc_helper from './vpc-helper';

export interface RedisProps {

  /**
   * Existing instance of a VPC, if this is set then the all Props are ignored,
   * if this is not set then deafultVPC Props are used.
   */
  readonly existingVpc?: ec2.IVpc;

  // /**
  //  * security group for lambda
  //  * @default 'lambdaSecurityGroup'
  //  */
  // readonly lambdaSecurityGroup: ec2.ISecurityGroup;

  /**
   * name  of redis Security Group
   * @default 'redisSecurityGroup'
   */
  readonly redisSecurityGroupname: string;

  /**
   * cache node type
   *  @default 'cache.r6g.xlarge'
   */
  readonly cacheNodeType: string;

  /**
   * redis cluster name
   * @default 'redisCluster'
   */
  readonly redisclustername: string;
}

/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * build redis cluster to cache the results
 *
 * @param RedisProps The default props to be used by the construct
 * @returns redis cluster instance.
 *
 */
export function buildRedisCluster(scope: Construct, props: RedisProps): elasticache.CfnCacheCluster {

  const redisclustername = props.redisclustername || 'redisCluster';
  const cacheNodeType = props.cacheNodeType || 'cache.r6g.xlarge';

  let redisCulster = new elasticache.CfnCacheCluster(scope, 'redisCluster', {
    clusterName: redisclustername,
    cacheNodeType: cacheNodeType,
    engine: 'redis',
    numCacheNodes: 1,
    cacheSubnetGroupName: getRedisSubnetGroup(scope, props).ref,
    vpcSecurityGroupIds: [getRedisSecurityGroup(scope, props).securityGroupId],
  });
  //this.redisHost = redisCluster.attrRedisEndpointAddress;
  //this.redisPort = redisCluster.attrRedisEndpointPort;
  return redisCulster;
}


// get redis subnet group from existing vpc
function getRedisSubnetGroup(scope: Construct, props: RedisProps): elasticache.CfnSubnetGroup {
  let redisSubnetGroup = new elasticache.CfnSubnetGroup(scope, 'redisSubnetGroup', {
    description: 'redis subnet group',
    subnetIds: vpc_helper.getPrivateSubnetIDs(props?.existingVpc!),
  });
  return redisSubnetGroup;
}

// get redis security group from existing vpc
function getRedisSecurityGroup(scope: Construct, props: RedisProps): ec2.SecurityGroup {
  let redisSecurityGroup = new ec2.SecurityGroup(scope, 'redisSecurityGroup', {
    vpc: props?.existingVpc!,
    allowAllOutbound: true,
    description: 'security group for elasticache',
    securityGroupName: props?.redisSecurityGroupname,
  });
  return redisSecurityGroup;
}

