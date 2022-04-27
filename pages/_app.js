import '../styles/tailwind.css'
import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import CustomModelClient from '../lib/CustomModelClient'
import '../components/import-components'

const modelClient = new CustomModelClient(process.env.NEXT_PUBLIC_AEM_HOST)
ModelManager.initializeAsync({
  modelClient,
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
