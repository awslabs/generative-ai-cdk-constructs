const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
    entryPoints: [path.join(__dirname, 'lambda-function.ts')],
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node18',
    outfile: path.join(__dirname, 'index.js'),
    external: ['aws-sdk'],
}).catch(() => process.exit(1));