import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function CopyrightPage() {
  return (
    <LegalPage title="Copyright">
      <p>Digimon Alysion, Digimon, related names, logos, card artwork, and media belong to Bandai Namco Entertainment, Toei Animation, and their respective rights holders.</p>
      <p>Digimon Alysion Wiki is a non-official fan-made guide site created for informational and community purposes.</p>
      <p>If you own rights to content displayed here and have a concern, contact the site operator at <a className="font-semibold text-[hsl(var(--nav-theme))] hover:underline" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> for review.</p>
    </LegalPage>
  );
}
