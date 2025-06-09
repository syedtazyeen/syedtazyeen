export type Meta = {
  title: [string];
  description: [string];
};

export type Intro = {
  greeting: [string];
  name: [string];
  fullname: [string];
  tagline: [string];
  imageUrl: [string];
};

export type Social = {
  text: [string];
  href: [string];
};

export type Socials = {
  social: Social[];
};

export type About = {
  text: [string];
};

export type Job = {
  company: [string];
  position: [string];
  location: [string];
  period: [string];
  description: [string];
  logo: [string];
};

export type Experience = {
  job: Job[];
};

export type Work = {
  title: [string];
  description: [string];
  tech: [string];
  image: [string];
  video: [string];
  link: [string];
  repository: [string];
};

export type Works = {
  work: Work[];
};

export type ProfileData = {
  meta: Meta[];
  intro: Intro[];
  socials: Socials[];
  about: About[];
  experience: Experience[];
  works: Works[];
};
