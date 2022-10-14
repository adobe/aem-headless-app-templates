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
import React from 'react';

const OptimizedImage = ({ className, alt = '', src, width, priority = false }) => {
    const url = new URL(src);
    const { pathname } = url;
    const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

    const originalSrc = `${src}?width=${width}&format=${ext}&optimize=medium`;
    const optimizedSrc = `${src}?width=${width}&format=webply&optimize=medium`;

    return <>
        { priority && <Head>
            <link rel="preload" href={optimizedSrc} as="image" />
        </Head> }
        <picture>
            <source srcSet={optimizedSrc} />
            <img className={className} src={originalSrc} alt={alt} loading={priority ? 'eager' : 'lazy'} />
        </picture>
    </>;
};

export default OptimizedImage;