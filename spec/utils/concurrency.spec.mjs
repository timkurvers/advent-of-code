import { wait } from '../../utils';

describe('concurrency utilities', () => {
  describe('wait()', () => {
    it('delays execution until next tick when duration is zero', async () => {
      const spy = jest.spyOn(global, 'setImmediate');
      await wait();
      expect(spy).toHaveBeenCalled();
    });

    it('delays execution for given duration', async () => {
      const spy = jest.spyOn(global, 'setTimeout');
      await wait(100);
      expect(spy).toHaveBeenCalledWith(
        expect.any(Function),
        100,
      );
    });
  });
});
