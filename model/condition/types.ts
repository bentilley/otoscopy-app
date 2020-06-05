/** @format */

export type Category = {
  name: string;
  conditions: Condition[];
};

export type Condition = {
  id: string;
  name: string;
};

/**
 * ConditionData
 * The complete interface for condition data in the condition context store -
 * includes other app state data.
 */
export interface ConditionData extends ConditionDataDB {
  hasSlides: boolean;
}

/**
 * ConditionDataDB
 * The format of the data that comes from the Firebase database.
 */
interface ConditionDataDB {
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
}

export type ConditionSection = string[] | { [index: string]: SectionDetail };

type SectionDetail = {
  title: string;
  information: string[];
};

/**
 * Slide
 * The complete interface for slide data in the condition context store -
 * includes other app state data.
 */
export interface Slide extends SlideDataDB {
  conditionId: string;
}

/**
 * SlideDataDB
 * The format of the data that comes from the Firebase database.
 */
interface SlideDataDB {
  id: string;
  condition: string;
  diagnosis: string;
  diagram: string;
  img_url: string;
  legend: {
    [index: string]: string;
  };
  thumbnail_url: string;
}
