jest.mock('../src/random-pub');
jest.mock('../src/create-suggestion-message');
jest.mock('../src/send-slack-message');
jest.mock('../src/match-pub-message');
import randomPub from '../src/random-pub';
import sendSlackMessage from '../src/send-slack-message';
import createSuggestionMessage from '../src/create-suggestion-message';
import matchPubMessage from '../src/match-pub-message';
import handleSlackMessage from '../src/handle-slack-message';

describe('handle slack message', () => {
  it('should send a message when a user mentions drinking', async () => {
    jest.resetAllMocks();
    const testMessage = {
      type: 'message',
      subtype: 'not a bot message',
      text: 'test message',
      channel: 'test channel'
    };
    const testSuggestionMessage = { testSuggestionMessage: true };
    const testPub = { testPub: true };
    matchPubMessage.mockReturnValue(true);
    randomPub.mockReturnValue(Promise.resolve(testPub));
    createSuggestionMessage.mockReturnValue(testSuggestionMessage)

    await handleSlackMessage(testMessage);
    
    expect(matchPubMessage).toHaveBeenCalledWith('test message');
    expect(createSuggestionMessage).toHaveBeenCalledWith(testPub);
    expect(sendSlackMessage).toHaveBeenCalledWith('test channel', testSuggestionMessage);
  })

  it('should ignore messages that are not about drinking', async () => {
    jest.resetAllMocks();
    const testMessage = {
      type: 'message',
      subtype: 'not a bot message',
      text: 'a message not about drinking' // (Not drinking)
    };
    matchPubMessage.mockReturnValue(false);

    await handleSlackMessage(testMessage);
    
    expect(matchPubMessage).toHaveBeenCalledWith('a message not about drinking');
    expect(randomPub).not.toHaveBeenCalled();
    expect(createSuggestionMessage).not.toHaveBeenCalled();
    expect(sendSlackMessage).not.toHaveBeenCalled();
  }),

  it('should ignore messages from bots', async () => {
    jest.resetAllMocks();
    const testMessage = {
      type: 'message',
      subtype: 'bot_message',
      text: 'test message'
    };

    await handleSlackMessage(testMessage);
    
    expect(matchPubMessage).not.toHaveBeenCalled();
    expect(randomPub).not.toHaveBeenCalled();
    expect(createSuggestionMessage).not.toHaveBeenCalled();
    expect(sendSlackMessage).not.toHaveBeenCalled();
  })  
});