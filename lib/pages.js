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

function transformToCQ(propKey) {
  const tempKey = propKey.substr(1);

  return 'cq' + tempKey.substr(0, 1).toUpperCase() + tempKey.substr(1);
}

export function modelToProps(item) {
  if (!item || !Object.keys(item).length) {
    return { cqPath: '' };
  }

  const keys = Object.getOwnPropertyNames(item);
  const props = {};

  keys.forEach((key) => {
    let propKey = key;

    if (propKey.startsWith(':')) {
      propKey = transformToCQ(propKey);
    }

    props[propKey] = item[key] || '';
  });

  return props;
}