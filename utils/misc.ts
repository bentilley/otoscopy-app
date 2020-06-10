/** @format */

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function clip(str: string, clipLength: number): string {
  if (str.length > clipLength) {
    return str.slice(0, clipLength) + '...';
  } else {
    return str;
  }
}
