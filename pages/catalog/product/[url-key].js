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

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Error from 'next/error';

import client from '../../../lib/graphqlClient';
import Layout from '../../../components/layout';
import getPages from '../../../lib/getPages';
import importCSROnly from '../../../lib/importCSROnly';
import getProductByUrlKey from './getProductByUrlKey.graphql';
import Gallery from '../../../components/Gallery';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Login from '../../../components/Login';
import ProductConfiguration from '../../../components/ProductConfiguration';

// CSR Imports
const { customerToken, addProductsToCart } = await importCSROnly(() =>
  import('StorefrontCart/api')
);

const { NEXT_PUBLIC_AEM_ROOT } = process.env;

export default function Product(props) {
  const [loggedIn, setLoggedIn] = useState(!!customerToken?.value);
  const optionsRef = useRef(null);

  useEffect(() => {
    const watch = customerToken.watch((token) => {
      setLoggedIn(!!token);
    });

    return () => {
      watch.cancel();
    };
  }, []);

  const { product, pages } = props;

  if (!product) {
    return <Error statusCode={404} />;
  }

  const {
    name,
    sku,
    description: { html },
    categories,
    media_gallery,
    price_range: {
      minimum_price: {
        final_price: { currency, value },
      },
    },
    configurable_options,
  } = product;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return (
    <Layout pages={pages}>
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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                  {name}
                </h1>

                <p className="text-3xl tracking-tight text-gray-900 mb-6">
                  $192
                </p>

                <form ref={optionsRef} className="flex flex-col gap-6 mb-8">
                  <ProductConfiguration options={configurable_options} />
                </form>

                <div className="mt-0 mb-8 w-full grid grid-flow-row gap-1">
                  {loggedIn ? (
                    <button
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        const formData = new FormData(optionsRef.current);
                        const values = Object.fromEntries(formData);
                        const optionsUIDs = Object.values(values);
                        addProductsToCart([{ quantity: 1, sku, optionsUIDs }]);
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <Login />
                  )}
                </div>

                <span
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);

  const { data } = await client.query({
    query: getProductByUrlKey,
    variables: {
      urlKey: params['url-key'],
    },
  });

  const product = data?.products?.items?.[0] || null;
  return {
    props: { pages, product },
  };
}
