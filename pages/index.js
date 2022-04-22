import Head from 'next/head';
import Layout from '../components/layout';
import { getPageModel, getItemFromPageModel } from '../lib/pages';
import { AEMResponsiveGrid } from '../components/AEMResponsiveGrid';

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function Home({ model }) {
  const responsiveGridModel = getItemFromPageModel(model, 'root/responsivegrid');
  console.log(JSON.stringify(responsiveGridModel))
  const responsiveGridModelProps = modelToProps(responsiveGridModel);
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-2 lg:py-6">
          <AEMResponsiveGrid
            model = {responsiveGridModelProps}
            // pagePath={NEXT_PUBLIC_AEM_PATH}
            // itemPath='root/responsivegrid'
          />
        </div>
      </section>
    </Layout>
  )
}

function transformToCQ(propKey) {
  const tempKey = propKey.substr(1);

  return 'cq' + tempKey.substr(0, 1).toUpperCase() + tempKey.substr(1);
}

function modelToProps(item) {
  if (!item || !Object.keys(item).length) {
    return { cqPath: '' };
  }

  const keys = Object.getOwnPropertyNames(item);
  const props = {};

  keys.forEach((key) => {
    let propKey = key;

    if (propKey.startsWith(':')) {
      propKey = transformToCQ(propKey);
    }

    props[propKey] = item[key] || '';
  });

  return props;
}

export async function getServerSideProps() {
  const model = await getPageModel(NEXT_PUBLIC_AEM_PATH)
  console.log(model)
  return {
    props: {
      model
    }
  }
}