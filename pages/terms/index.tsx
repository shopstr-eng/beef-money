import { useRouter } from "next/router";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Tos() {
  const router = useRouter();
  const tosContent = [
    {
      title: "1. Platform Nature",
      content:
        "Beef.Money is a permissionless rancher-direct marketplace built on the Nostr and Bitcoin protocols. We do not hold custody of funds, products, or communications, nor do we act as an intermediary between buyers and ranchers. The platform provides an interface for peer-to-peer commerce without central authority.",
    },
    {
      title: "2. Relay Selection",
      content:
        "Users have complete control over which Nostr relays they connect to and which listings they see. Beef.Money does not control the content available on third-party relays. Configure your relay connections according to your preferences and local regulations.",
    },
    {
      title: "3. User Responsibilities",
      content:
        "Users must safeguard their private keys and wallets, understand that on-chain and Lightning transactions are irreversible, verify rancher details before purchasing, and comply with local laws regarding commerce, food sales, transportation, and taxation. Ranchers are responsible for the accuracy of their listings and the legal compliance of their products.",
    },
    {
      title: "4. Prohibited Items",
      content:
        "Although Beef.Money has no technical ability to prevent listings, users agree not to list or sell illegal goods or services, harmful substances, counterfeit items, stolen property, or anything that violates applicable laws. The Nostr-based architecture means users can choose relays that align with their values.",
    },
    {
      title: "5. Transaction Risks",
      content:
        "Peer-to-peer transactions carry inherent risks including but not limited to: scams, misrepresented products, shipping or cold-chain complications, and payment processing issues. Beef.Money cannot intervene in disputes between buyers and ranchers and cannot guarantee any transaction.",
    },
    {
      title: "6. Listing Guidelines",
      content:
        "Listings should contain accurate descriptions, clear images, precise pricing, sourcing details (breed, finishing, processing facility where relevant), and transparent shipping or pickup information. Ranchers are encouraged to respond promptly to inquiries and maintain professional communication.",
    },
    {
      title: "7. Technical Requirements",
      content:
        "A compatible Bitcoin Lightning wallet and/or Cashu implementation is required for crypto payments. A Nostr key pair (or email/Google login that manages one for you) is needed for authentication and encrypted messaging. Reliable internet connectivity and adequate network fees are the user&apos;s responsibility.",
    },
    {
      title: "8. Disclaimers",
      content:
        "Beef.Money is not a custodial service, cannot guarantee product quality or rancher reliability, cannot reverse blockchain or Lightning transactions, and is not responsible for losses resulting from key mismanagement. Due to the decentralized nature of Nostr, Beef.Money cannot remove listings from third-party relays.",
    },
    {
      title: "9. Dispute Resolution",
      content:
        "Disputes must be resolved directly between the buyer and the rancher. We encourage clear, honest communication. The platform&apos;s NIP-85 review system creates accountability, but Beef.Money cannot enforce resolutions, issue refunds, or arbitrate disagreements.",
    },
    {
      title: "10. Modifications",
      content:
        "These terms may be updated periodically. Users are responsible for reviewing changes. Continued use of Beef.Money constitutes acceptance of the current terms.",
    },
    {
      title: "Contact",
      content: "Questions about these terms can be sent to contact@beef.money.",
    },
  ];

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Terms of Service - Beef.Money | User Agreement</title>
        <meta
          name="description"
          content="Read Beef.Money's Terms of Service. Understand user responsibilities, prohibited items, transaction risks, and platform guidelines for our rancher-direct marketplace."
        />
        <link rel="canonical" href="https://beef.money/terms" />
        <link rel="apple-touch-icon" href="/beef-initiative-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/beef-initiative-icon.png"
        />
        <meta property="og:url" content="https://beef.money/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms of Service - Beef.Money" />
        <meta
          property="og:description"
          content="Beef.Money Terms of Service. Permissionless, rancher-direct marketplace agreement."
        />
        <meta property="og:image" content="/beef-initiative-icon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content="terms of service, beef money, user agreement, rancher direct, nostr marketplace, bitcoin commerce"
        />
      </Head>
      <div className="flex min-h-screen flex-col bg-stone-950 py-8 text-stone-200 md:pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="mb-8 inline-flex items-center gap-2 rounded-md border-2 border-amber-700 bg-stone-900 px-4 py-2 font-bold text-amber-400 transition-all hover:bg-amber-950"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </button>
            <h1 className="text-center text-4xl font-black text-white md:text-6xl">
              Terms of <span className="text-amber-400">Service</span>
            </h1>
            <p className="mt-4 text-center text-lg text-stone-400">
              User agreement and usage guidelines for Beef.Money
            </p>
            <p className="mt-2 text-center text-sm text-stone-500">
              Last updated: April 2026
            </p>
          </div>

          <div className="space-y-6">
            {tosContent.map((section) => (
              <div
                key={section.title}
                className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6"
              >
                <h3 className="mb-2 text-lg font-bold text-amber-400">
                  {section.title}
                </h3>
                <p className="leading-relaxed text-stone-300">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
