import { Github, Hand, Link, Linkedin, Mail } from "lucide-react";
import { data, useLoaderData } from "react-router";
import fallbackImage from "~/assets/placeholder.jpg";
import AvailableChip from "~/components/common/AvailableChip";
import PLink from "~/components/common/PLink";
import ThemeToggle from "~/components/common/ThemeToggle";
import ContactDialog from "~/components/contact/ContactDialog";
import ExpItem from "~/components/experience/ExpItem";
import WorkItem from "~/components/works/WorkItem";
import { loadProfileData } from "~/lib/profile";
import { formatTo12Hour } from "~/lib/utils";
import type { ProfileData } from "~/types/profile";

export async function loader(): Promise<ProfileData> {
  const data = await loadProfileData();
  return data;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "message") {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return data(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("New message:", { name, email, message });

    return data({ success: true });
  }

  if (intent !== "message") {
    return data({ success: false, error: "Invalid intent." }, { status: 400 });
  }
}

export function meta({ data }: { data: ProfileData }) {
  return [
    { title: data.meta[0].title[0] },
    { name: "description", content: data.meta[0].description[0] },
  ];
}

const ENABLE_MESSAGE = import.meta.env.ENABLE_MESSAGE ?? false;

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const intro = data.intro[0];
  const socials = data.socials[0].social.map((s: any) => ({
    text: s.text[0],
    href: s.href[0],
  }));
  const experiences = data.experience[0].job.map((j: any) => ({
    company: j.company[0],
    position: j.position[0],
    location: j.location[0],
    period: j.period[0],
    description: j.description[0],
    logo: j.logo[0],
  }));

  const works = data.works[0].work.map((w: any) => ({
    title: w.title[0],
    description: w.description[0],
    tech: w.tech,
    date: w.date?.[0],
    link: w.link[0],
    imageUrl: w.image?.[0],
    videoUrl: w.video?.[0],
    repository: w.repository[0],
  }));

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="w-full flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <AvailableChip />
            <p className="text-xs text-muted-foreground font-mono">
              {formatTo12Hour(new Date())}
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 group">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1 text-3xl font-bold tracking-wider">
              <span className="flex items-center">
                {intro.greeting[0]}&nbsp;
                <Hand className="stroke-1 size-8 rotate-45 group-hover:scale-105 group-hover:rotate-12 group-hover:animate-bounce transition" />
                ,
              </span>
              <span>
                this is&nbsp;
                {intro.name[0]}.
              </span>
            </div>
            <p className="text-muted-foreground font-light tracking-wide">
              {intro.tagline[0]}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={intro.imageUrl[0] || fallbackImage}
              alt={intro.name[0]}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-6">
          <span className="text-muted-foreground/80 font-light text-xs">
            Reach me on
          </span>
          {socials.map(({ text, href }: any) => {
            const Icon =
              text === "LinkedIn"
                ? Linkedin
                : text === "GitHub"
                ? Github
                : text === "Email"
                ? Mail
                : Link;
            return (
              <PLink key={href} text={text} href={href}>
                <Icon className="size-5 stroke-[1.25]" />
              </PLink>
            );
          })}
          {ENABLE_MESSAGE && (
            <>
              <span className="text-muted-foreground/80 font-light text-xs">
                or
              </span>
              <ContactDialog />
            </>
          )}
        </div>

        <div className="mt-12">
          <p className="text-2xl font-semibold tracking-wider">About.</p>
          <p className="font-light tracking-wide text-muted-foreground text-sm">
            {data.about[0].text[0]}
          </p>
        </div>

        <div className="mt-12">
          <p className="text-2xl font-semibold tracking-wider">
            Work Experience.
          </p>
          <div className="mt-2 space-y-1">
            {experiences.map((exp, index) => ExpItem(exp, index))}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-2xl font-semibold tracking-wider">Works.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {works.map((work, index) => WorkItem(work, index))}
          </div>
        </div>

        <div className="mt-40 h-10 md:h-22 overflow-hidden opacity-15">
          <h1 className="text-5xl md:text-8xl font-extrabold text-center whitespace-nowrap">
            <span className="text-muted-foreground text-base align-top">©</span>
            {intro.fullname[0]}
          </h1>
        </div>
      </div>
    </div>
  );
}
