/** @format */

export type Category = {
  name: string;
  conditions: Condition[];
};

export type Condition = {
  id: string;
  name: string;
};

export type ConditionData = {
  name: string;
  description: string;
  aetiology: ConditionSection;
  audiology: ConditionSection;
  clinical_signs: ConditionSection;
  complications: ConditionSection;
  investigations: ConditionSection;
  management: ConditionSection;
  otoscopy: ConditionSection;
  population: ConditionSection;
  risk_factors: ConditionSection;
  symptoms: ConditionSection;
};

export type ConditionSection = string[] | { [index: string]: SectionDetail };

type SectionDetail = {
  title: string;
  information: string[];
};