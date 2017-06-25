jest.resetModules();
jest.mock('../src/request');
jest.mock('../src/random');
jest.mock('../src/parse-pub-result');
import request from '../src/request';
import random from '../src/random';
import parsePubResult from '../src/parse-pub-result';
import randomPub from '../src/random-pub';

describe('random pub', () => {
  let actualPub1;
  let actualPub2;
  const expectedPub2 = {};
  const expectedPub1 = {};
  
  beforeEach(async () => {
    const testResponse = '{"result":["1","2"]}';
    request.mockReturnValue(Promise.resolve(testResponse));
    random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1);
    parsePubResult
      .mockReturnValueOnce(expectedPub1)
      .mockReturnValueOnce(expectedPub2);

    actualPub1 = await randomPub();
    actualPub2 = await randomPub();
  })

  it('should download the list of pubs the first time', async () => {
    expect(request).toHaveBeenCalledTimes(1);
    expect(parsePubResult).toHaveBeenCalledTimes(2);
  })

  it('should parse pub objects from the response and return the selected one', async () => {
    expect(parsePubResult).toBeCalledWith("1");
    expect(parsePubResult).toBeCalledWith("2");
    expect(actualPub1).toBe(expectedPub1);
    expect(actualPub2).toBe(expectedPub2);
  })
});