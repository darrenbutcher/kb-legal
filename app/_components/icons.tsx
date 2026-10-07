import type { LucideProps } from "lucide-react";

export {
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  CalendarCheck2 as CalendarIcon,
  Clock3 as ClockIcon,
  Mail as MailIcon,
  MapPin as PinIcon,
  Phone as PhoneIcon,
} from "lucide-react";

// lucide no longer ships brand marks, so the LinkedIn glyph is drawn here in
// the same 24px outline style as the rest of the set.
export function LinkedInIcon({
  size = 24,
  strokeWidth = 2,
  ...props
}: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" />
      <path d="M7.5 10.5v6" />
      <path d="M7.5 7.5v.01" />
      <path d="M11.5 16.5v-6" />
      <path d="M11.5 13.25a2.75 2.75 0 0 1 5.5 0v3.25" />
    </svg>
  );
}
