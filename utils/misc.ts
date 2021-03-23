/** @format */
import { InfoLink } from "model/condition/types";
import { isInfoLink } from "./type-predicates";

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function clip(str: string, clipLength: number): string {
  if (str.length > clipLength) {
    return str.slice(0, clipLength) + "...";
  } else {
    return str;
  }
}

export function toStr(s: string | InfoLink): string {
  if (isInfoLink(s)) {
    return s.text as string;
  } else {
    return s;
  }
}
