import { MapTo } from '@adobe/aem-react-editable-components'
import { AEMText } from './AEMText'
import { AEMTitle } from './AEMTitle'
import { AEMImage } from './AEMImage'
import { AEMTeaser } from './AEMTeaser'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/title`)(AEMTitle)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/text`)(AEMText)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/image`)(AEMImage)
MapTo(`${NEXT_PUBLIC_AEM_SITE}/components/teaser`)(AEMTeaser)