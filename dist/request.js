"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
function request(urlStr) {
    return new Promise((resolve) => {
        const parsedUrl = url.parse(urlStr, false);
        http.request({
            hostname: parsedUrl.hostname,
            path: parsedUrl.path
        }, (res) => {
            const chunks = [];
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
exports.default = request;
//# sourceMappingURL=request.js.map