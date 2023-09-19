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

export default function Sidebar({isOpen, toggle}) {
    return (
        <nav className="touch-none overscroll-none no-scrollbar bg-white dark:bg-gray-800 transition-all duration-400 md:hidden fixed w-full h-full overflow-hidden  pt-[135px] left-0 z-10"
             style={{
                 opacity: `${isOpen ? "1" : "0"}`,
                 top: ` ${isOpen ? "0" : "-100%"}`,
             }}>
            <ul className="text-2xl">
                <li>
                    <Link onClick={toggle} href="/en-US" prefetch={true}>
                        <button className="w-full text-left py-3 px-6">Home</button>
                    </Link>
                </li>
                <li>
                    <Link onClick={toggle} href="/en-US/magazine" prefetch={true}>
                        <button className="w-full text-left py-3 px-6">Magazine</button>
                    </Link>
                </li>
                <li>
                    <Link onClick={toggle} href="/en-US/adventure-collection/all" prefetch={true}>
                        <button className="w-full text-left py-3 px-6">Adventures</button>
                    </Link>
                </li>
                <li>
                    <Link onClick={toggle} href="/en-US/faqs" prefetch={true}>
                        <button className="w-full text-left py-3 px-6">Faqs</button>
                    </Link>
                </li>
                <li>
                    <Link onClick={toggle} href="/en-US/aboutus" prefetch={true}>
                        <button className="w-full text-left py-2 px-6">About Us</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
