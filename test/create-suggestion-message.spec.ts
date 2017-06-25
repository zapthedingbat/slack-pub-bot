import createSuggestionMessage from '../src/create-suggestion-message';
import { Pub } from "../src/types";

describe('create suggestion message', () => {
  it('should create a message with the properties from the supplied pub object', () => {
    const testPub: Pub = {
      distance: 'test distance',
      imageUrl: 'test image url',
      location: 'test location',
      mapUrl: 'test map url',
      title: 'test title',
      url: 'test url'
    };
    const msg = createSuggestionMessage(testPub);

    expect(msg).toEqual({
      attachments: [​​
        {
          color: '#007AB8',​​
          mrkdwn_in: [​​'text'],​​
          text: 'test location\n_test distance_ <test map url|map>',​​
          thumb_url: 'test image url',​​
          title: '<test url|test title>',​
        },​​
      ],​​
      icon_emoji: ':beer:',​​
      mrkdwn: true,​​
      text: 'I found a pub nearby',​​
      unfurl_links: false,​​
    });
  })
});