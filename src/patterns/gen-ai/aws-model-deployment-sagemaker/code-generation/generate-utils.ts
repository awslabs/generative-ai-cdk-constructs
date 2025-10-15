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

import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

export abstract class GenerateUtils {
  static replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  static replaceAllBatch(str: string, find: string[], replace: string) {
    for (const f of find) {
      str = str.replace(new RegExp(f, 'g'), replace);
    }

    return str;
  }

  static writeFileSyncWithDirs(
    filePath: string,
    data: string | NodeJS.ArrayBufferView,
    options?: fs.WriteFileOptions | undefined,
  ) {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, data, options);
  }

  static async downloadJSON(
    options: string | URL | https.RequestOptions,
  ): Promise<any> {
    let retryCount = 0;
    let error: Error | undefined;
    let result: any;

    while (retryCount < 5) {
      try {
        result = await new Promise((resolve, reject) => {
          const request = https.get(options, (response) => {
            if (response.statusCode === 200) {
              let rawData = '';
              response.setEncoding('utf8');
              response.on('data', (chunk) => {
                rawData += chunk;
              });
              response.on('error', (e) => {
                reject(e);
              });
              response.on('end', () => {
                try {
                  const parsedData = JSON.parse(rawData);
                  resolve([parsedData, response]);
                } catch (e) {
                  reject(e);
                }
              });
            } else {
              reject(
                new Error(
                  `Request Failed. Status Code: ${response.statusCode}`,
                ),
              );
            }
          });

          request.end();
        });
        break;
      } catch (e: any) {
        error = e;
        retryCount++;

        // eslint-disable-next-line no-console
        console.log('Retrying in 1 second...');
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      }
    }

    if (error) {
      throw error;
    }

    return result;
  }
}
