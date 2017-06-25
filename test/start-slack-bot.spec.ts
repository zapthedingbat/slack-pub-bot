jest.mock('@slack/client');
jest.mock('../src/handle-slack-message');
import {
  RtmClient,
  RTM_EVENTS
} from '@slack/client';
import handleSlackMessage from '../src/handle-slack-message';
import startSlackBot from '../src/start-slack-bot';

describe('start slack bot', () => {

  it('should connect to slack', async () => {
    global.process.env.SLACK_BOT_TOKEN = 'test token';
    const mockRtmClient = {
      on: jest.fn(),
      start: jest.fn()
    };
    RtmClient.mockImplementation(jest.fn(() => mockRtmClient));
    
    startSlackBot();

    expect(RtmClient).toHaveBeenCalledWith('test token');
    expect(mockRtmClient.on).toHaveBeenCalledWith(RTM_EVENTS.MESSAGE, handleSlackMessage);
    expect(mockRtmClient.start).toHaveBeenCalled();
  });
});