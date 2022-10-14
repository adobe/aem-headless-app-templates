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

import React from 'react';
import Head from 'next/head';
import Error from 'next/error';

import client from '../../../lib/graphqlClient';
import Layout from '../../../components/layout';
import getPages from '../../../lib/getPages';
import getProductByUrlKey from './getProductByUrlKey.graphql';
import Gallery from '../../../components/Gallery';
import Breadcrumbs from '../../../components/Breadcrumbs';

const { NEXT_PUBLIC_AEM_ROOT } = process.env;

export default function Product(props) {
    const { product, pages } = props;

    if (!product) {
        return <Error statusCode={404} />
    }

    const {
        name,
        sku,
        description: {
            html
        },
        categories,
        media_gallery,
        price_range: {
            minimum_price: {
                final_price: {
                    currency,
                    value
                }
            }
        },
        custom_attributes
    } = product;

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency });

    return <Layout pages={pages}>
        <Head>
            <title>{name}</title>
        </Head>
        <section>
            <div className="bg-white">
                <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <Breadcrumbs categories={categories} product={product} />
                    <div className="gap-8 flex flex-col md:flex-row">
                        <div className="basis-1/3">
                            <Gallery media_gallery={media_gallery} />
                        </div>
                        <div className="basis-2/3">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{name}</h1>
                            <div className="p-6 grid grid-cols-[25%_75%] gap-4 rounded border border-gray-200 shadow-md my-6">
                                <span className="text-right text-sm text-gray-500">SKU</span>
                                <span>{sku}</span>
                                <span className="text-right text-sm text-gray-500">Price</span>
                                <span>{formatter.format(value)}</span>
                                {custom_attributes.map(attribute => {
                                    const {
                                        attribute_metadata: { 
                                            label,
                                            uid : attribute_uid
                                        },
                                        selected_attribute_options: { 
                                            attribute_option 
                                        }
                                    } = attribute;
                                    return <React.Fragment key={`${label}-key`}>
                                        <span className="text-right text-sm text-gray-500">{label}</span>
                                        <span>
                                            <select name={attribute_uid} defaultValue={attribute_option.filter(o => o.is_default)?.uid}>
                                                {attribute_option.map(option => <option key={option.uid} value={option.uid}>{option.label}</option>)}
                                            </select>
                                        </span>
                                    </React.Fragment>;
                                })}
                            </div>
                            <div className="col-span-2 block p-6 rounded border border-gray-200 shadow-md">
                                <span dangerouslySetInnerHTML={{ __html: html }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>;
}

export async function getServerSideProps({ params }) {
    const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);

    const { data } = await client.query({
        query: getProductByUrlKey,
        variables: {
            urlKey: params['url-key'],
        }
    });

    const product = data?.products?.items?.[0] || null;
    return {
        props: { pages, product },
    };
}