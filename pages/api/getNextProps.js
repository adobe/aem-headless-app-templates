const { DOMParser } = require('@xmldom/xmldom');
const { NEXT_PUBLIC_URL} = process.env;

export default async function handler(req, res) {
  let { path } = req.query;

  const pageRes = await fetch(NEXT_PUBLIC_URL + (path || ''));
  const pageText = await pageRes.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageText, 'text/html');
  const data = doc.getElementById('__NEXT_DATA__').textContent;
  res.status(200).json(data);
}