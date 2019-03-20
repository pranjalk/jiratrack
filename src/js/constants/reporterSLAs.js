const HOURS = 'hours';
const DAYS = 'days';

export const SYSTEM_RESTORE = 'SYSTEM_RESTORE';
export const PERM_FIX = 'PERMANENT_FIX';

export const CRITICAL_SLA = {
  [SYSTEM_RESTORE]: {
    value: 4,
    unit: HOURS
  },
  [PERM_FIX]: {
    value: 96,
    unit: HOURS
  }
};

export const MAJOR_SLA = {
  [SYSTEM_RESTORE]: {
    value: 48,
    unit: HOURS
  },
  [PERM_FIX]: {
    value: 10,
    unit: DAYS
  }
};

export const MINOR_SLA = {
  [SYSTEM_RESTORE]: {
    value: 10,
    unit: DAYS
  },
  [PERM_FIX]: {
    value: 30,
    unit: DAYS
  }
};
