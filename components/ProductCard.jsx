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

export default ProductCard;