
export type EnvironmentalGoalInputStatus = typeof EnvironmentalGoalInputStatus[keyof typeof EnvironmentalGoalInputStatus];


export const EnvironmentalGoalInputStatus = {
  active: 'active',
  achieved: 'achieved',
  missed: 'missed',
  cancelled: 'cancelled',
} as const;
