jest.mock('@slack/client');
import { WebClient } from '@slack/client';
import sendSlackMessage from '../src/send-slack-message';

describe('send slack message', () => {

  it('should should send the given message with the slack web client', async () => {
    const testMessage = {text: 'test text'};
    const mockPostMessage = jest.fn();
    global.process.env.SLACK_BOT_TOKEN = 'test token';
    WebClient.mockImplementation(() => {
      return {
        chat: { postMessage: mockPostMessage }
      }
    });

    sendSlackMessage('test channel', testMessage);

    expect(WebClient).toHaveBeenCalledWith('test token');
    expect(mockPostMessage).toHaveBeenCalledWith(
      'test channel',
      'test text',
      testMessage
    )
  });
});