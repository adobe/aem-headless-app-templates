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