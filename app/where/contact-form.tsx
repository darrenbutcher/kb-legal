"use client";

import type { FormEvent } from "react";
import { site } from "../_lib/site";

const field =
  "box-border w-full rounded-md border border-[#cfc8b8] bg-ivory px-3.5 font-sans text-base text-ink transition-colors duration-200 focus:border-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/60";
const label = "text-sm font-medium";

// No form backend yet: on submit this opens the visitor's email client with
// the message pre-filled, addressed to the firm.
// TODO: swap for a server action that sends via an email provider.
export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const company = get("company");
    const subject = `Enquiry from ${name}${company ? ` (${company})` : ""}`;
    const body = [
      get("matter"),
      "",
      "—",
      `Name: ${name}`,
      company && `Company: ${company}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-heading"
      className="flex flex-col gap-[22px] px-6 pt-8 pb-9 md:px-9 md:pt-9 md:pb-10"
    >
      <div>
        <h2
          id="contact-form-heading"
          className="m-0 mb-1.5 font-serif text-[30px] leading-[1.2] font-medium text-navy"
        >
          Send us a message
        </h2>
        <p className="m-0 text-[15px] text-muted">
          We will respond within one business day.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-name" className={label}>
            Name
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={`${field} h-[50px]`}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-company" className={label}>
            Company
          </label>
          <input
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={`${field} h-[50px]`}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-email" className={label}>
            Email
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`${field} h-[50px]`}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-phone" className={label}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${field} h-[50px]`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-matter" className={label}>
          Briefly, what is the matter about?
        </label>
        <textarea
          id="f-matter"
          name="matter"
          rows={5}
          required
          className={`${field} resize-y py-3 leading-normal`}
        />
      </div>

      <p className="m-0 rounded-md bg-sand px-4 py-3.5 text-sm leading-[1.55] text-body">
        Please do not include confidential information until we have confirmed
        that we can act for you. Sending a message does not create a
        lawyer-client relationship.
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          className="h-[54px] cursor-pointer rounded-md border-none bg-navy px-8 font-sans text-base font-medium text-white transition-colors duration-300 hover:bg-navy-deep"
        >
          Send message
        </button>
        <a
          href={`mailto:${site.email}`}
          className="border-b border-current pt-2.5 pb-0.5 text-[15px] no-underline"
        >
          Or email us directly
        </a>
      </div>
    </form>
  );
}
