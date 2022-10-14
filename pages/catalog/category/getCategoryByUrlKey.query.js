import { gql } from "@apollo/client";

const query = gql`query getCategoryByUrlKey($urlKey: String!) {
    categories(
        filters: { url_key: { eq: $urlKey } }
        pageSize: 1
        currentPage: 1
    ) {
        items {
            image
            name
            products(pageSize: 20, currentPage: 1, sort: {}) {
                items {
                    name
                    thumbnail {
                        label
                        url
                    }
                    price_range {
                        minimum_price {
                            final_price {
                                currency
                                value
                            }
                        }
                    }
                    sku
                    url_key
                    __typename
                }
            }
        }
    }
}`;

export default query;