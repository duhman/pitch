"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

type Props = {
  calLink: string;
};

export function CalEmbed({ calLink }: Props) {
  const [isCalReady, setIsCalReady] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          styles: { branding: { brandColor: "#000000" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        setIsCalReady(true);
      } catch (error) {
        console.error("Failed to initialize Cal.com embed:", error);
      }
    })();
  }, []);

  if (!isCalReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>Loading calendar...</div>
      </div>
    );
  }

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
