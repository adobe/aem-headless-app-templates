import Head from 'next/head';
import Layout from '../components/layout';
import { getPageModel, getItemFromPageModel, modelToProps } from '../lib/pages';
import { ResponsiveGrid } from '@adobe/aem-react-editable-components'

const { NEXT_PUBLIC_AEM_PATH } = process.env;

export default function Home({ model }) {
  const responsiveGridModel = getItemFromPageModel(model, 'root/responsivegrid');
  const responsiveGridModelProps = modelToProps(responsiveGridModel);
  return (
    <Layout>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-2 lg:py-6">
          <ResponsiveGrid
            model = {responsiveGridModelProps}
            pagePath={NEXT_PUBLIC_AEM_PATH}
            itemPath='root/responsivegrid'
          />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const model = await getPageModel(NEXT_PUBLIC_AEM_PATH);
  return {
    props: {
      model
    }
  };
}