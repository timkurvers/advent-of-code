import { time, wait } from '../../src/utils';

describe('concurrency utilities', () => {
  describe('time()', () => {
    it('executes given sync procedure, returning duration and result', async () => {
      const sync = () => 1337;
      const [duration, result] = await time(sync);
      expect(duration).toBeLessThan(5);
      expect(result).toEqual(1337);
    });

    it('executes given async procedure, returning duration and result', async () => {
      const async = async () => {
        await wait(1000);
        return 322;
      };
      const [duration, result] = await time(async);
      expect(duration).toBeGreaterThan(995);
      expect(duration).toBeLessThan(1250);
      expect(result).toEqual(322);
    });
  });

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
