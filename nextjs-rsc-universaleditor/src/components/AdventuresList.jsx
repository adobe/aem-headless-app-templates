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

import AdventureCard from "./AdventureCard";
import Link from "next/link";
import {adventureCollections, getAdventures, NEXT_PUBLIC_AEM_HOST} from "../lib/adventures";

export default async function AdventuresList({lang = '', collectionSlug = 'all', showCategoryPicker = true}) {
    const adventures = await getAdventures(lang);
    const activeCollection = adventureCollections.find((collection) => collection.slug === collectionSlug);
    const filteredAdventures = adventures.filter(activeCollection.predicate);

    return (<div className="mb-20">
            {showCategoryPicker &&
            <ul className="flex-wrap flex p-2 max-w-[1154px] md:px-5 mx-auto ">
                {adventureCollections.map((filter) => (
                    <li className="mr-3" key={filter.slug}>
                        <Link
                            className={`${filter.slug === activeCollection.slug ? "bg-black text-white hover:text-yellow dark:bg-yellow dark:text-black dark:hover:text-black" : " text-black hover:bg-yellow dark:bg-black dark:text-white dark:hover:text-black dark:hover:bg-yellow"} inline-block uppercase py-3 px-4`}
                            href={`/adventure-collection/${filter.slug}`}
                            scroll={false}
                            prefetch={true}
                        >{filter.name}</Link>
                    </li>
                ))}
            </ul>}
            <div
                className="p-2 max-w-[1154px] md:px-5 mx-auto grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filteredAdventures.map(
                    ({_path, title, price, tripLength, primaryImage}, index) => {
                        const pathItems = _path.split('/');
                        const cfPath = pathItems.slice(Math.max(pathItems.length - 2, 0)).join('/');
                        const href = `/adventures/${cfPath}`;
                        return (
                            <AdventureCard
                                eager={index < 0}
                                key={_path}
                                href={href}
                                title={title}
                                price={price}
                                duration={tripLength}
                                imageSrc={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
                            />
                        );
                    }
                )}
            </div>
        </div>


    )
}
