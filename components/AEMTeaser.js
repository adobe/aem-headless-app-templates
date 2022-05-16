import React, { Component } from 'react';
import { EditableComponent } from '@adobe/aem-react-editable-components';
import { TeaserV1IsEmptyFn } from '@adobe/aem-core-components-react-base';

import Image from './AEMImage';

const { NEXT_PUBLIC_AEM_SITE } = process.env;

export const TeaserEditConfig = {
    emptyLabel: 'Teaser',
    isEmpty: TeaserV1IsEmptyFn,
    resourceType: `${NEXT_PUBLIC_AEM_SITE}/components/teaser`
};

export class Teaser extends Component {

    get image() {
        const { imageLinkHidden, linkURL, imagePath } = this.props;

        if (!imagePath) {
            return <></>;
        }

        const imageProps = { src: imagePath };
        if (!imageLinkHidden) {
            imageProps['link'] = linkURL;
        }
        return <Image {...imageProps}></Image>
    }

    get pretitle() {
        const { pretitle } = this.props;

        if (pretitle) {
            return <div className='mt-6 text-sm text-gray-500'>{pretitle}</div>
        } else {
            return <></>
        }
    }

    get title() {
        const { title, titleType, titleLinkHidden } = this.props;
        const { url, valid, attributes } = this.props.link;

        if (!title) {
            return <></>;
        }

        const titleContent = valid && url && !titleLinkHidden
            ? <a href={url} {...attributes}>{title}</a>
            : title;
        const className = 'text-base font-semibold text-xl mb-2';

        switch (titleType) {
            case 'h1': return <h1 className={className}>{titleContent}</h1>;
            case 'h3': return <h3 className={className}>{titleContent}</h3>;
            case 'h4': return <h4 className={className}>{titleContent}</h4>;
            case 'h5': return <h5 className={className}>{titleContent}</h5>;
            case 'h6': return <h6 className={className}>{titleContent}</h6>;
            case 'h2':
            default:
                return <h2 className={className}>{titleContent}</h2>;
        }
    }

    get description() {
        const { description } = this.props;

        if (description) {
            return <div className='mt-6 text-sm text-gray-700' dangerouslySetInnerHTML={{ __html: description }}></div>
        } else {
            return <></>
        }
    }

    actions() {
        const { actionsEnabled, actions } = this.props;


        if (actionsEnabled) {
            return (
                <div className='cmp-teaser__action-container'>
                    {actions.map(({ id, url, title }) => (
                        <a className='cmp-teaser__action-link'
                            href={url.replace(/\.html$/, '')}
                            id={id}>
                            {title}
                        </a>
                    ))}
                </div>
            );
        } else {
            return <></>;
        }
    }

    render() {
        if (TeaserEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    {this.image}
                </div>
                <div className="px-6 py-4">
                    {this.pretitle}
                    {this.title}
                    {this.description}
                </div>
                {this.actions()}
            </div>
        );
    }
}

export const AEMTeaser = (props) => <EditableComponent config={TeaserEditConfig} {...props}><Teaser/></EditableComponent>;