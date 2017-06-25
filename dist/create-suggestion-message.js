"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSuggestionMessage(pub) {
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
    };
}
exports.default = createSuggestionMessage;
//# sourceMappingURL=create-suggestion-message.js.map