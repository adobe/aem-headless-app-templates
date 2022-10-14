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
import Link from 'next/link';

const Breadcrumbs = ({ categories, product }) => {
    const category = categories.at(-1);
    const arrow = <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>;

    return <ul className="mb-8 text-sm text-gray-500 list-none inline-flex items-center space-x-1">
        {category.breadcrumbs.map(({ category_name, category_url_key }, index ) => <li key={`breadcrumb-${index}`} className="inline-flex items-center">
            <Link href={`/catalog/category/${category_url_key}`}>
                <a className="pr-2">{category_name}</a>
            </Link>
            {arrow}
        </li>)}
        <li className="inline-flex items-center">
            <Link href={`/catalog/category/${category.url_key}`}>
                <a className="pr-2">{category.name}</a>
            </Link>
            {arrow}
        </li>
        <li className="inline-flex items-center">{product.name}</li>
    </ul>;
};

export default Breadcrumbs;