const { DOMParser } = require('xmldom');
const { NEXT_PUBLIC_URL} = process.env;

export default async function handler(req, res) {
  let { path } = req.query;

  const previewRes = await fetch(`${NEXT_PUBLIC_URL}/api/preview?slug=${(path || '/')}`);
  const cookies = previewRes.headers.get('set-cookie');
  const cookieReq = cookies.split(',').map(cookie => cookie.split(';')[0]).join(';');

  const pageRes = await fetch(`${NEXT_PUBLIC_URL}${(path || '/')}`, {
    headers: {
      'Cookie': cookieReq
    }
  });

  const pageHtml = await pageRes.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageHtml, 'text/html');
  const data = doc.getElementById('__NEXT_DATA__').textContent;
  res.status(200).json(data);
}
