import { ModelClient } from "@adobe/aem-spa-page-model-manager";

/**
 * Custom ModelClient meant to demonstrate how to customize the request sent to the AEM instance
 */
export default class CustomModelClient extends ModelClient {

    /**
     * Fetches a model using the given a resource path
     *
     * @param {string} modelPath - Path to the model
     * @return {*}
     */
    fetch(modelPath) {

        if (!modelPath) {
            let err = 'Fetching model rejected for path: ' + modelPath;
            return Promise.reject(new Error(err));
        }

        // Either the API host has been provided or we make an absolute request relative to the current host
        let url = `${this._apiHost}${modelPath}`;
        console.log(`custom model client is called ${url}`)

        return fetch(url,  {
            headers: {
                Authorization: 'Basic YWRtaW46YWRtaW4='
            }
        }).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error('while fetching the model for url: ' + url, response.statusText || response.status);
                error.response = response;

                // return Promise.reject(error);
            }
        });
    }
}
