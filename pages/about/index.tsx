import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { safeJsonLdString } from "@/utils/safe-json-ld";

export default function AboutPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>About Beef.Money - Know Your Rancher</title>
        <meta
          name="description"
          content="Beef.Money is a rancher-direct beef marketplace inspired by the Beef Initiative. Connect with local ranchers, cut out the middlemen, and reclaim your food supply with grass-fed, pasture-raised beef."
        />
        <link rel="canonical" href="https://beef.money/about" />
        <meta
          property="og:title"
          content="About Beef.Money - Know Your Rancher"
        />
        <meta
          property="og:description"
          content="Rancher-direct beef marketplace. Connect with local ranchers, cut out the middlemen, reclaim your food supply."
        />
        <meta property="og:url" content="https://beef.money/about" />
        <meta
          property="og:image"
          content="https://beef.money/beef-initiative-icon.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Beef.Money - Know Your Rancher"
        />
        <meta
          name="twitter:description"
          content="Rancher-direct beef marketplace. Local beef. Real food. No middlemen."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdString({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About Beef.Money",
              url: "https://beef.money/about",
              description:
                "Beef.Money is a rancher-direct beef marketplace inspired by the Beef Initiative. Connect with local ranchers, cut out middlemen, and reclaim your food supply.",
              mainEntity: {
                "@type": "Organization",
                name: "Beef.Money",
                url: "https://beef.money",
                logo: "https://beef.money/beef-initiative-icon.png",
                foundingDate: "2024",
                description:
                  "Permissionless rancher-direct beef marketplace. Zero mandatory platform fees, direct payments via Bitcoin and traditional methods.",
                areaServed: { "@type": "Country", name: "United States" },
                sameAs: ["https://beefinitiative.com"],
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

          <div className="mb-12 rounded-full border border-amber-700 bg-stone-900 px-4 py-1.5 text-center text-xs font-bold tracking-widest text-amber-400 uppercase sm:inline-block">
            Food Freedom • Rancher Direct • No Middlemen
          </div>

          <h1 className="mb-6 text-4xl font-black text-white md:text-6xl">
            About <span className="text-amber-400">Beef.Money</span>
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-stone-300">
            We&apos;re building the rancher-direct beef marketplace — connecting
            you with local cattlemen and women who raise real, grass-fed,
            pasture-raised beef the way it&apos;s supposed to be raised. No
            feedlots. No commodity grading. No grocery-store middlemen.
          </p>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-black text-amber-400">
              Our Mission
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-stone-300">
              Beef.Money exists to restore the direct connection between
              American ranchers and the families they feed. Inspired by the work
              of the{" "}
              <a
                href="https://beefinitiative.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-400 underline hover:text-amber-300"
              >
                Beef Initiative
              </a>
              , we believe everyone deserves access to nutrient-dense beef
              raised with integrity — without four meatpackers controlling 85%
              of the market or telling you what you&apos;re allowed to eat.
            </p>
            <p className="text-lg leading-relaxed text-stone-300">
              Four corporations control the vast majority of U.S. beef
              processing. The rancher who raised your steak typically sees less
              than 40 cents of every food dollar. We think that&apos;s broken.
              Direct rancher-to-eater commerce fixes it.
            </p>
          </section>

          <section className="mb-12 rounded-lg border-2 border-amber-900 bg-stone-900 p-8">
            <h2 className="mb-4 text-3xl font-black text-amber-400">
              Why We Built This
            </h2>
            <p className="mb-4 leading-relaxed text-stone-300">
              The modern beef supply chain is consolidated, opaque, and
              extractive. Cattle raised in the Midwest get shipped across the
              country, finished on grain in feedlots, processed by one of four
              corporate giants, and sold under labels that tell you nothing
              about where your food actually came from.
            </p>
            <blockquote className="my-6 border-l-4 border-amber-500 bg-stone-950 p-6 text-stone-300 italic">
              &ldquo;The shorter the chain between raw food and fork, the
              fresher it is and the more transparent the system is.&rdquo;
              <br />
              <span className="mt-2 block text-sm font-bold text-amber-400 not-italic">
                — Joel Salatin
              </span>
            </blockquote>
            <p className="leading-relaxed text-stone-300">
              Beef.Money is a permissionless marketplace where ranchers list
              their beef, set their own prices, and keep their earnings. There
              are no mandatory platform fees. No gatekeepers. No corporate
              middlemen telling you what beef is &ldquo;good enough&rdquo; to
              eat.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-black text-amber-400">
              What Makes Us Different
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "No Mandatory Fees",
                  body: "Zero platform commissions. Ranchers can opt in to a donation rate to support the site, but every sale defaults to 100% going to the rancher.",
                },
                {
                  title: "Privacy-First",
                  body: "Built on the Nostr protocol. All buyer-rancher communications are encrypted end-to-end. Your data is never sold or shared.",
                },
                {
                  title: "Pay Your Way",
                  body: "Bitcoin via Lightning Network, Cashu eCash, credit/debit cards via Stripe, or arrange cash directly with your rancher.",
                },
                {
                  title: "Censorship-Resistant",
                  body: "No central authority can shut down the marketplace or block ranchers from selling legal food. Food freedom is non-negotiable.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6"
                >
                  <h3 className="mb-2 text-xl font-bold text-amber-400">
                    {c.title}
                  </h3>
                  <p className="text-stone-300">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-lg border-2 border-amber-900 bg-stone-900 p-8">
            <h2 className="mb-4 text-3xl font-black text-amber-400">
              The Beef Initiative
            </h2>
            <p className="mb-4 leading-relaxed text-stone-300">
              Beef.Money was inspired by the work of the{" "}
              <a
                href="https://beefinitiative.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-400 underline hover:text-amber-300"
              >
                Beef Initiative
              </a>
              , a grassroots movement connecting American ranchers and consumers
              across all 50 states. We share the same conviction: decentralized
              food systems are healthier, more resilient, and more honest than
              centralized ones.
            </p>
            <p className="leading-relaxed text-stone-300">
              We&apos;re builders, ranchers, food sovereignty advocates, and
              Bitcoiners who think you should be able to buy a quarter cow from
              a rancher you know by name and pay them directly — without asking
              anyone&apos;s permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl font-black text-amber-400">
              The Numbers
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6 text-center">
                <span className="block text-4xl font-black text-amber-400">
                  85%
                </span>
                <span className="mt-2 block text-sm text-stone-400">
                  Of U.S. beef processed by just 4 corporations
                </span>
              </div>
              <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6 text-center">
                <span className="block text-4xl font-black text-amber-400">
                  &lt;40¢
                </span>
                <span className="mt-2 block text-sm text-stone-400">
                  What ranchers typically receive per food dollar
                </span>
              </div>
              <div className="rounded-lg border-2 border-amber-900 bg-stone-900 p-6 text-center">
                <span className="block text-4xl font-black text-amber-400">
                  100%
                </span>
                <span className="mt-2 block text-sm text-stone-400">
                  Goes to the rancher when you buy direct
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-lg border-2 border-amber-500 bg-amber-500 p-8 text-center text-stone-950">
            <h2 className="mb-4 text-3xl font-black">Ready to Get Started?</h2>
            <p className="mb-6 text-lg">
              Whether you&apos;re a rancher looking to sell or a family
              searching for real beef, Beef.Money is here for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/marketplace">
                <button className="rounded-lg border-2 border-stone-950 bg-stone-950 px-6 py-3 font-bold text-amber-400 transition-all hover:bg-stone-800">
                  Browse Marketplace
                </button>
              </Link>
              <Link href="/producer-guide">
                <button className="rounded-lg border-2 border-stone-950 bg-transparent px-6 py-3 font-bold text-stone-950 transition-all hover:bg-stone-950 hover:text-amber-400">
                  Start Ranching
                </button>
              </Link>
              <Link href="/contact">
                <button className="rounded-lg border-2 border-stone-950 bg-transparent px-6 py-3 font-bold text-stone-950 transition-all hover:bg-stone-950 hover:text-amber-400">
                  Contact Us
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
