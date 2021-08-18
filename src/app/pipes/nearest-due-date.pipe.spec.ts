import { NearestDueDatePipe } from './nearest-due-date.pipe';

describe('SortByPipe', () => {
  it('create an instance', () => {
    const pipe = new NearestDueDatePipe();
    expect(pipe).toBeTruthy();
  });
});
