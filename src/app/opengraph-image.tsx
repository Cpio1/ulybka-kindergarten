import { ImageResponse } from "next/og";
import { loadGoogleFont, logoDataUri } from "@/shared/lib/og";

export const alt = "Детский сад «Улыбка» — с. Кайназар";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const title = "Детский сад «Улыбка»";
  const subtitle = "Место счастливого детства";
  const facts = ["2–5 лет", "4 группы", "4-разовое питание", "07:30–18:00"];
  const place = "с. Кайназар, ул. Болашак, 12Б";

  const [display, body] = await Promise.all([
    loadGoogleFont("Nunito", 900, title + subtitle),
    loadGoogleFont("Golos+Text", 500, facts.join("") + place),
  ]);
  const fonts = [
    ...(display ? [{ name: "Nunito", data: display, weight: 900 as const }] : []),
    ...(body ? [{ name: "Golos", data: body, weight: 500 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFDF5", position: "relative", fontFamily: "Golos", color: "#29384C" }}>
        <div style={{ position: "absolute", right: -140, top: -160, width: 620, height: 620, borderRadius: "62% 38% 46% 54%", background: "#E4F4FB", display: "flex" }} />
        <div style={{ position: "absolute", right: 140, bottom: -220, width: 460, height: 460, borderRadius: 999, background: "#FFD65A", opacity: 0.45, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#286B90" }}>{place}</div>
          <div style={{ display: "flex", fontFamily: "Nunito", fontSize: 84, lineHeight: 1.05, marginTop: 22, maxWidth: 720 }}>{title}</div>
          <div style={{ display: "flex", fontFamily: "Nunito", fontSize: 44, lineHeight: 1.2, marginTop: 14 }}>{subtitle}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            {facts.map((f) => (
              <span key={f} style={{ display: "flex", background: "#FFFFFF", borderRadius: 999, padding: "12px 22px", fontSize: 24, border: "1px solid #EEE6CF" }}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 110, top: 140, display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri()} width={300} height={300} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
