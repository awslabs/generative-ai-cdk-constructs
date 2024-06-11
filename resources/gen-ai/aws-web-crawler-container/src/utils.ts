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
export abstract class Utils {
  static async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static getFileType(url: string) {
    const fileRegex = /(?:\.([^.]+))?$/;
    url = url.split('/').pop() ?? '';
    const check = fileRegex.exec(url);
    let extension = check && check.length > 1 ? check[1] : undefined;
    extension = extension?.split('?')[0].split('#')[0];

    return extension ? extension.toLowerCase() : undefined;
  }

  static getBaseUrl(url: string) {
    url = url.trim();
    if (!url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) {
      url = `https://${url}`;
    }

    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    } catch (error) {
      return undefined;
    }
  }

  static unique<T>(array: T[]) {
    return Array.from(new Set(array));
  }

  static generateDateTimeStringWithMilliseconds() {
    const now = new Date();
    const retValue = `${now.toISOString()}`;

    return retValue;
  }

  static getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
