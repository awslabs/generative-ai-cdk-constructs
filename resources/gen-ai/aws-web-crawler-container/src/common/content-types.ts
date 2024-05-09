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
export const fileTypes = new Set([
  'pdf',
  'csv',
  'tsv',
  'txt',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'epub',
  'odt',
  'eml',
  'md',
  'msg',
  'rst',
  'rtf',
  'mp3',
  'mp4',
  'wav',
  'avi',
  'mov',
  'wmv',
  'mpg',
  'flv',
  '3gp',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'svg',
  'webp',
  'ico',
  'zip',
  'rar',
  '7z',
  'tar',
  'gz',
  'bz2',
  'xz',
  'exe',
  'msi',
  'dmg',
  'pkg',
  'deb',
  'rpm',
  'apk',
  'jar',
  'war',
  'ear',
  'tar.gz',
]);

export const mimeTypeToExtension = new Map<string, string>([
  // Text formats
  ['text/plain', 'txt'],
  ['text/html', 'html'],
  ['text/css', 'css'],
  ['text/javascript', 'js'],
  ['text/csv', 'csv'],
  ['text/xml', 'xml'],
  ['application/json', 'json'],
  ['application/xml', 'xml'],
  ['application/rtf', 'rtf'],

  // Image formats
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/gif', 'gif'],
  ['image/svg+xml', 'svg'],
  ['image/webp', 'webp'],
  ['image/tiff', 'tiff'],
  ['image/bmp', 'bmp'],

  // Video formats
  ['video/mp4', 'mp4'],
  ['video/mpeg', 'mpeg'],
  ['video/quicktime', 'mov'],
  ['video/webm', 'webm'],
  ['video/x-msvideo', 'avi'],
  ['video/x-matroska', 'mkv'],

  // Audio formats
  ['audio/mpeg', 'mp3'],
  ['audio/x-wav', 'wav'],
  ['audio/ogg', 'ogg'],
  ['audio/mp4', 'm4a'],
  ['audio/flac', 'flac'],

  // Document formats
  ['application/pdf', 'pdf'],
  ['application/msword', 'doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
  ['application/vnd.ms-excel', 'xls'],
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
  ['application/vnd.ms-powerpoint', 'ppt'],
  ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
  ['application/epub+zip', 'epub'],

  // Archive formats
  ['application/zip', 'zip'],
  ['application/x-rar-compressed', 'rar'],
  ['application/x-7z-compressed', '7z'],
  ['application/x-tar', 'tar'],
  ['application/gzip', 'gz'],

  // Miscellaneous
  ['application/octet-stream', 'bin'],
  ['application/x-bittorrent', 'torrent'],
  ['application/x-shockwave-flash', 'swf'],

  // Fonts
  ['font/otf', 'otf'],
  ['font/ttf', 'ttf'],
  ['font/woff', 'woff'],
  ['font/woff2', 'woff2'],

  // Scripts and Executables
  ['application/x-perl', 'pl'],
  ['application/x-python-code', 'py'],
  ['application/x-ruby', 'rb'],
  ['application/x-shellscript', 'sh'],
  ['application/vnd.microsoft.portable-executable', 'exe'],
  ['application/x-msi', 'msi'],
  ['application/x-apple-diskimage', 'dmg'],
  ['application/x-newton-compatible-pkg', 'pkg'],
  ['application/vnd.debian.binary-package', 'deb'],
  ['application/x-rpm', 'rpm'],
  ['application/vnd.android.package-archive', 'apk'],
  ['application/java-archive', 'jar'],
  ['application/x-webarchive', 'war'],
]);

export const extensionToMimeType = new Map<string, string>(Array.from(mimeTypeToExtension).map(([key, value]) => [value, key]));
