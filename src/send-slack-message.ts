import {
  WebClient
} from '@slack/client';

export default function sendSlackMessage(channel:string, message: any) {
  const token = process.env.SLACK_BOT_TOKEN;
  const web = new WebClient(token);
  web.chat.postMessage(
    channel,
    message.text,
    message
  );
}