interface DiagnoseDataInterface {
  value: string;
  label: string;
  category: string;
}

const Nutrition: DiagnoseDataInterface[] = [
  {
    value: 'Severe acute undernutrition',
    label: 'Severe acute undernutrition',
    category: 'Nutrition',
  },
  {
    value: 'Moderate acute undernutrition',
    label: 'Moderate acute undernutrition',
    category: 'Nutrition',
  },
  {
    value: 'Stunting',
    label: 'Stunting',
    category: 'Nutrition',
  },
  {
    value: 'Oveweight/Obesity',
    label: 'Oveweight/Obesity',
    category: 'Nutrition',
  },
  {
    value: 'Rickets',
    label: 'Rickets',
    category: 'Nutrition',
  },
];
const FluidAndElectrolytesDisorders: DiagnoseDataInterface[] = [
  {
    value: 'Metabolic acidosis',
    label: 'Metabolic acidosis',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Metabolic alkalosis',
    label: 'Metabolic alkalosis',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Respiratory acidosis',
    label: 'Respiratory acidosis',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Respiratory alkalosis',
    label: 'Respiratory alkalosis',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Hypernatremia',
    label: 'Hypernatremia',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Hyponatremia',
    label: 'Hyponatremia',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Hypokalemia',
    label: 'Hypokalemia',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Hyperkalemia',
    label: 'Hyperkalemia',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Hypomagnesima',
    label: 'Hypomagnesima',
    category: 'Fluids and Electrolytes disorders',
  },
  {
    value: 'Hypocalcemia',
    label: 'Hypocalcemia',
    category: 'Fluids and Electrolytes disorders',
  },
];
const GeneticSyndromes: DiagnoseDataInterface[] = [
  {
    value: 'Down syndrome',
    label: 'Down syndrome',
    category: ' Genetic Syndromes',
  },
  {
    value: 'Turner syndrome',
    label: 'Turner syndrome',
    category: ' Genetic Syndromes',
  },
  {
    value: 'Pierre robin sequence',
    label: 'Pierre robin sequence',
    category: ' Genetic Syndromes',
  },
  {
    value: 'Other syndromes',
    label: 'Other syndromes',
    category: ' Genetic Syndromes',
  },
];
const InbornErrorsOfMetabolism: DiagnoseDataInterface[] = [
  {
    value: 'Homocystinuria',
    label: 'Homocystinuria',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Other Amino acid disorders',
    label: 'Other Amino acid disorders',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Oragnic acidemias',
    label: 'Oragnic acidemias',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Urea cycle defect',
    label: 'Urea cycle defect',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Fatty acid oxidation disorders',
    label: 'Fatty acid oxidation disorders',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Lipid transportation disorders',
    label: 'Lipid transportation disorders',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Peroxisomal disorders',
    label: 'Peroxisomal disorders',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Adrenoleukodystrophy',
    label: 'Adrenoleukodystrophy',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Mucopolysaccharidoses',
    label: 'Mucopolysaccharidoses',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Gaucher',
    label: 'Gaucher',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Nieman Pick',
    label: 'Nieman Pick',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Farber',
    label: 'Farber',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Fabry',
    label: 'Fabry',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Zellweger ',
    label: 'Zellweger ',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Glycogen storage disorder',
    label: 'Glycogen storage disorder',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Pophyrias',
    label: 'Pophyrias',
    category: 'Inborn Errors of Metabolism',
  },
  {
    value: 'Hypoglycemia',
    label: 'Hypoglycemia',
    category: 'Inborn Errors of Metabolism',
  },
];
const Neonatology: DiagnoseDataInterface[] = [
  {
    value: 'Neonatal Jaundice',
    label: 'Neonatal Jaundice',
    category: 'Neonatology',
  },
  {
    value: 'Weight loss in newborn',
    label: 'Weight loss in newborn',
    category: 'Neonatology',
  },
  {
    value: 'Respiratory distress',
    label: 'Respiratory distress',
    category: 'Neonatology',
  },
  {
    value: 'Diaphragmatic hernia',
    label: 'Diaphragmatic hernia',
    category: 'Neonatology',
  },
  {
    value: 'Pyloric stenosis',
    label: 'Pyloric stenosis',
    category: 'Neonatology',
  },
  {
    value: 'Prematurity',
    label: 'Prematurity',
    category: 'Neonatology',
  },
  {
    value: 'Birth asphyxia',
    label: 'Birth asphyxia',
    category: 'Neonatology',
  },
  {
    value: 'Fever in neonates',
    label: 'Fever in neonates',
    category: 'Neonatology',
  },
];
const Immunology: DiagnoseDataInterface[] = [
  {
    value: 'Acquired Immunodeficiency',
    label: 'Acquired Immunodeficiency',
    category: 'Immunology',
  },
  {
    value: 'Inherited Immunodeficiency',
    label: 'Inherited Immunodeficiency',
    category: 'Immunology',
  },
];
const AllergicDisorders: DiagnoseDataInterface[] = [
  {
    value: 'Acute Urticaria',
    label: 'Acute Urticaria',
    category: 'Allergic Disorders',
  },
  {
    value: 'Anaphylaxis',
    label: 'Anaphylaxis',
    category: 'Allergic Disorders',
  },
];
const Rheumatology: DiagnoseDataInterface[] = [
  {
    value: 'Juvenile Idiopathic arthritis',
    label: 'Juvenile Idiopathic arthritis',
    category: 'Rheumatology',
  },
  {
    value: 'Reactive and post infectious arthirtis',
    label: 'Reactive and post infectious arthirtis',
    category: 'Rheumatology',
  },
  {
    value: 'SLE',
    label: 'SLE',
    category: 'Rheumatology',
  },
  {
    value: 'Kawasaki disease',
    label: 'Kawasaki disease',
    category: 'Rheumatology',
  },
  {
    value: 'Henosh Schonlein Purpura',
    label: 'Henosh Schonlein Purpura',
    category: 'Rheumatology',
  },
  {
    value: 'Dermatomyositis',
    label: 'Dermatomyositis',
    category: 'Rheumatology',
  },
];
const Infections: DiagnoseDataInterface[] = [
  {
    value: 'Dengue/ Dengue Haemorrhagic fever',
    label: 'Dengue/ Dengue Haemorrhagic fever',
    category: 'Infections',
  },
  {
    value: 'Viral fever',
    label: 'Viral fever',
    category: 'Infections',
  },
  {
    value: 'Gram-Positive Bacterial Infections',
    label: 'Gram-Positive Bacterial Infections',
    category: 'Infections',
  },
  {
    value: 'Gram-Negative Bacterial Infections',
    label: 'Gram-Negative Bacterial Infections',
    category: 'Infections',
  },
  {
    value: 'Mycoplasmal Infections',
    label: 'Mycoplasmal Infections',
    category: 'Infections',
  },
  {
    value: 'Rickettsial Infections',
    label: 'Rickettsial Infections',
    category: 'Infections',
  },
  {
    value: 'Tuberculosis',
    label: 'Tuberculosis',
    category: 'Infections',
  },
  {
    value: 'COVID-19',
    label: 'COVID-19',
    category: 'Infections',
  },
  {
    value: 'Chicken pox',
    label: 'Chicken pox',
    category: 'Infections',
  },
  {
    value: 'Hand foot and mouth disease',
    label: 'Hand foot and mouth disease',
    category: 'Infections',
  },
  {
    value: 'Measles',
    label: 'Measles',
    category: 'Infections',
  },
];
const GIT: DiagnoseDataInterface[] = [
  {
    value: 'Cleft lip and Palate',
    label: 'Cleft lip and Palate',
    category: 'GIT',
  },
  {
    value: 'Gastroesophageal Reflux Disease',
    label: 'Gastroesophageal Reflux Disease',
    category: 'GIT',
  },
  {
    value: 'Hiatal Hernia',
    label: 'Hiatal Hernia',
    category: 'GIT',
  },
  {
    value: 'Tracheo-oeso-phageal fistula',
    label: 'Tracheo-oeso-phageal fistula',
    category: 'GIT',
  },
  {
    value: 'Gastroesophageal Reflux Disease',
    label: 'Gastroesophageal Reflux Disease',
    category: 'GIT',
  },
  {
    value: 'Intestinal Atresia, Stenosis',
    label: 'Intestinal Atresia, Stenosis',
    category: 'GIT',
  },
  {
    value: 'Malrotation',
    label: 'Malrotation',
    category: 'GIT',
  },
  {
    value: 'Meckel Diverticulum',
    label: 'Meckel Diverticulum',
    category: 'GIT',
  },
  {
    value: 'Hirschsprung Disease',
    label: 'Hirschsprung Disease',
    category: 'GIT',
  },

  {
    value: 'Intussusception',
    label: 'Intussusception',
    category: 'GIT',
  },
  {
    value: 'Inflammatory Bowel Disease',
    label: 'Inflammatory Bowel Disease',
    category: 'GIT',
  },
  {
    value: 'Acute Gastroenteritis in Children',
    label: 'Acute Gastroenteritis in Children',
    category: 'GIT',
  },
  {
    value: 'Chronic Diarrhea',
    label: 'Chronic Diarrhea',
    category: 'GIT',
  },
  {
    value: 'constipation ',
    label: 'constipation ',
    category: 'GIT',
  },
  {
    value: 'cyclic vomiting syndrome',
    label: 'cyclic vomiting syndrome',
    category: 'GIT',
  },
  {
    value: 'Acute appendicitis',
    label: 'Acute appendicitis',
    category: 'GIT',
  },
  {
    value: 'Pancreatitis',
    label: 'Pancreatitis',
    category: 'GIT',
  },
  {
    value: 'Viral Hepatitis',
    label: 'Viral Hepatitis',
    category: 'GIT',
  },
  {
    value: 'Autoimmune Hepatitis',
    label: 'Autoimmune Hepatitis',
    category: 'GIT',
  },
  {
    value: 'Portal Hypertension and Varices',
    label: 'Portal Hypertension and Varices',
    category: 'GIT',
  },
  {
    value: 'Biliary atresia',
    label: 'Biliary atresia',
    category: 'GIT',
  },
];
const RespiratorySystem: DiagnoseDataInterface[] = [
  {
    value: 'Common cold',
    label: 'Common cold',
    category: 'Respiratory System',
  },
  {
    value: 'Upper respiratory tract infection',
    label: 'Upper respiratory tract infection',
    category: 'Respiratory System',
  },
  {
    value: 'Lower respiratory tract infection/ pneumonia',
    label: 'Lower respiratory tract infection/ pneumonia',
    category: 'Respiratory System',
  },
  {
    value: 'sinusitis',
    label: 'sinusitis',
    category: 'Respiratory System',
  },
  {
    value: 'croup',
    label: 'croup',
    category: 'Respiratory System',
  },
  {
    value: 'congenital laryngomalacia',
    label: 'congenital laryngomalacia',
    category: 'Respiratory System',
  },
  {
    value: 'bronchiolitis',
    label: 'bronchiolitis',
    category: 'Respiratory System',
  },
  {
    value: 'Aspiration pneumonia',
    label: 'Aspiration pneumonia',
    category: 'Respiratory System',
  },
  {
    value: 'Bronchiectasis',
    label: 'Bronchiectasis',
    category: 'Respiratory System',
  },
  {
    value: 'Asthma',
    label: 'Asthma',
    category: 'Respiratory System',
  },
  {
    value: 'pleural effusion',
    label: 'pleural effusion',
    category: 'Respiratory System',
  },
  {
    value: 'Chylothorax',
    label: 'Chylothorax',
    category: 'Respiratory System',
  },
];
const Cardiovascular: DiagnoseDataInterface[] = [
  {
    value: 'Acynotic heart disease',
    label: 'Acynotic heart disease',
    category: 'Cardiovascular',
  },
  {
    value: 'Cyanotic heart disease',
    label: 'Cyanotic heart disease',
    category: 'Cardiovascular',
  },
  {
    value: 'Rheumatic carditis',
    label: 'Rheumatic carditis',
    category: 'Cardiovascular',
  },
  {
    value: 'Infective Endocarditis',
    label: 'Infective Endocarditis',
    category: 'Cardiovascular',
  },
  {
    value: 'Supra ventricular tachycardia-SVT',
    label: 'Supra ventricular tachycardia-SVT',
    category: 'Cardiovascular',
  },
  {
    value: 'heart block',
    label: 'heart block',
    category: 'Cardiovascular',
  },
  {
    value: 'hypercynotic spell',
    label: 'hypercynotic spell',
    category: 'Cardiovascular',
  },
];
const Haematology: DiagnoseDataInterface[] = [
  {
    value: 'Iron-Deficiency Anemia',
    label: 'Iron-Deficiency Anemia',
    category: 'Haematology',
  },
  {
    value: 'Physiologic Anemia of Infancy',
    label: 'Physiologic Anemia of Infancy',
    category: 'Haematology',
  },
  {
    value: 'Physiologic Anemia of Infancy',
    label: 'Physiologic Anemia of Infancy',
    category: 'Haematology',
  },
  {
    value: 'Anemia of Chronic Disease ',
    label: 'Anemia of Chronic Disease ',
    category: 'Haematology',
  },
  {
    value: '(Diamond-Blackfan',
    label: '(Diamond-Blackfan',
    category: 'Haematology',
  },
  {
    value: 'Hereditary Spherocytosis',
    label: 'Hereditary Spherocytosis',
    category: 'Haematology',
  },
  {
    value: 'Thalassemia ',
    label: 'Thalassemia ',
    category: 'Haematology',
  },
  {
    value: 'Sickel cell anaemia',
    label: 'Sickel cell anaemia',
    category: 'Haematology',
  },
  {
    value: 'Autoimmune haemolytic anaemia',
    label: 'Autoimmune haemolytic anaemia',
    category: 'Haematology',
  },
  {
    value: 'polycythemia',
    label: 'polycythemia',
    category: 'Haematology',
  },
  {
    value: 'Pancytopenias',
    label: 'Pancytopenias',
    category: 'Haematology',
  },
  {
    value: 'Eosinophilia',
    label: 'Eosinophilia',
    category: 'Haematology',
  },
  {
    value: 'Immune thromobocytopenic purpura (ITP)',
    label: 'Immune thromobocytopenic purpura (ITP)',
    category: 'Haematology',
  },
];
const Malignancy: DiagnoseDataInterface[] = [
  {
    value: 'Haematological malignancy',
    label: 'Haematological malignancy',
    category: 'Malignancy',
  },
  {
    value: 'Lymphoma',
    label: 'Lymphoma',
    category: 'Malignancy',
  },
  {
    value: 'Brain tumours',
    label: 'Brain tumours',
    category: 'Malignancy',
  },
];
const Renal: DiagnoseDataInterface[] = [
  {
    value: 'Acute Glomerulonephritis',
    label: 'Acute Glomerulonephritis',
    category: 'Renal',
  },
  {
    value: 'Nephrotic syndrome',
    label: 'Nephrotic syndrome',
    category: 'Renal',
  },
  {
    value: 'Renal tubular acidosis',
    label: 'Renal tubular acidosis',
    category: 'Renal',
  },
  {
    value: 'Nephrogenic DI',
    label: 'Nephrogenic DI',
    category: 'Renal',
  },
  {
    value: 'UTI',
    label: 'UTI',
    category: 'Renal',
  },
  {
    value: 'Vesico ureteric reflux',
    label: 'Vesico ureteric reflux',
    category: 'Renal',
  },
  {
    value: 'Posterior urethral valve',
    label: 'Posterior urethral valve',
    category: 'Renal',
  },
  {
    value: 'hydronephrosis',
    label: 'hydronephrosis',
    category: 'Renal',
  },
  {
    value: 'neuropathic bladder',
    label: 'neuropathic bladder',
    category: 'Renal',
  },
  {
    value: 'nocturnal eneuresis',
    label: 'nocturnal eneuresis',
    category: 'Renal',
  },
];
const Endocrine: DiagnoseDataInterface[] = [
  {
    value: 'Hypothyroidsm',
    label: 'Hypothyroidsm',
    category: 'Endocrine',
  },
  {
    value: 'short stature',
    label: 'short stature',
    category: 'Endocrine',
  },
  {
    value: 'Diabetes mellitus',
    label: 'Diabetes mellitus',
    category: 'Endocrine',
  },
  {
    value: 'Hypoparathyroidsm',
    label: 'Hypoparathyroidsm',
    category: 'Endocrine',
  },
  {
    value: 'precaucious puberty',
    label: 'precaucious puberty',
    category: 'Endocrine',
  },
];
const Neurology: DiagnoseDataInterface[] = [
  {
    value: 'Epilepsy',
    label: 'Epilepsy',
    category: 'Neurology',
  },
  {
    value: 'Neurocutaneous disorders',
    label: 'Neurocutaneous disorders',
    category: 'Neurology',
  },
  {
    value: 'ADEM',
    label: 'ADEM',
    category: 'Neurology',
  },
  {
    value: 'Meningitis/ Encephalitis',
    label: 'Meningitis/ Encephalitis',
    category: 'Neurology',
  },
  {
    value: 'Neural tube defects',
    label: 'Neural tube defects',
    category: 'Neurology',
  },
  {
    value: 'Neuro regression',
    label: 'Neuro regression',
    category: 'Neurology',
  },
  {
    value: 'Spinal muscular atrophy',
    label: 'Spinal muscular atrophy',
    category: 'Neurology',
  },
  {
    value: 'Acute flaccid paralysis',
    label: 'Acute flaccid paralysis',
    category: 'Neurology',
  },
  {
    value: 'Muscular dystrophies ',
    label: 'Muscular dystrophies ',
    category: 'Neurology',
  },
  {
    value: 'Headache/ Migraine',
    label: 'Headache/ Migraine',
    category: 'Neurology',
  },
  {
    value: "Bell's palsy",
    label: "Bell's palsy",
    category: 'Neurology',
  },
];
const Immunisation: DiagnoseDataInterface[] = [
  {
    value: 'fever following vaccine',
    label: 'fever following vaccine',
    category: 'Immunisation',
  },
  {
    value: 'admitted for vaccination',
    label: 'admitted for vaccination',
    category: 'Immunisation',
  },
];

const Diagnosis = [
  {
    label: 'Nutrition',
    options: Nutrition,
  },
  {
    label: 'Fluids and Electrolytes disorders',
    options: FluidAndElectrolytesDisorders,
  },
  {
    label: 'Genetic syndromes',
    options: GeneticSyndromes,
  },
  {
    label: 'Inborn errors of metabolism',
    options: InbornErrorsOfMetabolism,
  },
  {
    label: 'Neonatology',
    options: Neonatology,
  },
  {
    label: 'Immunology',
    options: Immunology,
  },
  {
    label: 'Allergic disorders',
    options: AllergicDisorders,
  },
  {
    label: 'Rheumatology',
    options: Rheumatology,
  },
  {
    label: 'Infections',
    options: Infections,
  },
  {
    label: 'GIT',
    options: GIT,
  },
  {
    label: 'Respiratory system',
    options: RespiratorySystem,
  },
  {
    label: 'Cardiovascular ',
    options: Cardiovascular,
  },
  {
    label: 'Haematology',
    options: Haematology,
  },
  {
    label: 'Malignancy',
    options: Malignancy,
  },
  {
    label: 'Renal',
    options: Renal,
  },
  {
    label: 'Endocrine',
    options: Endocrine,
  },
  {
    label: 'Neurology',
    options: Neurology,
  },
  {
    label: 'Immunisation',
    options: Immunisation,
  },
];

export default Diagnosis;
