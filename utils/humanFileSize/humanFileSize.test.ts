import { humanFileSize } from './humanFileSize';
import { KB_IN_BYTES, MB_IN_BYTES, GB_IN_BYTES, TB_IN_BYTES } from 'constants/index';

describe('utils: humanFileSize', () => {
  it('should correctly display kB', () => {
    expect(humanFileSize(KB_IN_BYTES)).toBe('1 kB');
    expect(humanFileSize(KB_IN_BYTES * 10)).toBe('10 kB');
    expect(humanFileSize(KB_IN_BYTES * 100)).toBe('100 kB');
  });

  it('should correctly display MB', () => {
    expect(humanFileSize(MB_IN_BYTES)).toBe('1 MB');
    expect(humanFileSize(MB_IN_BYTES * 10)).toBe('10 MB');
    expect(humanFileSize(MB_IN_BYTES * 100)).toBe('100 MB');
  });

  it('should correctly display GB', () => {
    expect(humanFileSize(GB_IN_BYTES)).toBe('1 GB');
    expect(humanFileSize(GB_IN_BYTES * 10)).toBe('10 GB');
    expect(humanFileSize(GB_IN_BYTES * 100)).toBe('100 GB');
  });

  it('should correctly display TB', () => {
    expect(humanFileSize(TB_IN_BYTES)).toBe('1 TB');
    expect(humanFileSize(TB_IN_BYTES * 10)).toBe('10 TB');
    expect(humanFileSize(TB_IN_BYTES * 100)).toBe('100 TB');
  });

  it('should correctly display decimal places for kB', () => {
    expect(humanFileSize(KB_IN_BYTES, 1)).toBe('1.0 kB');
    expect(humanFileSize(KB_IN_BYTES, 2)).toBe('1.00 kB');
    expect(humanFileSize(KB_IN_BYTES, 3)).toBe('1.000 kB');
    expect(humanFileSize(KB_IN_BYTES * 10, 1)).toBe('10.0 kB');
    expect(humanFileSize(KB_IN_BYTES * 10, 2)).toBe('10.00 kB');
    expect(humanFileSize(KB_IN_BYTES * 10, 3)).toBe('10.000 kB');
    expect(humanFileSize(KB_IN_BYTES * 100, 1)).toBe('100.0 kB');
    expect(humanFileSize(KB_IN_BYTES * 100, 2)).toBe('100.00 kB');
    expect(humanFileSize(KB_IN_BYTES * 100, 3)).toBe('100.000 kB');
  });

  it('should correctly display decimal places for MB', () => {
    expect(humanFileSize(MB_IN_BYTES, 1)).toBe('1.0 MB');
    expect(humanFileSize(MB_IN_BYTES, 2)).toBe('1.00 MB');
    expect(humanFileSize(MB_IN_BYTES, 3)).toBe('1.000 MB');
    expect(humanFileSize(MB_IN_BYTES * 10, 1)).toBe('10.0 MB');
    expect(humanFileSize(MB_IN_BYTES * 10, 2)).toBe('10.00 MB');
    expect(humanFileSize(MB_IN_BYTES * 10, 3)).toBe('10.000 MB');
    expect(humanFileSize(MB_IN_BYTES * 100, 1)).toBe('100.0 MB');
    expect(humanFileSize(MB_IN_BYTES * 100, 2)).toBe('100.00 MB');
    expect(humanFileSize(MB_IN_BYTES * 100, 3)).toBe('100.000 MB');
  });

  it('should correctly display decimal places for GB', () => {
    expect(humanFileSize(GB_IN_BYTES, 1)).toBe('1.0 GB');
    expect(humanFileSize(GB_IN_BYTES, 2)).toBe('1.00 GB');
    expect(humanFileSize(GB_IN_BYTES, 3)).toBe('1.000 GB');
    expect(humanFileSize(GB_IN_BYTES * 10, 1)).toBe('10.0 GB');
    expect(humanFileSize(GB_IN_BYTES * 10, 2)).toBe('10.00 GB');
    expect(humanFileSize(GB_IN_BYTES * 10, 3)).toBe('10.000 GB');
    expect(humanFileSize(GB_IN_BYTES * 100, 1)).toBe('100.0 GB');
    expect(humanFileSize(GB_IN_BYTES * 100, 2)).toBe('100.00 GB');
    expect(humanFileSize(GB_IN_BYTES * 100, 3)).toBe('100.000 GB');
  });

  it('should correctly display decimal places for TB', () => {
    expect(humanFileSize(TB_IN_BYTES, 1)).toBe('1.0 TB');
    expect(humanFileSize(TB_IN_BYTES, 2)).toBe('1.00 TB');
    expect(humanFileSize(TB_IN_BYTES, 3)).toBe('1.000 TB');
    expect(humanFileSize(TB_IN_BYTES * 10, 1)).toBe('10.0 TB');
    expect(humanFileSize(TB_IN_BYTES * 10, 2)).toBe('10.00 TB');
    expect(humanFileSize(TB_IN_BYTES * 10, 3)).toBe('10.000 TB');
    expect(humanFileSize(TB_IN_BYTES * 100, 1)).toBe('100.0 TB');
    expect(humanFileSize(TB_IN_BYTES * 100, 2)).toBe('100.00 TB');
    expect(humanFileSize(TB_IN_BYTES * 100, 3)).toBe('100.000 TB');
  });
});
