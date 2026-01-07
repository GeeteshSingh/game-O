"use client";

import { ReactComponentLike } from "prop-types";
import { SVGProps } from "react";

export const Icons = {
  strava: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.089 4.116h3.065L8.387 0l-5.15 10.172h3.065" />
    </svg>
  ),
} as Record<string, ReactComponentLike>;