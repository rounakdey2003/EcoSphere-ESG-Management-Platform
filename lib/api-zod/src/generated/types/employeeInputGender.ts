
export type EmployeeInputGender = typeof EmployeeInputGender[keyof typeof EmployeeInputGender];


export const EmployeeInputGender = {
  male: 'male',
  female: 'female',
  other: 'other',
  prefer_not_to_say: 'prefer_not_to_say',
} as const;
