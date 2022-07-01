import Head from 'next/head'
import Layout from '../../components/layout'
import { AdventureClient } from '../../lib/adventures';
import AdventureCard from '../../components/AdventureCard';

const { NEXT_PUBLIC_AEM_HOST } = process.env;

export default function Adventures({ adventures }) {
  return (
    <Layout>
      <Head>
        <title>Adventures</title>
      </Head>
      <section className=''>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Your next adventures can be one of these...</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {adventures.map(
                ({
                  _path,
                  title,
                  price,
                  tripLength,
                  primaryImage,
                }) => {
                  const pathItems = _path.split('/');
                  const cfPath = pathItems.slice(Math.max(pathItems.length - 2, 0)).join('/');
                  const path = `/adventures/${cfPath}`;
                  return (
                    <AdventureCard
                      key={_path}
                      path={path}
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
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const client = AdventureClient.fromEnv();
  const res = await client.getAllAdventures();
  const adventures = res?.data?.adventureList?.items;
  return {
    props: {
      adventures,
    },
  };
}