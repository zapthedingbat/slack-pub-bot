import parsePubResult from '../src/parse-pub-result';

const htmlFixture = '<a\n ' +
  'href=\"\/test url\"\n' +
  'data-lat=\"test lat\"\n' +
  'data-lng=\"test lng\"\n ' +
  '>' +
  '<img src=\"\/test image url\">\n' +
  '<span class=\"pub-title-text\">test title<\/span>\n' +
  '<span class=\"pub-distance\">(test distance)<\/span>' +
  '<div class=\"pub-address\">\n' +
  'location 1\n' +
  '<\/div>\n' +
  '<div class=\"pub-location\">\n' +
  'location 2' +
  '<\/div>\n';

const inputFixture = {
  html: htmlFixture
}

const expectedFixture = {
  title: 'test title',
  location: 'location 1 location 2',
  url: 'http://www.thegoodpubguide.co.uk/test url',
  distance: 'test distance',
  imageUrl: 'http://www.thegoodpubguide.co.uk/test image url',
  mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=test lat,test lng&travelmode=walking'
};

describe('parse pub result', () => {
  it.only('should construct the pub object from the HTML in the result', async () => {
    const actual = parsePubResult(inputFixture);
    expect(actual).toEqual(expectedFixture);
  })
});