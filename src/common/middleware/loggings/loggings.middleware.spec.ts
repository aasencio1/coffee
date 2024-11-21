import { LoggingsMiddleware } from './loggings.middleware';

describe('LoggingsMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggingsMiddleware()).toBeDefined();
  });
});
