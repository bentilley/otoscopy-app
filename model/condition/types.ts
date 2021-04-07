/** @format */

/**
 * UserData
 * Data stored in the user document. Separate from Firebase auth.
 */
export interface UserData {
  email: string;
  position: string;
}

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
  additional_resources?: ConditionSection;
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
export type ConditionSection =
  | (string | InfoLink)[]
  | { [index: string]: SectionDetail };

/**
 * SectionDetail
 * A sub-section of a ConditionSection in the ConditionView.
 */
type SectionDetail = {
  title: string;
  information: (string | InfoLink)[];
};

/**
 * InfoLink
 * A single fact that should be rendered as a link to a URL.
 */
export type InfoLink = {
  text: string;
  url: string;
};

/**
 * Slide
 * The complete interface for slide data in the condition context store -
 * includes other app state data.
 */
export interface Slide extends FavouriteDataDB {
  id: string;
}

/**
 * FavouriteDataDB
 * The format of the favourite slide data that comes from the Firebase database.
 */
export interface FavouriteDataDB extends SlideDataDB {
  conditionId: string;
}
/**
 * SlideDataDB
 * The format of the data that comes from the Firebase database.
 */
export interface SlideDataDB {
  condition: string;
  diagnosis: string;
  hasOverlay?: boolean;
  diagram?: string;
  img_url?: string;
  legend?: {
    [index: string]: string;
  };
  thumbnail_url?: string;
}
