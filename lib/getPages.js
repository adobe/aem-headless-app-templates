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
	return filteredPages;
}
export default getPages;
