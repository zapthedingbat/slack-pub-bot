import matchPubMessage from '../src/match-pub-message';

describe('match pub message', () => {
  it('should match messages about drinking', () => {
    expect(matchPubMessage('windmill')).toBeTruthy();
    expect(matchPubMessage('beer')).toBeTruthy();
    expect(matchPubMessage('drink')).toBeTruthy();
    expect(matchPubMessage('pint')).toBeTruthy();
    expect(matchPubMessage('pub')).toBeTruthy();
    expect(matchPubMessage('pub ')).toBeTruthy();
    expect(matchPubMessage(' pub')).toBeTruthy();
    expect(matchPubMessage('pub?')).toBeTruthy();
    expect(matchPubMessage('the pub? x')).toBeTruthy();
    expect(matchPubMessage('the Pub')).toBeTruthy();
    expect(matchPubMessage('pub:beer:')).toBeTruthy();
    expect(matchPubMessage(':beer:pub')).toBeTruthy();
  })

  it('should not match messages that are not about drinking', () => {
    expect(matchPubMessage('donkey')).toBeFalsy();
    expect(matchPubMessage('')).toBeFalsy();
    expect(matchPubMessage('republic')).toBeFalsy();
    expect(matchPubMessage('rePublic')).toBeFalsy();
    expect(matchPubMessage('re-publish')).toBeFalsy();
    expect(matchPubMessage('sub-pub')).toBeFalsy();
    expect(matchPubMessage('%pub')).toBeFalsy();
    expect(matchPubMessage('pub-sub')).toBeFalsy();
    expect(matchPubMessage('sub/pub')).toBeFalsy();
    expect(matchPubMessage('pub)')).toBeFalsy();
  })
});