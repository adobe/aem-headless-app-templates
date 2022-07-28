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
import { ResponsiveGrid, fetchModel } from '@adobe/aem-react-editable-components';

const NEXT_PUBLIC_AEM_PATH = process.env.NEXT_PUBLIC_AEM_PATH;
const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;

export default function Home({ model }) {
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-2 lg:py-6">
          <ResponsiveGrid
            model = {model}
            pagePath={NEXT_PUBLIC_AEM_PATH}
            itemPath='root/responsivegrid'
          />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const model = await fetchModel({
    pagePath: NEXT_PUBLIC_AEM_PATH,
    itemPath: 'root/responsivegrid',
    host: NEXT_PUBLIC_AEM_HOST,
    options: {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4='
      }
    }
  });
  return {
    props: {
      model
    }
  };
}