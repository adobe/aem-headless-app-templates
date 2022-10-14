import { gql } from "@apollo/client";

const query = gql`query getProductByUrlKey($urlKey: String!) {
    products(
        filter: { url_key: { eq: $urlKey } }
        pageSize: 1
        currentPage: 1
    ) {
        items {
            name
            sku
            description {
                html
            }
            categories {
                name
                url_key
                breadcrumbs {
                    category_name
                    category_url_key
                }
            }
            media_gallery {
                label
                url
                __typename
            }
            price_range {
                minimum_price {
                    final_price {
                        currency
                        value
                    }
                }
            }
            custom_attributes {
                attribute_metadata {
                    label
                    code
                    uid
                }
                selected_attribute_options {
                    attribute_option {
                        is_default
                        label
                        uid
                    }
                }
            }
        }
    }
}`;

export default query;