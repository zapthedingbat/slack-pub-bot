jest.mock('http');
import * as http from 'http';
import request from '../src/request';
import { EventEmitter } from "events";

describe('request', () => {
  it('should download all data for the specified url', async () => {
    const mockRequest = { end: jest.fn() };
    const mockResponse = new EventEmitter();
    const mockHttpRequest = (obj, func) => {
      func(mockResponse);
      mockResponse.emit('data', new Buffer('test data 1'));
      mockResponse.emit('data', new Buffer('test data 2'));
      mockResponse.emit('end');
      return mockRequest;
    };
    http.request.mockReturnValue(mockRequest);
    http.request.mockImplementation(mockHttpRequest);

    const result = await request('http://www.example.com/test/path?test=query');
    
    expect(http.request).toHaveBeenCalledWith({
      hostname: 'www.example.com',
      path: '/test/path?test=query'
    }, expect.any(Function));
    expect(mockRequest.end).toHaveBeenCalled();
    expect(result).toEqual('test data 1test data 2');
  });
});