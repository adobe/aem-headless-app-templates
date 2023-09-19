/*
 * Copyright 2023 Adobe. All rights reserved.
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

import Link from 'next/link'
import Image from 'next/image';
import Social from "@/components/Social";

export default async function Footer() {
    return (
        <footer className="bg-black text-white px-5 md:px-20 pb-20">
            <div className="md:flex pt-16 pb-2">
                <Image
                    src="https://wknd.site/content/experience-fragments/wknd/language-masters/en/site/footer/master/_jcr_content/root/container/container/image.coreimg.svg/1594412963641/wknd-logo-light.svg"
                    width={96}
                    height={35}
                    alt="WKND Logo"/>
                <div className="hidden md:flex justify-between md:mr-auto md:ml-10">
                    <Link href="/en-US/magazine/" className="p-4 hover:bg-yellow hover:text-black uppercase">Magazine</Link>
                    <Link href="/en-US/adventure-collection/all/" className="p-4 hover:bg-yellow hover:text-black uppercase">Adventures</Link>
                    <Link href="/en-US/faqs/" className="p-4 hover:bg-yellow hover:text-black uppercase">Faqs</Link>
                    <Link href="/en-US/aboutus/" className="p-4 hover:bg-yellow hover:text-black uppercase">About Us</Link>
                </div>
                <div className="flex justify-between md:ml-auto">
                    <div className="p-4">Follow Us</div>
                    <Social/>
                </div>
            </div>
            <div className="text-xs">
                <div className="my-7">Ⓒ 2019, WKND Site.</div>

                <div className="my-7">WKND is a fictitious adventure and travel website created by Adobe to demonstrate
                    how anyone can use
                    Adobe Experience Manager to build a beautiful, feature-rich website over a single weekend. This site
                    is built entirely with Adobe Experience Manager Core Components and Archetype that are available as
                    open source code to the public. The entire site source
                    code is available as open source as well and is accompanied with a detailed tutorial on how to
                    recreate the site.
                </div>

                <div className="my-7">Many of the beautiful images in the WKND site are available for purchase via <a
                    href="https://stock.adobe.com/">Adobe Stock</a>.
                </div>
            </div>
        </footer>
    )
}
