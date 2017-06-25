import {
  RtmClient,
  RTM_EVENTS
} from '@slack/client';
import handleSlackMessage from "./handle-slack-message";

export default function startSlackBot() {
  const token = process.env.SLACK_BOT_TOKEN;
  const rtm: RtmClient = new RtmClient(token);
  rtm.on(RTM_EVENTS.MESSAGE, handleSlackMessage);
  rtm.start();
}
