const { NEXT_PUBLIC_AEM_HOST } = process.env

export async function getPageModel(path) {
  let pageModel = {};
  try {
    console.log(`fetching page model: ${NEXT_PUBLIC_AEM_HOST}${path}.model.json`)
    const response = await fetch(`${NEXT_PUBLIC_AEM_HOST}${path}.model.json`, {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4='
      }
    })
    pageModel = await response.json()
  } catch(e) {
    // invalid JSON?
  }
  return pageModel;
}

export function getItemFromPageModel(pageModel, itemPath) {
  const parts = itemPath.split('/');
  let obj = pageModel;

  for (let i = 0; i < parts.length && obj; i++) {
    obj = (obj[':items'] || {})[parts[i]];
  }

  return obj || {};
}