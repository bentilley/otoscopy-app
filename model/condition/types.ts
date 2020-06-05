/** @format */

/**
 * Category
 * A group of related conditions.
 */
export type Category = {
  name: string;
  conditions: ConditionHead[];
};

/**
 * ConditionHead
 * Minimal condition information that is held in categories.
 */
export interface ConditionHead {
  id: string;
  name: string;
}

/**
 * ConditionData
 * The complete interface for condition data in the condition context store -
 * includes other app state data.
 */
export interface Condition extends ConditionHead, ConditionDataDB {}

/**
 * ConditionDataDB
 * The format of the data that comes from the Firebase database.
 */
export interface ConditionDataDB {
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

/**
 * ConditionSection
 * A single fact section in the ConditionView.
 */
export type ConditionSection = string[] | { [index: string]: SectionDetail };

/**
 * SectionDetail
 * A sub-section of a ConditionSection in the ConditionView.
 */
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
export interface SlideDataDB {
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
