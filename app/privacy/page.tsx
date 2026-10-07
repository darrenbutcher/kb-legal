import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../_components/legal-page";
import { JsonLd } from "../_components/ui";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";
import { site } from "../_lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How KB Legal collects, uses, shares and protects personal data submitted through its website, how long it is kept, and how to exercise your rights.",
  path: "/privacy",
});

const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <ul>
        <li>
          <strong>Enquiries.</strong> When you use our contact form or email us:
          your name, company, email address, phone number and the information
          you share about your matter.
        </li>
        <li>
          <strong>Consultations.</strong> When you book a consultation: your
          name, email address, the time you choose and any notes you add.
          Bookings may be handled through a third-party scheduling service.
        </li>
        <li>
          <strong>Newsletter.</strong> When you subscribe to Corporate
          Briefings: your email address.
        </li>
        <li>
          <strong>Website use.</strong> We do not use analytics or advertising
          trackers. Our website host may automatically log basic technical data,
          such as your IP address, browser type and the pages requested, to keep
          the website secure and working.
        </li>
      </ul>
    ),
  },
  {
    id: "why-we-use-it",
    title: "Why we use it",
    body: (
      <>
        <ul>
          <li>To respond to your enquiry and arrange a consultation.</li>
          <li>
            To assess whether we can act for you, including conflict checks.
          </li>
          <li>To send you our newsletter, if you have asked for it.</li>
          <li>
            To meet our legal and professional obligations, including client
            identification requirements.
          </li>
          <li>To keep this website secure and working properly.</li>
        </ul>
        <p>
          We do not sell your personal data, and we do not use it for any
          purpose other than those listed here.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    body: (
      <p>
        We share personal data only with service providers that help us run this
        website and our practice, such as our website host, email provider,
        scheduling service, and Google, which provides the map on our contact
        page and stores newsletter sign-ups in Google Sheets. They may process
        data only on our instructions or under their own privacy policies where
        they act independently. Some providers may store data outside Sint
        Maarten; where they do, we take reasonable steps to make sure it is
        protected. We may also disclose data where the law requires us to.
      </p>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <p>
        We keep personal data only as long as needed for the purposes above.
        Enquiries that do not lead to an engagement are deleted within 12
        months. Client files are kept for the periods required by law and
        professional rules. You can unsubscribe from the newsletter at any time,
        and we will then remove your email address from the mailing list.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use appropriate technical and organizational measures to protect
        personal data against loss and unauthorized access. Because no
        transmission over the internet is completely secure, please do not send
        confidential information through this website before we have agreed to
        act for you.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        You may ask us to access, correct or delete your personal data, to stop
        using it, or to withdraw a consent you have given. To do so, email{" "}
        {email}. We will respond within a reasonable time and in line with
        applicable law.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          We do not use analytics, advertising or tracking cookies. When you
          first visit, we ask for your consent before loading anything that sets
          non-essential cookies, and nothing optional is switched on until you
          choose.
        </p>
        <ul>
          <li>
            <strong>Essential.</strong> A cookie named{" "}
            <code>kb-cookie-consent</code> remembers your cookie choice for 180
            days. It is needed for the site to respect that choice and is always
            on.
          </li>
          <li>
            <strong>Maps &amp; embedded content (optional).</strong> The map on
            our contact page is provided by Google and is only loaded if you
            allow it. Google may then set its own cookies under its own privacy
            policy.
          </li>
        </ul>
        <p>
          You can change or withdraw your consent at any time through{" "}
          <strong>Cookie settings</strong> at the bottom of every page. If we
          later use a scheduling tool or other embedded service that sets
          cookies, it will be added here and will also require your consent.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We may update this policy from time to time. The latest version will
        always be on this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about this policy can be sent to {email} or to KB Legal,{" "}
        {site.address.street}, {site.address.city}, {site.address.country}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-ivory">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Privacy Policy", path: "/privacy" }])}
      />
      <LegalPage
        title="Privacy Policy"
        intro={
          <p className="m-0">
            KB Legal respects your privacy. This policy explains what personal
            data we collect through this website, why we collect it and how we
            protect it. KB Legal, {site.address.street}, {site.address.city},{" "}
            {site.address.country}, is responsible for this data.
          </p>
        }
        sections={sections}
        related={{ href: "/disclaimer", label: "Read our disclaimer" }}
      />
    </main>
  );
}
