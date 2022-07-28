import React from 'react'
import { EditableComponent } from '@adobe/aem-react-editable-components'

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TitleEditConfig = {
    emptyLabel: 'Title',
    isEmpty: function(props) {
        return props.text == null || props.text.trim().length === 0;
    },
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/title`
};

export const Title = (props) => {
    return (<h1 className="text-2xl font-semibold my-2">{props.text}</h1>)
};

export const AEMTitle = (props) => <EditableComponent config={TitleEditConfig} {...props}><Title/></EditableComponent>;