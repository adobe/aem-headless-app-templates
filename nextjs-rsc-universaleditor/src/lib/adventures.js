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

import AEMHeadless from '@adobe/aem-headless-client-js';
import {cache} from "react";

export const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
// export const NEXT_PUBLIC_AEM_ROOT = process.env.NEXT_PUBLIC_AEM_ROOT;

export const adventureCollections = [
    {
        name: 'All',
        slug: 'all',
        predicate: (adventure) => true,
    },
    {
        name: 'One Day',
        slug: 'one-day',
        predicate: (adventure) => adventure.tripLength === '1 Day',
    },
    {
        name: 'Sport',
        slug: 'sport',
        predicate: (adventure) => adventure.title.includes('Ski') || adventure.title.includes('Cycling') || adventure.title.includes('Surf'),
    },
    {
        name: 'Summer',
        slug: 'summer',
        predicate: (adventure) => !adventure.title.includes('Ski'),
    },
    {
        name: 'Winter',
        slug: 'winter',
        predicate: (adventure) => adventure.title.includes('Ski'),
    },
    {
        name: 'Most Popular',
        slug: 'popular',
        predicate: (adventure) => adventure.title.includes('surf')
            || adventure.title.includes('Tour')
            || adventure.title.includes('Cycling'),
    },
];

export const getAdventures = cache(async (lang) => {
    // await new Promise(r => setTimeout(r, 10000));
    const client = AdventureClient.fromEnv();
    const res = await client.getAllAdventures();
    return res?.data?.adventureList?.items;
});

export class AdventureClient {
    static fromEnv(env = process.env) {
        if (!this.__envClient) {
            const {NEXT_PUBLIC_AEM_HOST, NEXT_GRAPHQL_ENDPOINT} = env;
            console.log('Using AEM host: ' + NEXT_PUBLIC_AEM_HOST + ' and GraphQL endpoint: ' + NEXT_GRAPHQL_ENDPOINT);
            this.__envClient = new AdventureClient({
                serviceURL: NEXT_PUBLIC_AEM_HOST,
                endpoint: NEXT_GRAPHQL_ENDPOINT,
            });
        }
        return this.__envClient;
    }

    constructor({serviceURL, endpoint}) {
        this.aemHeadlessClient = new AEMHeadless({
            serviceURL,
            endpoint,
            auth: ['admin', 'admin'], // TODO: dynamically set auth based on AEM instance
            fetch
        });
    }

    async getAllAdventures() {
        const queryAdventuresAll = 'aem-demo-assets/adventures-all';
        // const res1 = await this.aemHeadlessClient.listPersistedQueries()
        // console.log('res1', res1);
        const res = await this.aemHeadlessClient.runPersistedQuery(queryAdventuresAll);
        return res;
    }

    async getAdventurePaths() {
        const res = await this.getAllAdventures();
        const adventures = res?.data?.adventureList?.items || [];
        const paths = adventures.map((item) => ({
            params: {
                path: [item.slug],
            }
        }));
        return paths;
    }

    async getAdventureByPath(path) {
        const query = `{
      adventureByPath (_path: "${path}") {
        item {
            _path
            title
            activity
            adventureType
            price
            tripLength
            groupSize
            difficulty
            primaryImage {
              ... on ImageRef {
                _path
                mimeType
                width
                height
              }
            }
            description {
              html
            }
            itinerary {
              html
            }
        }
      }
    }
    `;
        const res = await this.aemHeadlessClient.runQuery(query);
        return res;
    }
}
