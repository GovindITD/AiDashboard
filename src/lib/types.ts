export type Patient = {
  id: number;
  name: string;
  mobile: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  usedAI: boolean;
};
