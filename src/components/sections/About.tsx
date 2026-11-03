import { siteConfig } from "@/config/site.config";
import { Reveal } from "@/components/effects";
import { SectionHeading } from "@/components/ui";

export function About() {
  const { about, token } = siteConfig;

  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:order-1">
          <div
            aria-hidden="true"
            className="bg-gradient-brand absolute inset-6 rounded-full opacity-30 blur-3xl"
          />
          <div className="glass relative aspect-square p-8">
            <img
              src={about.image}
              alt={`${token.name} story`}
              width={480}
              height={480}
              loading="lazy"
              className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            />
          </div>
        </Reveal>

        <div className="flex flex-col lg:order-2">
          <SectionHeading
            eyebrow="About"
            title={about.title}
            align="left"
            className="!mb-6 !max-w-none"
          />
          <div className="text-muted flex flex-col gap-4 text-base leading-relaxed sm:text-lg">
            {about.paragraphs.map((text, i) => (
              <Reveal key={text} delay={0.08 * (i + 1)}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
