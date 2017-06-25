jest.mock('../src/start-slack-bot');
import startSlackBot from '../src/start-slack-bot';
import index from '../src/index';

describe('index', () => {
  it('should start the slack bot', async () => {
    const x = index; // Mist be referenced
    expect(startSlackBot).toHaveBeenCalled();
  })
});