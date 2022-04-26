import React from 'react'
import { EditableComponent } from '@adobe/aem-react-editable-components'
import { TitleV2IsEmptyFn } from '@adobe/aem-core-components-react-base'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TitleEditConfig = {
    emptyLabel: 'Title',
    isEmpty: TitleV2IsEmptyFn,
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/title`
};

export const Title = (props) => {
    return (<h1 className="text-2xl font-semibold my-2">{props.text}</h1>)
};

export const AEMTitle = (props) => <EditableComponent config={TitleEditConfig} {...props}><Title/></EditableComponent>;