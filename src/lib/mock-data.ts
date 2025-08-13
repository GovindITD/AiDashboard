import type { Patient } from './types';

export const mockPatients: Patient[] = [
  { id: 1, name: 'Aarav Sharma', mobile: '9876543210', age: 45, gender: 'Male', usedAI: true },
  { id: 2, name: 'Priya Patel', mobile: '9876543211', age: 32, gender: 'Female', usedAI: true },
  { id: 3, name: 'Rohan Mehta', mobile: '9876543212', age: 51, gender: 'Male', usedAI: false },
  { id: 4, name: 'Saanvi Singh', mobile: '9876543213', age: 28, gender: 'Female', usedAI: true },
  { id: 5, name: 'Arjun Gupta', mobile: '9876543214', age: 60, gender: 'Male', usedAI: false },
  { id: 6, name: 'Diya Reddy', mobile: '9876543215', age: 38, gender: 'Female', usedAI: true },
  { id: 7, name: 'Vihaan Kumar', mobile: '9876543216', age: 42, gender: 'Male', usedAI: false },
  { id: 8, name: 'Ananya Joshi', mobile: '9876543217', age: 25, gender: 'Female', usedAI: true },
  { id: 9, name: 'Ishaan Verma', mobile: '9876543218', age: 55, gender: 'Male', usedAI: true },
  { id: 10, name: 'Myra Agarwal', mobile: '9876543219', age: 49, gender: 'Female', usedAI: false },
];

export const mockPatientQuestions: string[] = [
    "What are the side effects of my medication?",
    "How can I manage my chronic condition better at home?",
    "What do my lab results mean?",
    "Is this surgery necessary, and are there alternatives?",
    "How long is the recovery period for this procedure?",
    "What lifestyle changes should I make to improve my health?",
    "Can you explain the billing and insurance process?",
    "How do I schedule a follow-up appointment?",
    "Are my symptoms normal for this condition?",
    "What are the warning signs I should look out for?",
    "How does my family history affect my health risks?",
    "What preventive care measures do you recommend?",
    "Is it safe to exercise with my condition?",
    "What diet should I follow?",
    "Can I get a second opinion?",
];

export const mockPatientQuestionsWithPatient: { question: string; patientId: number }[] = mockPatientQuestions.map((question, index) => ({
    question,
    patientId: (index % mockPatients.length) + 1,
}));

export const mockReminderLog = [
  { id: 1, date: new Date(2023, 10, 20, 10, 30), message: 'Your credit left 100, please recharge.' },
  { id: 2, date: new Date(2023, 10, 21, 12, 0), message: 'Your credit limit left 10, please recharge.' },
  { id: 3, date: new Date(2023, 10, 22, 15, 45), message: 'Your credit balance is low.' },
  { id: 4, date: new Date(2023, 10, 23, 18, 0), message: 'Your credit left 50, please recharge.' },
];
