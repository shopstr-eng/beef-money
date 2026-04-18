import { useRouter } from "next/router";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function PrivacyPolicy() {
  const router = useRouter();
  const policyContent = [
    {
      title: "Introduction",
      content:
        "Beef.Money is committed to protecting your privacy. As a permissionless rancher-direct marketplace, we minimize data collection and processing to keep your activity yours. This policy explains our approach in the context of an open, decentralized platform.",
    },
    {
      title: "Information We Don't Collect",
      content:
        "Beef.Money does not collect or store: personal identification beyond what you choose to share, KYC data, financial information, behavioral analytics, or third-party tracking pixels. Your messages, listings, and orders live on Nostr and stay under your control.",
    },
    {
      title: "Nostr Protocol Data",
      content:
        "Listings, profiles, and public posts published through Nostr are distributed across your selected relays. Encrypted direct messages (NIP-17) are readable only by the intended recipients. Your Nostr public key is part of your identity. Users select which relays to connect to, which determines what content they publish and see.",
    },
    {
      title: "Bitcoin & Lightning Network Data",
      content:
        "Crypto transactions occur on the Bitcoin and Lightning Networks and follow their respective privacy models. This may include transaction amounts, Lightning invoices or addresses, and timestamps. Cashu eCash transactions provide additional unlinkability when used.",
    },
    {
      title: "Account Sign-In",
      content:
        "If you sign in with email or Google, we store your email address to send order notifications, manage account recovery, and enable encrypted messaging on your behalf. We do not sell or share your email. You can request deletion at any time by emailing contact@beef.money.",
    },
    {
      title: "Cookies & Local Storage",
      content:
        "Beef.Money uses local browser storage to keep your preferences, relay selections, encrypted keys (if you opt in), cart contents, and interface settings. We do not use third-party analytics cookies. Local data can be cleared from your browser settings at any time.",
    },
    {
      title: "Third-Party Services",
      content:
        "You may interact with Bitcoin/Lightning nodes, Nostr relays you select, Stripe (for card payments — see stripe.com/privacy), and SendGrid (for transactional email). Each third-party service has its own privacy practices. We recommend reviewing the policies of the relays and processors you use.",
    },
    {
      title: "Security",
      content:
        "Security is maintained through open-source code, cryptographic protocols, Bitcoin network security, PBKDF2 key derivation for encrypted keys, rate limiting on auth endpoints, and client-side cryptography. Users are responsible for safeguarding their private keys and wallet seeds.",
    },
    {
      title: "Your Rights & Control",
      content:
        "You retain full control over your private keys and funds, your listings, your relay selections, your communication preferences, and your local data. You can delete your account-linked email and stop using the platform at any time. Note: data already published to Nostr relays may persist on those relays per their own retention policies.",
    },
    {
      title: "Changes to This Policy",
      content:
        "Updates will be posted on this page. As a permissionless platform, fundamental changes to data handling are unlikely — the platform operates on open protocols with minimal central coordination.",
    },
    {
      title: "Contact",
      content: "Privacy questions can be sent to contact@beef.money.",
    },
  ];

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Privacy Policy - Beef.Money | Data Protection</title>
        <meta
          name="description"
          content="Learn how Beef.Money protects your privacy as a permissionless rancher-direct marketplace. Minimal data collection, Nostr-based encryption, user-controlled keys."
        />
        <link rel="canonical" href="https://beef.money/privacy" />
        <link rel="apple-touch-icon" href="/beef-initiative-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/beef-initiative-icon.png"
        />
        <meta property="og:url" content="https://beef.money/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy - Beef.Money" />
        <meta
          property="og:description"
          content="Beef.Money's privacy approach: minimal data, Nostr encryption, user-controlled keys."
        />
        <meta property="og:image" content="/beef-initiative-icon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content="privacy policy, beef money, data protection, nostr privacy, rancher direct, decentralized marketplace"
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
              Privacy <span className="text-amber-400">Policy</span>
            </h1>
            <p className="mt-4 text-center text-lg text-stone-400">
              How Beef.Money protects your privacy
            </p>
            <p className="mt-2 text-center text-sm text-stone-500">
              Last updated: April 2026
            </p>
          </div>

          <div className="space-y-6">
            {policyContent.map((section) => (
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
