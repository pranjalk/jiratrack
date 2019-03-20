// Base Priorities
export const MINOR = 'Minor';
export const MAJOR = 'Major';
export const CRITICAL = 'Critical';
export const NORMAL = 'Normal';
export const TRIVIAL = 'Trivial';

// Set Priorities
export const MINOR_PRIORITIES_SET = [MINOR, NORMAL, TRIVIAL];
export const MAJOR_PRIORITIES_SET = [MAJOR];
export const CRITICAL_PRIORITIES_SET = [CRITICAL];
export const ALL_PRIORITIES_SET = [
  ...MINOR_PRIORITIES_SET,
  ...MAJOR_PRIORITIES_SET,
  ...CRITICAL_PRIORITIES_SET
];
