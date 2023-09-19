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

async function getPages(rootPath) {
  const server = process.env.NEXT_PUBLIC_AEM_HOST;
  const getRootPageModel = await (
    await fetch(`${server}${rootPath}.model.json`, {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    })
  ).json();

  const pages = getRootPageModel[':children'];

  const filteredPages = [];
  for (const page in pages) {
    const match = page.match(/^\/content\/wknd-app\/us\/en\/(\w+)$/i);
    if (match) {
      filteredPages.push({ href: `/${match[1]}`, name: pages[page]['title'] });
    }
  }

  // add custom pages
  filteredPages.push({ name: 'Adventures', href: '/adventures' });
  
  return filteredPages;
}
export default getPages;
