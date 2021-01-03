/** @format */

export const condition = {
  id: 'REtPLgJs8ACPVBV0e734',
  aetiology: {
    bacterial: {
      information: [
        'Strep Pneumoniae',
        'Haemophilus Influenzae',
        'Moraxella Catarrhalis',
      ],
      title: 'Bacterial',
    },
    viral: {
      information: ['Rhinovirus', 'RSV', 'Adenovirus'],
      title: 'Viral (75% cases)',
    },
  },
  audiology: ['Conductive hearing loss', 'Type B tympanogram'],
  management: {
    conservative: {
      information: [
        '60% resolve within 24 hours',
        'Anagesia, antipyretics, observations',
      ],
      title: 'Conservative',
    },
    surgical: {
      information: [
        'Myringotomy',
        'Insertion of ventilation tube (grommet) for recurrent cases',
      ],
      title: 'Surgical',
    },
    medical: {
      information: [
        'Oral antibiotics if failure to resolve in 24-48 hours, systematically unwell, < 2 years old, or at high risk of complications',
        'Tropical antibiotics indicated if TM perforated',
      ],
      title: 'Medical',
    },
  },
  investigations: [
    'Swab for MC+S if discharge.',
    'CT/MRI if intracranial complications suspected',
  ],
  complications: {
    intracranial: {
      information: [
        'Acute Mastoiditis',
        'Meningitis',
        'Sigmoid Sinus',
        'Thrombosis',
        'Intracranial abscess',
      ],
      title: 'Intracranial',
    },
    intratemporal: {
      information: [
        'Tympanic membrane perforation',
        'Tympanosclerosis',
        'Hearing loss',
        'Facial nerve palsy',
        'Labyrinthitis',
      ],
      title: 'Intratemporal',
    },
  },
  symptoms: [
    'Otalgia',
    'Ear tugging',
    'Irritability',
    'Nausea and vomiting',
    'Hearing loss',
    'Pain may suddenly resolve on tympanic perforation',
  ],
  population: ['Commonly paediatric 3-7 years'],
  clinical_signs: ['Pyrexia', 'Hearing loss', 'Imbalance'],
  risk_factors: [
    'Age > 7',
    'Passive smoking',
    'Nursery attendance',
    'Non-breastfeeding',
    'Craniofacial abnormalities (cleft palate)',
    'Immunodeficiency',
  ],
  otoscopy: [
    'Bulging, yellow/white tympanic membrane',
    'Dilated vessels',
    'Decreased TM mobility',
    'Discharging perforation maybe present',
  ],
  name: 'Otitis Media',
  description: 'Acute onset inflammation of middle ear space',
};
