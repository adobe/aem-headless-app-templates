import AEMHeadless from '@adobe/aem-headless-client-js';
//import getLocalStaticData from './data';
//import fetch from 'node-fetch';

export const scrollToId = (id) => {
  if (!id.startsWith('#')) {
    return;
  }
  const element = document.getElementById(id.substring(1));
  if (!element) {
    return null;
  }
  const boundingBox = element.getBoundingClientRect();
  window.scrollBy({
    top: boundingBox.top,
    behavior: 'smooth',
  });
};

const tryFetch = async (
  AEMHeadless,
  host,
  endpoint,
  variation,
  setState,
  isAuthor,
) => {
  try {
    AEMHeadless.serviceURL = host;

    // get data from AEM graphql call at endpoint, causes error if fetch fails
    const response = await AEMHeadless.runPersistedQuery(
      endpoint,
      { variation: variation, timestamp: Date.now() },
      { credentials: 'include' },
    );

    setState(response.data.pageByPath.item);
    return isAuthor ? 'author' : true;
  } catch (error) {
    // returns false if the fetch fails, will try next host
    return false;
  }
};

async function getData(
  variation,
  setStates,
  hostConfig,
  authorHost,
  publishHost,
  endpoint,
  AEMHeadless,
) {
  const { setData, setIsAuthorVersion, setFetchError, setCustomHost } =
    setStates;

  // setData(getLocalStaticData().data.pageByPath.item);
  // setCustomHost(publishHost);
  // setIsAuthorVersion(false);

  // return;

  // tryFetch() will return a truthy value if the fetch is successful
  let fetchWasSuccessful = null;

  const arr = [
    // {host: authorHost, isAuthor: true},
    { host: publishHost, isAuthor: false },
  ];

  for (let i = 0; i < arr.length; i++) {
    const { host, isAuthor } = arr[i];
    setCustomHost(host);
    fetchWasSuccessful = await tryFetch(
      AEMHeadless,
      host,
      endpoint,
      variation,
      setData,
      isAuthor,
    );
    if (fetchWasSuccessful) {
      break;
    }
  }

  // if no fetch was successful, set error state
  if (fetchWasSuccessful === false) {
    setFetchError({ type: 'publish', url: hostConfig.publishPath });
  }
  // if the author host was successful change the state to render the page in author view
  if (fetchWasSuccessful === 'author') {
    setIsAuthorVersion(true);
  }
}

function fetchAndSetData(hostConfig, setStates, fetchVariations) {
  // initializing AEM headless here for later
  const aemHeadlessClient = new AEMHeadless({
    serviceUrl: '',
    fetch: window.fetch,
  });

  console.log('fetchAndSetData', hostConfig, setStates, fetchVariations);

  // get queryparams and replace with default if it's not present
  // const urlParams = new URLSearchParams(window.location.search);
  // let authorHost = urlParams.get("authorHost");
  // if (!authorHost) {
  let authorHost = hostConfig.authorHost;
  //}
  if (!authorHost?.endsWith('/')) {
    authorHost = authorHost + '/';
  }

  // let publishHost = urlParams.get("publishHost");
  // if (!publishHost) {
  let publishHost = hostConfig.publishHost;
  //}
  if (!publishHost?.endsWith('/')) {
    publishHost = publishHost + '/';
  }

  // let endpoint = urlParams.get("endpoint");
  // if (!endpoint) {
  let endpoint = hostConfig.endpoint;
  // }
  if (endpoint?.startsWith('/')) {
    endpoint = endpoint.substring(1);
  }

  fetchVariations.forEach(async (fetchVariation) => {
    await getData(
      fetchVariation.variationName,
      { setData: fetchVariation.setData, ...setStates },
      hostConfig,
      authorHost,
      publishHost,
      endpoint,
      aemHeadlessClient,
    );
  });
}

export { fetchAndSetData };

export async function downloadData(hostConfig, variation) {
  // initializing AEM headless here for later

  let authorHost = hostConfig.authorHost;
  if (!authorHost?.endsWith('/')) {
    authorHost = authorHost + '/';
  }
  let publishHost = hostConfig.publishHost;
  if (!publishHost?.endsWith('/')) {
    publishHost = publishHost + '/';
  }
  let endpoint = hostConfig.endpoint;
  if (endpoint?.startsWith('/')) {
    endpoint = endpoint.substring(1);
  }

  const fetchWithReload = async (url, init) => {
    return fetch(url, { next: { revalidate: 36000 } });
  };

  const aemHeadlessClient = new AEMHeadless({
    endpoint: publishHost,
    serviceURL: publishHost,
    fetch: fetchWithReload,
  });

  // get data from AEM graphql call at endpoint, causes error if fetch fails
  const response = await aemHeadlessClient.runPersistedQuery(
    endpoint,
    { variation: variation, timestamp: Date.now() },
    { credentials: 'include' },
  );

  return response.data.pageByPath.item;
}
