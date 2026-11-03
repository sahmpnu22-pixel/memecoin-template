import { siteConfig } from "@/config/site.config";
import { Reveal } from "@/components/effects";
import { Accordion, SectionHeading } from "@/components/ui";

export function FAQ() {
  const { faq } = siteConfig;
  if (faq.length === 0) return null;

  return (
    <section id="faq" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" highlight="questions" />
        <Reveal>
          <Accordion items={faq} defaultOpen={0} />
        </Reveal>
      </div>
    </section>
  );
}
