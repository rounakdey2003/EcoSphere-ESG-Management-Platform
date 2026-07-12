
export type EnvironmentalGoalStatus = typeof EnvironmentalGoalStatus[keyof typeof EnvironmentalGoalStatus];


export const EnvironmentalGoalStatus = {
  active: 'active',
  achieved: 'achieved',
  missed: 'missed',
  cancelled: 'cancelled',
} as const;
