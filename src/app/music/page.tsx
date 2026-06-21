import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { MusicPanel } from "./MusicPanel";
import { fallbackMusic } from "@/data/music";

export default function MusicPage() {
  return (
    <PageShell>
      <SectionHeader
        path="~/music"
        title="music"
        description="what's on while i build. a snapshot of current rotation."
      />

      {/* renders fallback on the server, then polls /api/music for live data */}
      <MusicPanel initial={fallbackMusic} />
    </PageShell>
  );
}