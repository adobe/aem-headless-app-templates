import Layout from '../../components/layout';
import { AdventureClient } from '../../lib/adventures';
import Head from 'next/head';

const { NEXT_PUBLIC_AEM_HOST } = process.env;

export default function Adventure({ adventure }) {
  const {
    adventureTitle,
    adventureActivity,
    adventureType,
    adventurePrice,
    adventureTripLength,
    adventureGroupSize,
    adventureDifficulty,
    adventurePrimaryImage,
    adventureDescription,
    adventureItinerary,
  } = adventure;
  return (
    <Layout adventure>
      <Head>
        <title>{adventureTitle}</title>
      </Head>
      <article>
      <div className="bg-white">
      <div className="pt-6">
        
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none">
          <img
            alt={adventureTitle}
            src={`${NEXT_PUBLIC_AEM_HOST}${adventurePrimaryImage._path}`}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{adventureTitle}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 mb-10">{adventurePrice}</p>
            <dl>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Activity</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{adventureActivity}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{adventureType}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Trip Length</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{adventureTripLength}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Group Size</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{adventureGroupSize}</dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{adventureDifficulty}</dd>
              </div>
            </dl>

          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and Itinerary */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <div className="text-base text-gray-900" dangerouslySetInnerHTML={{
                  __html: adventureDescription.html,
                }}></div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-base font-bold text-gray-900">Itinerary</h2>

              <div className="mt-4 space-y-6">
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{
                  __html: adventureItinerary.html,
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = AdventureClient.fromEnv();
  const paths = await client.getAdventurePaths();
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const client = AdventureClient.fromEnv();
  const cfPath = params.path.join('/');
  const path = `/content/dam/wknd/en/adventures/${cfPath}`;
  const res = await client.getAdventureByPath(path);
  const adventure = res?.data?.adventureByPath?.item;
  return {
    props: {
      adventure,
    },
  };
}