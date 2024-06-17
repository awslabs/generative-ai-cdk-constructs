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
import { spawn } from 'child_process';
import { Configuration } from '../managers/config-manager.js';

export abstract class ScriptRunner {
  public static async downloadFiles(config: Configuration) {
    return this.execPromise('python3', ['scripts/download_files.py'], {
      JOB_ID: config.jobId,
      OUTPUT_PATH: config.outputPath,
      FILES_FILE_NAME: config.file_names.files,
      FILES_FILE_PATH: config.file_paths.files.toString(),
    });
  }

  public static async parseHTML(config: Configuration) {
    return this.execPromise('python3', ['scripts/parse_html.py'], {
      JOB_ID: config.jobId,
      OUTPUT_PATH: config.outputPath,
      PAGES_FILE_NAME: config.file_names.pages,
      PAGES_FILE_PATH: config.file_paths.pages.toString(),
    });
  }

  static execPromise(command: string, params: string[], options: Record<string, string> = {}) {
    return new Promise<number>((resolve, reject) => {
      const env = { ...process.env, ...options };

      const pythonProcess = spawn(command, params, { env });
      pythonProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
      });

      pythonProcess.stderr.on('data', (data) => {
        process.stdout.write(data);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Process finished successfully');
          resolve(code);
        } else {
          console.error(`Process script exited with code ${code}`);
          reject(code);
        }
      });

      pythonProcess.on('error', (error) => {
        console.error(`Failed to start subprocess: ${error}`);
        reject(error);
      });
    });
  }
}
