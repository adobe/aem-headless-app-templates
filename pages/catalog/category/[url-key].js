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
import Link from 'next/link';
import { gql } from "@apollo/client";

import client from '../../../lib/graphqlClient';
import Layout from '../../../components/layout';
import getPages from '../../../lib/getPages';

const { NEXT_PUBLIC_AEM_ROOT } = process.env;

const ProductCard = ({ product }) => {
    const {
        name,
        thumbnail: {
            url,
            label
        }, 
        price_range: {
            minimum_price: {
                final_price: {
                    currency,
                    value
                }
            }
        },
        url_key
    } = product;

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency });

    return (
        <Link href={`/catalog/product/${url_key}`}>
            <div>
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img src={url} alt={label} className="bg-gray-200 w-full h-full object-center object-cover lg:w-full lg:h-full" />
                </div>
                <div className="mt-4 flex justify-between">
                    <h3 className="font-semibold text-gray-700">{name}</h3>
                    <span className="mt-1 text-sm text-gray-500">{formatter.format(value)}</span>
                </div>
            </div>
        </Link>
    );
}

export default function Category(props) {
    const { category, pages } = props;
    return <Layout pages={pages}>
        <Head>
            <title>{category.name}</title>
        </Head>
        <section>
            <div className="bg-white">
                <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{category.name}</h1>
                    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {category.products.items.map(product => <ProductCard product={product} key={product.sku} />)}
                    </div>
                </div>
            </div>
        </section>
    </Layout>;
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { 'url-key': 'venia-tops' } }, { params: { 'url-key': 'venia-bottoms' } }],
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);

    const { data } = await client.query({
        query: gql`query getCategoryByUrlKey($urlKey : String!) {
            categories(filters: { url_key: {
                eq: $urlKey
            }}, pageSize: 1, currentPage: 1) {
                items {
                    image
                    name
                    products(pageSize: 20, currentPage: 1, sort: {}) {
                        items {
                            name
                            thumbnail {
                                label
                                url
                            }
                            price_range {
                                minimum_price {
                                    final_price {
                                        currency
                                        value
                                    }
                                }
                            }
                            sku
                            url_key
                            __typename
                        }
                    }
                }
            }
        }`,
        variables: {
            urlKey: params['url-key'],
        }
    });

    return {
        props: { pages, category: data.categories.items[0] },
    };
}