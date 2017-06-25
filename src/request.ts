import * as http from 'http';
import * as url from 'url';

export default function request(urlStr: string): Promise<string> {
  return new Promise((resolve) => {
    const parsedUrl = url.parse(urlStr, false);
    http.request({
      hostname: parsedUrl.hostname,
      path: parsedUrl.path
    },
    (res) => {
      const chunks: Array<any> = [];
      res
        .on('data', (chunk) => {
          chunks.push(chunk);
        })
        .on('end', () => {
          resolve(Buffer.concat(chunks).toString());
        });
      })
      .end();
  });
}