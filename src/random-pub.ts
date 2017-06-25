import { Pub } from "./types";
import request from "./request";
import random from "./random";
import parsePubResult from "./parse-pub-result";

let isDownloading = false;
let pubs: Array<Pub> = [];

async function downloadPubList(): Promise<Array<Pub>> {
  const data = await request('http://www.thegoodpubguide.co.uk/pub/search?name=&location=&distance=0.25&lat=51.51294&lng=-0.142024&ContentType=json&limit=20');
  const response = JSON.parse(data);
  return response.result.map(item => parsePubResult(item));
}

export default async function randomPub(): Promise<Pub> {
  if (!isDownloading) {
    isDownloading = true;
    pubs = await downloadPubList();
  }
  return pubs[random(pubs.length)];
}
