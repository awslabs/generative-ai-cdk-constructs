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

/**
 * Permissions to grant connection authorization
 * If you are using a custom database role.
 * You create and manage this role by using SQL commands in your database.
 */
export const AURORA_DSQL_CONNECT_PERMS = [
  'dsql:DbConnect',
];

/**
 * Permissions to grant connection authorization
 * If you're using the admin role
 * Aurora DSQL creates and manages this role for you.
 */
export const AURORA_DSQL_CONNECT_ADMIN_PERMS = [
  'dsql:DbConnectAdmin',
];
