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

const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/api/getNextProps',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/asset-manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.experiments.topLevelAwait = true;

    config.plugins.push(
      new WebpackAssetsManifest({
        output: '../public/asset-manifest.json',
        transform: (assets) => {
          const entrypoints = [];
          for (let file in assets) {
            if (file.includes('server/')) {
              delete assets[file];
            } else if (
              assets[file].endsWith('.js') ||
              assets[file].endsWith('.css')
            ) {
              entrypoints.push(assets[file]);
            }
          }
          return {
            files: assets,
            entrypoints: entrypoints,
          };
        },
      })
    );

    // MFE (Module Federation)
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'wknd',
        remotes: {
          StorefrontCart:
            'StorefrontCart@https://d1f3flsjknp2wb.cloudfront.net/develop/storefront-sdk/cart/mf.js',
        },
      })
    );

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
