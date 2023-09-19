/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

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

export const Text = (props) => {
    const { richText, text } = props;
    const textCss = "text-gray-800 py-4 sm:py-2 lg:py-6";
    const richTextContent = () => (
        <div className={textCss} dangerouslySetInnerHTML={{__html: text}} />
    );
    const normalTextContent = () => (
        <div className={textCss}>{text}</div>
    );
    return richText ? richTextContent() : normalTextContent();
};

export const AEMText = (props) => <EditableComponent config={TextEditConfig} {...props}><Text/></EditableComponent>;