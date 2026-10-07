import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../_components/legal-page";
import { JsonLd } from "../_components/ui";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";
import { site } from "../_lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Terms for using the KB Legal website: general information only, no lawyer-client relationship, confidentiality, bar admissions, liability and governing law of Sint Maarten.",
  path: "/disclaimer",
});

const sections: LegalSection[] = [
  {
    id: "no-legal-advice",
    title: "No legal advice",
    body: (
      <p>
        The content of this website is for general information only. It is not
        legal advice and should not be relied on as such. Every matter depends
        on its own facts; please seek specific advice before acting.
      </p>
    ),
  },
  {
    id: "no-lawyer-client-relationship",
    title: "No lawyer-client relationship",
    body: (
      <p>
        Using this website, sending us a message, booking a consultation or
        subscribing to our newsletter does not create a lawyer-client
        relationship. A relationship exists only once we have confirmed in
        writing that we will act for you, after completing our conflict and
        client-identification checks.
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        Until we have agreed to act for you, please do not send us confidential
        or sensitive information through this website or by email. Information
        sent before that point may not be treated as confidential or privileged.
      </p>
    ),
  },
  {
    id: "experience",
    title: "Experience",
    body: (
      <p>
        Matters described on this website include matters handled by Kamla
        Besançon before she founded KB Legal, at her previous firms. Past
        results do not guarantee a similar outcome in any other matter.
      </p>
    ),
  },
  {
    id: "admissions",
    title: "Admissions",
    body: (
      <p>
        Kamla Besançon is admitted to the bars of the Dutch Caribbean, Amsterdam
        and New York. Nothing on this website is an offer to provide legal
        services in a jurisdiction where we are not permitted to do so.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: (
      <p>
        This website may link to websites operated by others, such as LinkedIn
        and Google Maps. We are not responsible for their content or practices.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        We take care to keep this website accurate and current, but we do not
        guarantee that it is complete, correct or up to date. To the extent
        permitted by law, KB Legal is not liable for any loss arising from the
        use of, or reliance on, this website.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The content, design and logo on this website belong to KB Legal unless
        stated otherwise, and may not be reproduced without our permission.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <>
        <p>
          This disclaimer is governed by the laws of Sint Maarten. Any dispute
          will be submitted to the competent court in Sint Maarten.
        </p>
        <p>
          We may update this disclaimer from time to time. Questions can be sent
          to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <main className="bg-ivory">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Disclaimer", path: "/disclaimer" }])}
      />
      <LegalPage
        title="Disclaimer"
        intro={
          <p className="m-0">
            This website is operated by KB Legal, {site.address.street},{" "}
            {site.address.city}, {site.address.country}
            {site.chamberOfCommerce
              ? ` (Chamber of Commerce no. ${site.chamberOfCommerce})`
              : ""}
            . By using this website, you accept the terms below.
          </p>
        }
        sections={sections}
        related={{ href: "/privacy", label: "Read our privacy policy" }}
      />
    </main>
  );
}
