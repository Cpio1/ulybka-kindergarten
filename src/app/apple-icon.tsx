import { ImageResponse } from "next/og";
import { logoDataUri } from "@/shared/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFDF5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri()} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
