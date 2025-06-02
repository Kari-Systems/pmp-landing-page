
import type { HTMLAttributes } from 'react';
import { Home } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface SiteLogoProps extends HTMLAttributes<HTMLElement> {
  // className will be passed for overall component sizing (e.g., "h-7", "h-6 w-auto")
}

// !!! IMPORTANT FOR THE USER !!!
// 1. To use your custom SVG logo:
//    - Go to the 'return <svg ...>' block below.
//    - Replace the placeholder content (the example <g> with <rect> and <text>)
//      WITHIN the <svg>...</svg> tags with your actual SVG code (e.g., <path d="..."/>).
//    - Ensure your SVG has an appropriate `viewBox` attribute for proper scaling.
//    - After adding your SVG code, set the `useCustomSvg` flag below to `true`.
//
// 2. If `useCustomSvg` is `false` (default), a fallback logo (Home icon + Site Name) will be displayed.
//
// Dimension Guidance (applied via className prop when using <SiteLogo />):
// - For Header: Use className="h-7" (or "h-7 w-auto" if aspect ratio is fixed by SVG's viewBox)
// - For Footer: Use className="h-6" (or "h-6 w-auto")

const useCustomSvg = false; // USER: Set this to true after adding your SVG code below and testing it

export function SiteLogo({ className, ...props }: SiteLogoProps) {
  if (useCustomSvg) {
    // User wants to use their custom SVG
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 30" // USER: IMPORTANT! Adjust this viewBox to match your actual SVG's aspect ratio and content. E.g., "0 0 200 50"
        aria-labelledby="siteLogoTitle"
        role="img"
        className={cn("w-auto", className)} // Ensures width scales based on viewBox, height is from passed className
        {...props} // Spreads other HTML attributes if any
      >
        <title id="siteLogoTitle">{siteConfig.name} Logo</title>
        {/*
          USER: Replace THIS ENTIRE <g> element (or just its content) with your actual SVG code.
          The placeholder <rect> and <text> are just examples.
          Your SVG code (e.g., <path>, <circle>, etc.) should go here.
          Make sure your SVG content is scalable. For colors, you can:
          a) Use `fill="currentColor"` or `stroke="currentColor"` in your SVG paths/shapes
             if you want to control its color via Tailwind text color classes on the parent.
          b) Define colors directly in your SVG (e.g., fill="#FF0000").
        */}
        <g>
          {/* --- Placeholder SVG Content - START --- */}
          {/* --- Replace or remove this <g> element and its content with your SVG --- */}
          <rect width="120" height="30" rx="5" ry="5" fill="hsl(var(--primary))" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="inherit" // Inherits font from parent, or set your own
            fontSize="10"      // Adjust font size as needed, or use SVG units for responsiveness
            fontWeight="bold"
            fill="hsl(var(--primary-foreground))"
          >
            PMP LOGO
          </text>
          {/* --- Placeholder SVG Content - END --- */}
        </g>
      </svg>
    );
  } else {
    // Fallback: Home icon and site name
    // The className prop (e.g., "h-7") will be applied to this div.
    return (
      <div className={cn("flex items-center gap-2", className)} {...props}>
        {/* The Home icon will attempt to fill the height of its container.
            Adjust icon size directly if needed, e.g., className="h-5 w-5" or "h-[20px] w-[20px]" */}
        <Home className="text-primary flex-shrink-0 h-full w-auto" />
        <span className="font-semibold text-lg text-foreground whitespace-nowrap">
          {siteConfig.name}
        </span>
      </div>
    );
  }
}
