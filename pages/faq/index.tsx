import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { safeJsonLdString } from "@/utils/safe-json-ld";

export default function Faq() {
  const router = useRouter();
  const faqSections = [
    {
      title: "General",
      items: [
        {
          title: "What is Beef.Money?",
          content:
            "Beef.Money is a rancher-direct beef marketplace inspired by the Beef Initiative. It connects American ranchers selling grass-fed, pasture-raised beef directly with the families who eat it — no feedlots, no commodity grading, no grocery-store middlemen. The platform is permissionless, built on the Nostr protocol, and supports payments in Bitcoin, Cashu, fiat, and cards.",
        },
        {
          title: "How is this different from buying beef at the grocery store?",
          content:
            "Grocery store beef is typically processed by one of four corporate giants that control roughly 85% of U.S. beef. The animal is often raised hundreds of miles from where it was finished, and the rancher who raised it sees less than 40 cents of every food dollar. On Beef.Money, you buy directly from the rancher, you know the farm, and 100% of the sale goes to the producer.",
        },
        {
          title: "What is the Beef Initiative?",
          content:
            "The Beef Initiative is a grassroots movement connecting American ranchers and consumers across all 50 states to rebuild a decentralized, transparent food system. Beef.Money is inspired by their work and shares the same conviction: shorter supply chains produce healthier food and stronger communities. Learn more at beefinitiative.com.",
        },
        {
          title: "What is Nostr?",
          content:
            "Nostr is an open protocol for decentralized communication. It lets you own your identity, your messages, and your data — no platform can deplatform you. Beef.Money is built on Nostr so ranchers can&apos;t be silenced and buyers can communicate privately with end-to-end encrypted messages.",
        },
      ],
    },
    {
      title: "Buying Beef",
      items: [
        {
          title: "How do I find a rancher near me?",
          content:
            "Visit the Marketplace and browse listings. You can filter by location, cut, and product type. Each listing shows the rancher&apos;s profile, photos of their operation, and pickup or shipping options.",
        },
        {
          title: "Can I buy a whole or half cow?",
          content:
            "Yes. Many ranchers offer quarters, halves, and whole cows in addition to individual cuts. Bulk options usually come with a per-pound discount and are typically scheduled ahead of harvest. Look for &ldquo;bulk&rdquo; or &ldquo;quarter / half / whole&rdquo; listings.",
        },
        {
          title: "What about organ meats and bones?",
          content:
            "Organ meats, bones for broth, tallow, suet, and other traditional cuts are commonly available. These are the most nutrient-dense parts of the animal and are usually overlooked by industrial supply chains.",
        },
        {
          title: "How do I contact a rancher?",
          content:
            "From any listing, click the rancher&apos;s profile to send an encrypted message. You don&apos;t need a Nostr account — if you signed up with email, the messaging works seamlessly. Email notifications are also delivered, so neither side misses an order.",
        },
      ],
    },
    {
      title: "Payments",
      items: [
        {
          title: "What payment methods are accepted?",
          content:
            "Beef.Money supports Bitcoin via Lightning Network, Cashu eCash tokens, Nostr Wallet Connect (NWC), and traditional fiat through Stripe (credit/debit cards). Many ranchers also accept Cash App, Venmo, PayPal, and direct cash on pickup. Each rancher chooses which methods they accept.",
        },
        {
          title: "Why Bitcoin?",
          content:
            "Bitcoin payments are final, censorship-resistant, and settle directly to the rancher with no payment processor taking a cut. Lightning makes the payments instant. For ranchers, Bitcoin means no chargebacks and no payment-processor risk. For buyers, it means real privacy and no middlemen.",
        },
        {
          title: "How do I claim a Cashu payment?",
          content:
            "You can claim a received Cashu token instantly to the Lightning address on your profile by clicking claim → redeem on the orders page. You can also receive directly into the integrated Cashu wallet, or paste the token into an external wallet (Minibits, Coinos, cashu.me, etc.). Setting your profile&apos;s payment preference to Lightning automates the claim flow.",
        },
        {
          title: "What is Nostr Wallet Connect?",
          content:
            "NWC (NIP-47) lets you connect your personal Lightning wallet (Alby, Umbrel, etc.) to Beef.Money. At checkout, Beef.Money asks your wallet to pay — no copy/paste. You configure permissions in Settings → Wallet Connection. Beef.Money never holds your keys or your funds.",
        },
      ],
    },
    {
      title: "Selling (Ranchers)",
      items: [
        {
          title: "How do I start selling on Beef.Money?",
          content:
            "Sign in with email, Google, or your Nostr keys. Set up your rancher profile with photos of your operation. Add listings for the cuts and bulk options you offer. Start receiving orders. The full walkthrough is in our Producer Guide.",
        },
        {
          title: "What can I sell?",
          content:
            "Beef.Money is built for beef and beef-adjacent products: individual cuts, ground beef, quarters/halves/whole cows, organ meats, bones, tallow, suet, jerky, and similar rancher-made goods. Each listing should accurately describe the product, sourcing, and pickup or shipping logistics.",
        },
        {
          title: "How does shipping work?",
          content:
            "You choose: free shipping, flat-rate shipping, local pickup, or pickup-only. Cold-chain shipping for frozen beef has its own logistics — most ranchers use insulated boxes with dry ice. Fulfillment is handled by you, the rancher.",
        },
        {
          title: "Do you take a cut of my sales?",
          content:
            "No mandatory fees. You can opt in to a donation rate to support the platform, but by default 100% of every sale goes to you. We&apos;d rather build something ranchers want to use than tax their income.",
        },
      ],
    },
    {
      title: "Account & Privacy",
      items: [
        {
          title: "How do I create an account or sign in?",
          content:
            "Sign in with email, Google, or your existing Nostr keys. If you have a Nostr browser extension (Alby, nos2x) or bunker app (Amber, nsec.app), use those for the most secure setup. You can also paste an nsec with a passphrase, but that&apos;s less recommended.",
        },
        {
          title: "How is my data kept private?",
          content:
            "Buyer/rancher messages are end-to-end encrypted using NIP-17. Only you and the other party can read them. Email notifications are sent so you don&apos;t miss orders, but the message contents stay encrypted on Nostr. We don&apos;t sell or share your data.",
        },
        {
          title: "Why can&apos;t I view my messages?",
          content:
            "Usually a NIP-44 permission issue in your Nostr extension or bunker app. Open your signer settings and grant NIP-44 encrypt/decrypt permissions. You can also read messages in any Nostr client that supports NIP-17 DMs (0xchat, Amethyst, etc.).",
        },
      ],
    },
    {
      title: "Communities & Reviews",
      items: [
        {
          title: "What are Communities?",
          content:
            "Public forums hosted by ranchers to talk directly with their customers — share announcements, harvest schedules, herd news, and answer questions. Anyone can reply; replies are moderated by the rancher to keep the feed constructive.",
        },
        {
          title: "Can I leave a review?",
          content:
            "Yes — Beef.Money uses NIP-85 for reviews. After an order, find the &ldquo;Leave a review&rdquo; button at the bottom of the order chat. Ranchers can carry their reviews to other Nostr marketplaces that support the same standard.",
        },
        {
          title: "How do refunds and returns work?",
          content:
            "Reach out directly to the rancher through the order chat. Returns and refunds are arranged peer-to-peer. Many ranchers will replace or refund quality issues without question.",
        },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);
  let globalItemIndex = 0;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>FAQ - Beef.Money | Frequently Asked Questions</title>
        <meta
          name="description"
          content="Answers about buying real beef from local ranchers on Beef.Money. Learn about payments, selling, accounts, privacy, and the rancher-direct movement."
        />
        <link rel="canonical" href="https://beef.money/faq" />
        <link rel="apple-touch-icon" href="/beef-initiative-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/beef-initiative-icon.png"
        />
        <meta property="og:url" content="https://beef.money/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FAQ - Beef.Money" />
        <meta
          property="og:description"
          content="Answers about buying real beef from local ranchers on Beef.Money."
        />
        <meta property="og:image" content="/beef-initiative-icon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content="beef money, FAQ, rancher direct, grass fed beef, pasture raised, nostr marketplace, bitcoin beef, beef initiative"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdString({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              name: "Beef.Money FAQ",
              url: "https://beef.money/faq",
              mainEntity: faqSections.flatMap((section) =>
                section.items.map((item) => ({
                  "@type": "Question",
                  name: item.title,
                  acceptedAnswer: { "@type": "Answer", text: item.content },
                }))
              ),
            }),
          }}
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
              Frequently Asked <span className="text-amber-400">Questions</span>
            </h1>
            <p className="mt-4 text-center text-lg text-stone-400">
              Everything you wanted to know about real beef, real ranchers, and
              real food freedom.
            </p>
          </div>

          {faqSections.map((section) => (
            <div key={section.title} className="mb-12">
              <h2 className="mb-6 text-2xl font-black text-amber-400">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => {
                  const currentIndex = globalItemIndex++;
                  const isOpen = openIndex === currentIndex;
                  return (
                    <div
                      key={item.title}
                      className="rounded-lg border-2 border-amber-900 bg-stone-900"
                    >
                      <button
                        onClick={() => handleToggle(currentIndex)}
                        className="flex w-full items-center justify-between p-4 text-left font-bold text-white"
                      >
                        <span>{item.title}</span>
                        <span className="text-2xl text-amber-400">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-screen" : "max-h-0"
                        }`}
                      >
                        <div className="border-t-2 border-amber-900 p-4 leading-relaxed text-stone-300">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
