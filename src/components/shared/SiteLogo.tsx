
import type { SVGProps } from 'react';

interface SiteLogoProps extends SVGProps<SVGSVGElement> {
  // You can add specific props if needed, e.g., for different sizes or color schemes
}

/**
 * SiteLogo component.
 *
 * **To use your own SVG logo:**
 * 1. Replace the entire content of the <svg>...</svg> tag below with your SVG code.
 * 2. Ensure your SVG has a `viewBox` attribute for proper scaling.
 * 3. Adjust the default `width` and `height` via className props or by modifying the SVG attributes.
 *
 * **Dimension Guidance:**
 * - For Header: A height of approx. 28px (h-7) is used. Width will scale automatically based on your SVG's aspect ratio.
 *   Example usage: <SiteLogo className="h-7 w-auto" />
 * - For Footer: A height of approx. 24px (h-6) is used.
 *   Example usage: <SiteLogo className="h-6 w-auto" />
 *
 * **Accessibility:**
 * The `aria-labelledby` and `role="img"` attributes along with the `<title>` tag are included
 * for better accessibility. Ensure the title accurately describes your logo.
 *
 * **Styling:**
 * You can control the SVG's color via Tailwind text color classes (e.g., `text-primary`)
 * if your SVG is designed to inherit `currentColor`.
 * The placeholder SVG uses `hsl(var(--primary))` and `hsl(var(--primary-foreground))` directly.
 * Adapt your SVG's fill/stroke attributes as needed.
 */
export function SiteLogo({ className, ...props }: SiteLogoProps) {
  return (
    // IMPORTANT: Replace the <svg> element below with your actual SVG code.
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 30" // Adjust this viewBox to match your actual SVG's aspect ratio and content
      className={className} // Pass className for sizing (e.g., "h-7 w-auto")
      aria-labelledby="siteLogoTitle"
      role="img"
      {...props}
    >
      <title id="siteLogoTitle">Post My Property Logo</title>
      {/* Placeholder SVG Content - START */}
      {/* Replace this rect and text with your actual SVG paths, shapes, etc. */}
      <rect width="120" height="30" rx="5" ry="5" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="PT Sans, sans-serif" // Consider matching your site's font
        fontSize="10" // Adjust font size as needed
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
      >
        PMP LOGO
      </text>
      {/* Placeholder SVG Content - END */}
    </svg>
  );
}
