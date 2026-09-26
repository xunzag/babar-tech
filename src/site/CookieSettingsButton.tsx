"use client";

import { openCookieSettings } from "./consent";

export default function CookieSettingsButton() {
  return (
    <button onClick={openCookieSettings} className="btn !min-h-11 text-[14px]">
      Open cookie settings
    </button>
  );
}
