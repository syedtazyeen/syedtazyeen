import type {
  Job,
  About,
  Intro,
  ProfileData,
  Social,
  Socials,
  Works,
  Experience,
  Work,
  Meta,
} from "~/types/profile";

function isStringArray(value: any): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isMeta(obj: any): obj is Meta {
  return (
    typeof obj === "object" &&
    obj !== null &&
    isStringArray(obj.title) &&
    isStringArray(obj.description)
  );
}

function isIntro(obj: any): obj is Intro {
  return (
    obj &&
    isStringArray(obj.greeting) &&
    isStringArray(obj.name) &&
    isStringArray(obj.fullname) &&
    isStringArray(obj.tagline) &&
    isStringArray(obj.imageUrl)
  );
}

function isSocial(obj: any): obj is Social {
  return obj && isStringArray(obj.text) && isStringArray(obj.href);
}

function isSocials(obj: any): obj is Socials {
  return obj && Array.isArray(obj.social) && obj.social.every(isSocial);
}

function isAbout(obj: any): obj is About {
  return obj && isStringArray(obj.text);
}

function isJob(obj: any): obj is Job {
  return (
    obj &&
    isStringArray(obj.company) &&
    isStringArray(obj.position) &&
    isStringArray(obj.location) &&
    isStringArray(obj.period) &&
    isStringArray(obj.description) &&
    isStringArray(obj.logo)
  );
}

function isExperience(obj: any): obj is Experience {
  return obj && Array.isArray(obj.job) && obj.job.every(isJob);
}

function isWork(obj: any): obj is Work {
  return (
    obj &&
    isStringArray(obj.title) &&
    isStringArray(obj.description) &&
    isStringArray(obj.tech) &&
    isStringArray(obj.link) &&
    isStringArray(obj.repository)
  );
}

function isWorks(obj: any): obj is Works {
  return obj && Array.isArray(obj.work) && obj.work.every(isWork);
}

export function isProfileData(obj: any): obj is ProfileData {
  return (
    obj &&
    Array.isArray(obj.meta) &&
    obj.meta.every(isMeta) &&
    Array.isArray(obj.intro) &&
    obj.intro.every(isIntro) &&
    Array.isArray(obj.socials) &&
    obj.socials.every(isSocials) &&
    Array.isArray(obj.about) &&
    obj.about.every(isAbout) &&
    Array.isArray(obj.experience) &&
    obj.experience.every(isExperience) &&
    Array.isArray(obj.works) &&
    obj.works.every(isWorks)
  );
}
