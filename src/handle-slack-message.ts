import randomPub from "./random-pub";
import createSuggestionMessage from "./create-suggestion-message";
import sendSlackMessage from "./send-slack-message";
import matchPubMessage from "./match-pub-message";

export default async function handleSlackMessage(message: any): Promise<void> {
  if (message.type === 'message' && message.subtype !== 'bot_message') {
    if (matchPubMessage(message.text)) {
      const pub = await randomPub();
      const pubMessage = createSuggestionMessage(pub);
      await sendSlackMessage(message.channel, pubMessage);
    }
  }
}