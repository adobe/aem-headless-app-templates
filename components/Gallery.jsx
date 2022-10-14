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

import React from 'react'
import { useState } from 'react';

import OptimizedImage from './OptimizedImage';

const Gallery = ({ media_gallery }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = media_gallery?.filter(i => i.__typename === 'ProductImage');

    if (!images || images.length === 0) {
        return null;
    }

    return <div>
        <div>
            <OptimizedImage className="shadow-lg rounded bg-gray-200 w-full h-full object-center object-cover lg:w-full lg:h-full" src={images[currentImage].url} alt={images[currentImage].label} width={395} priority />
        </div>
        <div className="flex gap-12 flex-row flex-wrap py-5">
            {images.map((image, index) => (
                <div onClick={() => setCurrentImage(index)} key={`image-${index}`} className="cursor-pointer shadow-md basis-1/4 rounded overflow-hidden">
                    <OptimizedImage src={image.url} alt={image.label} width={100} />
                </div>
            ))}
        </div>
    </div>;
};

export default Gallery;