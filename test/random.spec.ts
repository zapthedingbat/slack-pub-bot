import random from '../src/random';

describe('random', () => {

  beforeEach(() => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;
  })

  it('should return a random number using Math.random', () => {
    expect(random(10)).toEqual(5);
    expect(random(100)).toEqual(50);
  })
});