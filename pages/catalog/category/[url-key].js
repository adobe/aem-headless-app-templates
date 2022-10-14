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
 */

import Head from 'next/head';
import Error from 'next/error';

import client from '../../../lib/graphqlClient';
import Layout from '../../../components/layout';
import getPages from '../../../lib/getPages';
import getCategoryByUrlKey from './getCategoryByUrlKey.graphql';
import ProductCard from '../../../components/ProductCard';

const { NEXT_PUBLIC_AEM_ROOT } = process.env;

export default function Category(props) {
    const { category, pages } = props;

    if (!category) {
        return <Error statusCode={404} />
    }

    return <Layout pages={pages}>
        <Head>
            <title>{category.name}</title>
        </Head>
        <section>
            <div className="bg-white">
                <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{category.name}</h1>
                    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {category.products.items.map((product, index) => <ProductCard product={product} key={product.sku} priority={index === 0} />)}
                    </div>
                </div>
            </div>
        </section>
    </Layout>;
}

export async function getServerSideProps({ params }) {
    const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);

    const { data } = await client.query({
        query: getCategoryByUrlKey,
        variables: {
            urlKey: params['url-key'],
        }
    });

    const category = data?.categories?.items?.[0] || null;
    return {
        props: { pages, category },
    };
}