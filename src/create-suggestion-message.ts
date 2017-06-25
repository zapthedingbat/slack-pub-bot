import { Pub } from "./types";

export default function createSuggestionMessage(pub: Pub): any {
  return {
    "unfurl_links": false,
    "mrkdwn": true,
    "icon_emoji": ":beer:",
    "text": "I found a pub nearby",
    "attachments": [{
      "color": "#007AB8",
      "title": `<${pub.url}|${pub.title}>`,
      "text": `${pub.location}\n_${pub.distance}_ <${pub.mapUrl}|map>`,
      "thumb_url": pub.imageUrl,
      "mrkdwn_in": ["text"]
    }]
  }
}