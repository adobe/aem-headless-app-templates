import React from 'react';
import { withMappable } from '@adobe/aem-react-editable-components';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TextEditConfig = {
    emptyLabel: 'Text',
    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    },
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/text`
};

export const Text = ({ cqPath, richText, text }) => {
    const textCss = "text-gray-800 py-4 sm:py-2 lg:py-6";
    const richTextContent = () => (
        <div className={textCss}
            id="text"
            data-rte-editelement
            dangerouslySetInnerHTML={{__html: text}} />
    );
    return richText ? richTextContent() : (<div className={textCss}>{text}</div>);
};

export const AEMText = withMappable(Text, TextEditConfig);