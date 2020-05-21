/** @format */

type Sections =
  | 'otoscopy'
  | 'population'
  | 'risk_factors'
  | 'aetiology'
  | 'symptoms'
  | 'clinical_signs'
  | 'investigations'
  | 'audiology'
  | 'management'
  | 'complications';

export const sections: Sections[] = [
  'otoscopy',
  'population',
  'risk_factors',
  'aetiology',
  'symptoms',
  'clinical_signs',
  'investigations',
  'audiology',
  'management',
  'complications',
];

export const sectionMeta: {
  [index: string]: { title: string; icon: string };
} = {
  otoscopy: { title: 'Otoscopy', icon: 'otoscope' },
  population: { title: 'Population', icon: 'population' },
  risk_factors: { title: 'Risk Factors', icon: 'risks' },
  aetiology: { title: 'Aetiology', icon: 'causes' },
  symptoms: { title: 'Symptoms', icon: 'star-o' },
  clinical_signs: { title: 'Clinical Signs', icon: 'star-o' },
  investigations: { title: 'Investogations', icon: 'star-o' },
  audiology: { title: 'Audiology', icon: 'star-o' },
  management: { title: 'Management', icon: 'star-o' },
  complications: { title: 'Complications', icon: 'star-o' },
};
