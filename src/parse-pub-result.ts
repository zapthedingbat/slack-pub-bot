import { Pub } from "./types";

const latPattern = /data-lat="([^"]+)"/;
const lngPattern = /data-lng="([^"]+)"/;
const linkPattern = /href="([^"]+)"/;
const titlePattern = /"pub-title-text">([^<]+)<\//;
const addressPattern = /"pub-address">([^<]+)<\//;
const locationPattern = /"pub-location">([^<]+)<\//;
const distancePattern = /"pub-distance">\(([^)]+)\)<\//;
const imageUrlPattern = /img src="([^"]+)"/;

function getMatch(pattern:RegExp, input:string):string {
  const match = pattern.exec(input);
  if (match && match[1]) {
    return match[1].trim();
  }
  return '';
}

function createMapUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lng}&travelmode=walking`;
}

export default function parsePubResult(item): Pub {
  const html = item.html;
  const url = `http://www.thegoodpubguide.co.uk${getMatch(linkPattern, html)}`;
  const lat = getMatch(latPattern, html);
  const lng = getMatch(lngPattern, html);
  const title = getMatch(titlePattern, html);
  const location = `${getMatch(addressPattern, html)} ${getMatch(locationPattern, html)}`;
  const mapUrl = createMapUrl(lat, lng);
  const distance = getMatch(distancePattern, html);
  const imageUrl = `http://www.thegoodpubguide.co.uk${getMatch(imageUrlPattern, html)}`;

  const pub:Pub = {
    title,
    location,
    url,
    distance,
    imageUrl,
    mapUrl
  }
  return pub;
}
