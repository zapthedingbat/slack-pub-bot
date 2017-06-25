"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
let pubs = [];
const latPattern = /data-lat="([^"]+)"/;
const lngPattern = /data-lng="([^"]+)"/;
const linkPattern = /href="([^"]+)"/;
const titlePattern = /"pub-title-text">([^<]+)<\//;
const addressPattern = /"pub-address">([^<]+)<\//;
const locationPattern = /"pub-location">([^<]+)<\//;
const distancePattern = /"pub-distance">\(([^)]+)\)<\//;
const imageUrlPattern = /img src="([^"]+)"/;
function getMatch(pattern, input) {
    const match = pattern.exec(input);
    if (match && match[1]) {
        return match[1].trim();
    }
    return '';
}
function createMapUrl(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lng}&travelmode=walking`;
}
function parsePubItem(item) {
    const html = item.html;
    const url = 'http://www.thegoodpubguide.co.uk' + getMatch(linkPattern, html);
    const lat = getMatch(latPattern, html);
    const lng = getMatch(lngPattern, html);
    const title = getMatch(titlePattern, html);
    const location = `${getMatch(addressPattern, html)} ${getMatch(locationPattern, html)}`;
    const mapUrl = createMapUrl(lat, lng);
    const distance = getMatch(distancePattern, html);
    const imageUrl = getMatch(imageUrlPattern, html);
    const newPub = {
        title,
        location,
        url,
        distance,
        imageUrl,
        mapUrl
    };
    return newPub;
}
function downloadPubList() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield request_1.default('http://www.thegoodpubguide.co.uk/pub/search?name=&location=&distance=0.25&lat=51.51294&lng=-0.142024&ContentType=json&limit=20');
        const response = JSON.parse(data);
        return response.result.map(parsePubItem);
    });
}
function randomPub() {
    return __awaiter(this, void 0, void 0, function* () {
        if (pubs.length === 0) {
            pubs = yield downloadPubList();
        }
        return pubs[Math.floor(Math.random() * pubs.length)];
    });
}
exports.default = randomPub;
//# sourceMappingURL=random-pub.js.map