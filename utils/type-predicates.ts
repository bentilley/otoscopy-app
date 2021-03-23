/** @format */

import { ConditionSection, InfoLink } from "model/condition/types";

export function isList(info: ConditionSection): info is (string | InfoLink)[] {
  return (info as any[]).length !== undefined;
}

export function isInfoLink(s: string | InfoLink): s is InfoLink {
  return (s as InfoLink).text !== undefined;
}
