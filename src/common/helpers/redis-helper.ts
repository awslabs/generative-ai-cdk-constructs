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
   * Required. Existing instance of a VPC, if this is set then the all Props are ignored,
   * if this is not set then deafultVPC Props are used.
   */
  readonly existingVpc: ec2.IVpc;

  /**
   * Optional cfnCacheClusterProps
   * @default cacheNodeType -  'cache.r6g.xlarge'
   * @default numCacheNodes- 1
   */
  readonly cfnCacheClusterProps?: elasticache.CfnCacheClusterProps;

  /**
  * Optional. Existing Redis cluster to cache the generated summary
  * for subsequent request of same document.
  *
  * @default - none
  */
  readonly existingRedisCulster?: elasticache.CfnCacheCluster;

  /**
   * Optional .name  of redis Security Group
   * @default 'redisSecurityGroup'
   */
  readonly redisSecurityGroupname?: string;

  /**
   * Required. redis Security Group
   *
   */
  readonly redisSecurityGroup: ec2.SecurityGroup;

  /**
   * Required. list of subnet Ids
   * @default None
   */
  readonly subnetIds: string [];


  /**
   * Required. lambda security group which will acces the redis cluster
   *
   */
  readonly inboundSecurityGroup: ec2.ISecurityGroup;

  /**
   * Optional. redis port number
   * @default redisPort
   */
  readonly redisPort?: number;


}


export function buildRedisCluster(scope: Construct, props: RedisProps): elasticache.CfnCacheCluster {


  const cacheNodeType = props.cfnCacheClusterProps?.cacheNodeType || 'cache.r6g.xlarge';
  const engine = props.cfnCacheClusterProps?.engine || 'redis';
  const numCacheNodes = props.cfnCacheClusterProps?.numCacheNodes || 1;

  let redisCulster = new elasticache.CfnCacheCluster(scope, 'redisCluster', {
    cacheNodeType: cacheNodeType,
    engine: engine,
    numCacheNodes: numCacheNodes,
    cacheSubnetGroupName: getRedisSubnetGroup(scope, props).ref,
    vpcSecurityGroupIds: [props.redisSecurityGroup!.securityGroupId],
  });
  return redisCulster;
}


// get redis subnet group from existing vpc
function getRedisSubnetGroup(scope: Construct, props: RedisProps): elasticache.CfnSubnetGroup {
  let redisSubnetGroup = new elasticache.CfnSubnetGroup(scope, 'redisSubnetGroup', {
    description: 'Redis subnet group',
    subnetIds: props.subnetIds,
  });
  return redisSubnetGroup;
}

// get redis security group from existing vpc
export function getRedisSecurityGroup(scope: Construct,
  props: RedisProps | any ): ec2.SecurityGroup {
  let redisSecurityGroup = new ec2.SecurityGroup(scope, 'redisSecurityGroup', {
    vpc: props.existingVpc,
    allowAllOutbound: true,
    description: 'security group for elasticache',
  });

  return redisSecurityGroup;
}

export function setInboundRules(redisSecurityGroup:ec2.SecurityGroup,
  sourceSecuritygroup:ec2.ISecurityGroup ) {
  redisSecurityGroup.connections.allowFrom(sourceSecuritygroup,
    ec2.Port.tcp(6379));
}


export function CheckRedisClusterProps(propsObject: RedisProps | any) {
  let errorMessages = '';
  let errorFound = false;

  if (propsObject.existingRedisCulster && propsObject.cfnCacheClusterProps) {
    errorMessages += 'Error - Either provide existingRedisCulster or cfnCacheClusterProps, but not both.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }
}
