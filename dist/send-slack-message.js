"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@slack/client");
const token = process.env.SLACK_BOT_TOKEN;
function sendSlackMessage(channel, message) {
    const web = new client_1.WebClient(token);
    web.chat.postMessage(channel, message.text, message);
}
exports.default = sendSlackMessage;
//# sourceMappingURL=send-slack-message.js.map