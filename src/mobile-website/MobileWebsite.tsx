"use client";

import type { SiteMedia } from "@/shared/lib/media";
import { WhatsAppFab } from "@/shared/ui/WhatsAppFab";
import { MobileAbout } from "./sections/MobileAbout";
import { MobileActivities } from "./sections/MobileActivities";
import { MobileAdvantages } from "./sections/MobileAdvantages";
import { MobileContacts } from "./sections/MobileContacts";
import { MobileDocuments } from "./sections/MobileDocuments";
import { MobileFooter } from "./sections/MobileFooter";
import { MobileGallery } from "./sections/MobileGallery";
import { MobileGroups } from "./sections/MobileGroups";
import { MobileHeader } from "./sections/MobileHeader";
import { MobileHero } from "./sections/MobileHero";

/** Composition for phones (< 1024px): its own layout of every section, not a shrunken desktop. */
export function MobileWebsite({ media }: { media: SiteMedia }) {
  return (
    <>
      <MobileHeader />
      <main id="main">
        <MobileHero media={media.hero} />
        <MobileAbout media={media.about} />
        <MobileAdvantages />
        <MobileGroups />
        <MobileActivities />
        <MobileGallery items={media.gallery} videos={media.videos} />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <MobileFooter />
      <WhatsAppFab compact />
    </>
  );
}
