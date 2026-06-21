import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactChannels } from "@/components/ContactChannels";
import { LocalTimeFooter } from "@/components/LocalTimeFooter";

export default function ContactPage() {
  return (
    <PageShell>
      <SectionHeader
        path="get in touch"
        title="contact"
        description="open for collabs, questions, or just a hello — discord's fastest, but pick whatever works."
      />

      <ContactChannels />
      <LocalTimeFooter />
    </PageShell>
  );
}
