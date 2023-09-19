import Image from 'next/image';
import {cache} from 'react';
import {AdventureClient, NEXT_PUBLIC_AEM_HOST} from "../../../../lib/adventures";

export const revalidate = 43200; // 12 hours in seconds
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';
export const preferredRegion = 'auto';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const client = AdventureClient.fromEnv();
    const res = await client.getAllAdventures();
    const adventures = res?.data?.adventureList?.items;

    return adventures.map((adventure) => {
        const pathItems = adventure._path.split('/');
        return {
            lang: 'en-US',
            path: [pathItems[pathItems.length - 2], pathItems[pathItems.length - 1]],
        }
    })
}

const getAdventureByPath = cache(async (path) => {
    const client = AdventureClient.fromEnv();
    const res = await client.getAdventureByPath(path);
    const adventure = res?.data?.adventureByPath?.item;
    return adventure;
});

export default async function Page({params}) {
    console.log("Rendering "+ params.path[0] + "/" + params.path[1] + "/page.jsx");
    const cfPath = `/content/dam/aem-demo-assets/en/adventures/${params.path.join('/')}`;
    const adventure = await getAdventureByPath(cfPath);
    if (!adventure) return (<>Adventure not found</>);

    const {
        title,
        activity,
        adventureType,
        price,
        tripLength,
        groupSize,
        difficulty,
        primaryImage,
        description,
        itinerary,
    } = adventure;
    return (<article>
        <div className="">
            <div className="pt-6">

                <div
                    className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none">
                    <Image
                        src={`${NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
                        alt={title}
                        width={1680}
                        height={320}
                        loading='eager'
                        sizes="50vw"
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                </div>

                {/* Product info */}
                <div
                    className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl mb-10">{price}</p>
                        <dl>
                            <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium">Activity</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{activity}</dd>
                            </div>
                            <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium">Type</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{adventureType}</dd>
                            </div>
                            <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium">Trip Length</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{tripLength}</dd>
                            </div>
                            <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium">Group Size</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{groupSize}</dd>
                            </div>
                            <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium">Difficulty</dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{difficulty}</dd>
                            </div>
                        </dl>

                    </div>

                    <div
                        className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

                        <div className="mt-10 prose lg:prose-l dark:prose-invert">
                            <div className="mt-4" dangerouslySetInnerHTML={{
                                __html: description.html,
                            }}/>
                        </div>

                        <div className="mt-10 prose lg:prose-l dark:prose-invert">
                            <h2 className="">Itinerary</h2>

                            <div className="mt-4" dangerouslySetInnerHTML={{
                                    __html: itinerary.html,
                                }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </article>)
}
