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

export interface RedisProps {

  /**
   * Existing instance of a VPC, if this is set then the all Props are ignored,
   * if this is not set then deafultVPC Props are used.
   */
  readonly existingVpc?: ec2.IVpc;

  /**
   * cfnCacheClusterProps
   * @default cacheNodeType -  'cache.r6g.xlarge'
   * @default numCacheNodes- 1
   */
  readonly cfnCacheClusterProps: elasticache.CfnCacheClusterProps;

  /**
   * name  of redis Security Group
   * @default 'redisSecurityGroup'
   */
  readonly redisSecurityGroupname: string;

  /**
   * list of subnet Ids
   * @default None
   */
  readonly subnetIds: string [];

  /**
   * redis Subnet Group Id
   * @default redisSubnetGroup
   */
  readonly redisSubnetGroupId: string;


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

  const redisclustername = props.cfnCacheClusterProps?.clusterName || 'redisCluster';
  const cacheNodeType = props.cfnCacheClusterProps?.cacheNodeType || 'cache.r6g.xlarge';
  const engine = props.cfnCacheClusterProps?.engine || 'redis';
  const numCacheNodes = props.cfnCacheClusterProps?.numCacheNodes || 1;

  let redisCulster = new elasticache.CfnCacheCluster(scope, 'redisCluster', {
    clusterName: redisclustername,
    cacheNodeType: cacheNodeType,
    engine: engine,
    numCacheNodes: numCacheNodes,
    cacheSubnetGroupName: getRedisSubnetGroup(scope, props).ref,
    vpcSecurityGroupIds: [getRedisSecurityGroup(scope, props).securityGroupId],
  });

  return redisCulster;
}


// get redis subnet group from existing vpc
function getRedisSubnetGroup(scope: Construct, props: RedisProps): elasticache.CfnSubnetGroup {
  let redisSubnetGroup = new elasticache.CfnSubnetGroup(scope, props.redisSubnetGroupId, {
    description: 'Redis subnet group',
    subnetIds: props.subnetIds,
  });
  return redisSubnetGroup;
}

// get redis security group from existing vpc
function getRedisSecurityGroup(scope: Construct, props: RedisProps): ec2.SecurityGroup {
  const redisSecurityGroupName = props?.redisSecurityGroupname || 'redisSecuritygroup';
  let redisSecurityGroup = new ec2.SecurityGroup(scope, props.redisSecurityGroupname, {
    vpc: props?.existingVpc!,
    allowAllOutbound: true,
    description: 'security group for elasticache',
    securityGroupName: redisSecurityGroupName,
  });
  return redisSecurityGroup;
}

