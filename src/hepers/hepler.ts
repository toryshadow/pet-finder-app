import { differenceInDays, differenceInYears, parse } from "date-fns";

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const calculateAge = (dob?: string) => {
  if (!dob) return "";
  const date = parse(dob, "MM/dd/yyyy", new Date());

  return differenceInYears(new Date(), date).toString();
};

export const camelToTitle = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export const calculateDifferenceInDays = (
  dob?: string | Date | undefined,
): number => {
  if (!dob) return 99;

  return differenceInDays(new Date(), new Date(dob));
};

export const formatPlaceholder = (str?: string) =>
  `${str || ""}`
    .replace(/([A-Z])/g, " $1")
    .replace("*", "")
    .toLowerCase();

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km

  return d / 1.6; // Distance in mile
}

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const camelCaseToWords = (word?: string): string => {
  if (!word) return "";
  const result = word.replace(/([A-Z])/g, " $1");

  return result.charAt(0).toUpperCase() + result.slice(1);
};
