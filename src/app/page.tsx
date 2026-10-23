import { MobileWebsite } from "@/mobile-website/MobileWebsite";
import { getSiteMedia } from "@/shared/lib/media";
import { LayoutSwitch } from "@/shared/ui/LayoutSwitch";
import { SkipLink } from "@/shared/ui/SkipLink";
import { Website } from "@/website/Website";

export default function Home() {
  // Read at build time: drop photos into /public (see README) and redeploy.
  const media = getSiteMedia();
  return (
    <>
      <SkipLink />
      <LayoutSwitch website={<Website media={media} />} mobile={<MobileWebsite media={media} />} />
    </>
  );
}
