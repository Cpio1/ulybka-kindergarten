"use client";

import type { SiteMedia } from "@/shared/lib/media";
import { WhatsAppFab } from "@/shared/ui/WhatsAppFab";
import { About } from "./sections/About";
import { Activities } from "./sections/Activities";
import { Advantages } from "./sections/Advantages";
import { Contacts } from "./sections/Contacts";
import { Documents } from "./sections/Documents";
import { Footer } from "./sections/Footer";
import { Gallery } from "./sections/Gallery";
import { Groups } from "./sections/Groups";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";

/** Composition for laptops and monitors (≥ 1024px). */
export function Website({ media }: { media: SiteMedia }) {
  return (
    <>
      <Header />
      <main id="main">
        <Hero media={media.hero} video={media.heroVideo} />
        <About media={media.about} />
        <Advantages />
        <Groups />
        <Activities />
        <Gallery items={media.gallery} videos={media.videos} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
