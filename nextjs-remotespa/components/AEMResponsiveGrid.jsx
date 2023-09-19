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

import { ResponsiveGrid, EditableComponent } from '@adobe/aem-react-editable-components';

const RESOURCE_TYPE = "wcm/foundation/components/responsivegrid";

const EditConfig = {
    emptyLabel: "Layout Container",
    isEmpty: function(props) { 
        return props.cqItemsOrder == null || props.cqItemsOrder.length === 0;
    },
    resourceType: RESOURCE_TYPE
};

export const AEMResponsiveGrid = (props) => (<EditableComponent config={EditConfig} {...props}><ResponsiveGrid customClassName='aemContainer'/></EditableComponent>);
