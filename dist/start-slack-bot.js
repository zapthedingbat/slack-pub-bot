"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@slack/client");
const handle_slack_message_1 = require("./handle-slack-message");
const token = process.env.SLACK_BOT_TOKEN;
function startSlackBot() {
    const rtm = new client_1.RtmClient(token);
    rtm.on(client_1.RTM_EVENTS.MESSAGE, handle_slack_message_1.default);
    rtm.start();
    return () => { rtm.disconnect(); };
}
exports.default = startSlackBot;
//# sourceMappingURL=start-slack-bot.js.map