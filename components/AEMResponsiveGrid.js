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
