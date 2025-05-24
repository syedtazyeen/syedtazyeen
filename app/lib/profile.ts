import { isProfileData } from "./validations";

export async function loadProfileData() {
  const url = import.meta.env.VITE_DATA_URL;

  if (!url) {
    throw new Error("VITE_DATA_URL is not defined");
  }

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const jsonData = await response.json();

  if (!jsonData.profile) {
    throw new Error("Missing profile root element");
  }

  if (!isProfileData(jsonData.profile)) {
    throw new Error("Invalid profile data structure");
  }

  return jsonData.profile;
}
