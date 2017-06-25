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
const random_pub_1 = require("./random-pub");
const create_suggestion_message_1 = require("./create-suggestion-message");
const send_slack_message_1 = require("./send-slack-message");
function handleSlackMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.type === 'message' && message.subtype !== 'bot_message') {
            if (/\b(windmill|drink|drinks|beer|pub)\b/.test(message.text)) {
                const pub = yield random_pub_1.default();
                const pubMessage = create_suggestion_message_1.default(pub);
                yield send_slack_message_1.default(message.channel, pubMessage);
            }
        }
    });
}
exports.default = handleSlackMessage;
//# sourceMappingURL=handle-slack-message.js.map