/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/api/getNextProps',
                headers: [ {
                    key: 'Access-Control-Allow-Origin',
                    value: '*'
                } ]
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/content/:path*',
                destination: '/api/proxy/:path*'
            },
            {
                source: '/.model.json',
                destination: '/api/proxy/.model.json'
            }
        ]
    },
    webpack(config) {
        config.plugins.push(new WebpackAssetsManifest({
            output: '../public/asset-manifest.json',
            transform: assets => {
                const entrypoints = [];
                for (let file in assets) {
                    if (assets[file].endsWith('.js') || assets[file].endsWith('.css')) {
                        entrypoints.push(assets[file]);
                    }
                }
                return {
                    files: assets,
                    entrypoints: entrypoints
                };
            }
        }));

        return config;
    }
};