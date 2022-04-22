import React from 'react';
import { EditableComponent } from '@adobe/aem-react-editable-components';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    },
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/text`
};

export const Text = ({ richText, text }) => {
    const textCss = "text-gray-800 py-4 sm:py-2 lg:py-6";
    const richTextContent = () => (
        <EditableComponent config={TextEditConfig}>
            <div className={textCss} dangerouslySetInnerHTML={{__html: text}} />
        </EditableComponent>
    );
    const normalTextContent = () => (
        <EditableComponent config={TextEditConfig}>
            <div className={textCss}>{text}</div>
        </EditableComponent>
    );
    return richText ? richTextContent() : normalTextContent();
};

export const AEMText = Text;