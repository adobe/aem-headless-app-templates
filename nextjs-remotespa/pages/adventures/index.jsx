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

import Head from 'next/head';
import Layout from '../../components/layout';
import { AdventureClient } from '../../lib/adventures';
import AdventureCard from '../../components/AdventureCard';
import getPages from '../../lib/getPages';

const { NEXT_PUBLIC_AEM_HOST, NEXT_PUBLIC_AEM_ROOT } = process.env;

export default function Adventures({ adventures, pages }) {
  return (
    <Layout pages={pages}>
      <Head>
        <title>Adventures</title>
      </Head>
      <section className="">
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Your next adventures can be one of these...
            </h2>
            <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {adventures.map(
                ({ slug, title, price, tripLength, primaryImage }) => {
                  return (
                    <AdventureCard
                      key={slug}
                      slug={slug}
                      title={title}
                      price={price}
                      duration={tripLength}
                      imageSrc={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const client = AdventureClient.fromEnv();
  const res = await client.getAllAdventures();
  const adventures = res?.data?.adventureList?.items;
  const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);
  return {
    props: {
      adventures,
      pages,
    },
  };
}
