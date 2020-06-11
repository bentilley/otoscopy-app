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
  symptoms: { title: 'Symptoms', icon: 'symptoms' },
  clinical_signs: { title: 'Clinical Signs', icon: 'stethoscope' },
  investigations: { title: 'Investogations', icon: 'search' },
  audiology: { title: 'Audiology', icon: 'ear' },
  management: { title: 'Management', icon: 'treatment' },
  complications: { title: 'Complications', icon: 'complications' },
};
