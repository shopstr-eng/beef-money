import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { safeJsonLdString } from "@/utils/safe-json-ld";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Contact Beef.Money - Get in Touch</title>
        <meta
          name="description"
          content="Contact the Beef.Money team. Questions about buying real beef from local ranchers, selling on the marketplace, or partnering with us — we're here to help."
        />
        <link rel="canonical" href="https://beef.money/contact" />
        <meta property="og:title" content="Contact Beef.Money - Get in Touch" />
        <meta
          property="og:description"
          content="Contact the Beef.Money team for questions about our rancher-direct beef marketplace."
        />
        <meta property="og:url" content="https://beef.money/contact" />
        <meta
          property="og:image"
          content="https://beef.money/beef-initiative-icon.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdString({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Beef.Money",
              url: "https://beef.money/contact",
              mainEntity: {
                "@type": "Organization",
                name: "Beef.Money",
                email: "contact@beef.money",
                url: "https://beef.money",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "contact@beef.money",
                  contactType: "customer service",
                  availableLanguage: "English",
                },
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-stone-950 font-sans text-stone-200">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 rounded-md border-2 border-amber-700 bg-stone-900 px-4 py-2 font-bold text-amber-400 transition-all hover:bg-amber-950"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>

          <h1 className="mb-4 text-4xl font-black text-white md:text-6xl">
            Get in <span className="text-amber-400">Touch</span>
          </h1>
          <p className="mb-12 text-lg text-stone-400">
            Questions about Beef.Money? Whether you&apos;re a rancher, a buyer,
            or just want to chat about food freedom — we&apos;re listening.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-black text-amber-400">
                Reach Us Directly
              </h2>
              <div className="space-y-6">
                <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">Email</h3>
                  <a
                    href="mailto:contact@beef.money"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    contact@beef.money
                  </a>
                  <p className="mt-2 text-sm text-stone-400">
                    General inquiries, partnerships, and support
                  </p>
                </div>

                <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    Rancher Support
                  </h3>
                  <a
                    href="mailto:ranchers@beef.money"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    ranchers@beef.money
                  </a>
                  <p className="mt-2 text-sm text-stone-400">
                    Onboarding, listings, payouts, and the producer guide
                  </p>
                </div>

                <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">Press</h3>
                  <a
                    href="mailto:press@beef.money"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    press@beef.money
                  </a>
                  <p className="mt-2 text-sm text-stone-400">
                    Media inquiries and interview requests
                  </p>
                </div>

                <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    The Beef Initiative
                  </h3>
                  <a
                    href="https://beefinitiative.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    beefinitiative.com
                  </a>
                  <p className="mt-2 text-sm text-stone-400">
                    The grassroots rancher movement that inspired this platform
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-black text-amber-400">
                Send a Message
              </h2>
              <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setStatus("sending");
                    setErrorMessage("");
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, subject, message }),
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setStatus("sent");
                        setName("");
                        setEmail("");
                        setSubject("");
                        setMessage("");
                      } else {
                        setStatus("error");
                        setErrorMessage(data.error || "Something went wrong.");
                      }
                    } catch {
                      setStatus("error");
                      setErrorMessage("Network error. Please try again.");
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-bold text-stone-300"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-lg border-2 border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-bold text-stone-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border-2 border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1 block text-sm font-bold text-stone-300"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-lg border-2 border-stone-700 bg-stone-950 p-3 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="Buying Inquiry">Buying Inquiry</option>
                      <option value="Rancher / Producer Question">
                        Rancher / Producer Question
                      </option>
                      <option value="Partnership">Partnership</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Press / Media">Press / Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-bold text-stone-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      rows={5}
                      className="w-full rounded-lg border-2 border-stone-700 bg-stone-950 p-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  {status === "sent" && (
                    <div className="rounded-lg border-2 border-amber-500 bg-amber-950 p-3 text-center text-sm font-bold text-amber-300">
                      Message sent! We&apos;ll get back to you soon.
                    </div>
                  )}

                  {status === "error" && (
                    <div className="rounded-lg border-2 border-red-600 bg-red-950 p-3 text-center text-sm font-bold text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-lg border-2 border-amber-500 bg-amber-500 px-6 py-3 font-bold text-stone-950 transition-all hover:bg-amber-400 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <section className="mt-12 rounded-lg border-2 border-amber-900 bg-stone-900 p-8">
            <h2 className="mb-6 text-2xl font-black text-amber-400">
              Quick Links
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-white">
                  Are you a rancher looking to sell?
                </h3>
                <p className="mt-1 text-sm text-stone-400">
                  Read our{" "}
                  <Link
                    href="/producer-guide"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    Producer Guide
                  </Link>{" "}
                  to start listing your beef.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white">
                  Want to find local beef?
                </h3>
                <p className="mt-1 text-sm text-stone-400">
                  Head to the{" "}
                  <Link
                    href="/marketplace"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    Marketplace
                  </Link>{" "}
                  to discover ranchers near you.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white">Need account help?</h3>
                <p className="mt-1 text-sm text-stone-400">
                  Visit our{" "}
                  <Link
                    href="/faq"
                    className="font-bold text-amber-400 underline hover:text-amber-300"
                  >
                    FAQ page
                  </Link>{" "}
                  for answers to common questions.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white">Custom storefronts?</h3>
                <p className="mt-1 text-sm text-stone-400">
                  Ranchers can request a custom domain for their shop. Email
                  ranchers@beef.money for details.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
