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

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import importCSROnly from '../lib/importCSROnly';

// CSR Imports
const { togglePanel, cartItemsQuantity } = await importCSROnly(() =>
  import('StorefrontCart/api')
);

const { NEXT_PUBLIC_URL } = process.env;

export const siteTitle = 'WKND';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ children, pages }) {
  const cartBtnRef = useRef(null);

  useEffect(() => {
    if (!cartBtnRef.current) return;

    const watch = cartItemsQuantity.watch((qty) => {
      cartBtnRef.current.setAttribute('data-cart-qty', qty || '');
    });

    return () => {
      watch.cancel();
    };
  }, [cartBtnRef.current]);

  const router = useRouter();
  const isCurrentPage = (currPath) => {
    const path = router.asPath === '/' ? '/home' : router.asPath;
    return path.indexOf(currPath) === 0;
  };
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="AEM WKND built in Next.js" />
        <meta
          property="og:image"
          content={`${NEXT_PUBLIC_URL}/wknd-logo-dk.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="cq:pagemodel_router" content="disabled" />
      </Head>
      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-gray-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <a href="/">
                      <img
                        className="block w-auto h-8 lg:hidden"
                        src={NEXT_PUBLIC_URL + '/wknd-logo-dk.svg'}
                        alt="WKND"
                      />
                      <img
                        className="hidden w-auto h-8 lg:block"
                        src={NEXT_PUBLIC_URL + '/wknd-logo-dk.svg'}
                        alt="WKND"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {pages.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            aria-current={
                              isCurrentPage(item.href) ? 'page' : undefined
                            }
                            className={classNames(
                              isCurrentPage(item.href)
                                ? 'bg-yellow-300 text-gray-700'
                                : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  ref={cartBtnRef}
                  onClick={() => togglePanel('cart')}
                  className="p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    arial-label="Shopping Cart"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {pages.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isCurrentPage(item.href)
                        ? 'bg-yellow-300 text-gray-700'
                        : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main>{children}</main>
      <footer className="text-center bg-gray-200 lg:text-left">
        <div className="p-4 text-center text-gray-700">
          © 2022 Copyright:
          <a className="text-gray-800" href="https://wknd.site/">
            {' '}
            WKND Site
          </a>
        </div>
      </footer>
    </>
  );
}
