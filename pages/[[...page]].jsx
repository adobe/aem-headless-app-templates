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
import Layout from '../components/layout';
import {
  ResponsiveGrid,
  fetchModel,
} from '@adobe/aem-react-editable-components';
import getPages from '../lib/getPages';

const { NEXT_PUBLIC_AEM_HOST, NEXT_PUBLIC_AEM_ROOT } = process.env;

export default function Home({ model, pagePath, pages }) {
  return (
    <Layout pages={pages}>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section>
        <div className="px-2 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-2 lg:py-6">
          <ResponsiveGrid
            key={pagePath}
            model={model}
            pagePath={pagePath}
            itemPath="root/responsivegrid"
          />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const pagePath = `/content/wknd-app/us/en/${
    context.query.page?.join('/') || 'home'
  }`;

  const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);
  const model = await fetchModel({
    pagePath,
    itemPath: 'root/responsivegrid',
    host: NEXT_PUBLIC_AEM_HOST,
    options: {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    },
  });
  return {
    props: {
      model,
      pagePath,
      pages,
    },
  };
}
