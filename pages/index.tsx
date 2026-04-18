import { useState, useContext, useEffect } from "react";
import type React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image } from "@heroui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  BLACKBUTTONCLASSNAMES,
  PRIMARYBUTTONCLASSNAMES,
  WHITEBUTTONCLASSNAMES,
} from "@/utils/STATIC-VARIABLES";
import { SignerContext } from "@/components/utility-components/nostr-context-provider";
import SignInModal from "@/components/sign-in/SignInModal";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-amber-900 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-bold transition-colors hover:text-amber-800"
      >
        <span>{question}</span>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-stone-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function YouTubeCarousel() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/youtube-videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.videos) {
          setVideos(data.videos);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-800 border-t-transparent"></div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="rounded-lg border-2 border-amber-900 bg-amber-50 p-8 text-center">
        <p className="text-stone-600">
          Unable to load videos at this time. Please check our YouTube channel
          directly.
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-[84vw] overflow-hidden">
      <div className="animate-scroll flex gap-6 will-change-transform">
        {[...videos, ...videos].map((video, index) => (
          <a
            key={`${video.id}-${index}`}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group shadow-neo block w-80 flex-shrink-0 overflow-hidden rounded-lg border-2 border-amber-900 bg-white transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-none"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black transition-all">
                <div className="rounded-full bg-red-600 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2 font-bold text-stone-900">
                {video.title}
              </h3>
              <p className="line-clamp-2 text-sm text-stone-600">
                {video.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function StandaloneLanding() {
  const router = useRouter();
  const [contactType, setContactType] = useState<"email" | "nostr">("email");
  const [contact, setContact] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const signerContext = useContext(SignerContext);
  useEffect(() => {
    if (router.pathname === "/" && signerContext.isLoggedIn) {
      router.push("/marketplace");
    }
  }, [router.pathname, signerContext.isLoggedIn]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || !isValidContact) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: contact.trim(),
          contactType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Thanks for signing up! We'll keep you updated on new ranchers and products.",
        });
        setContact("");
      } else {
        setSubmitMessage({
          type: "error",
          text: data.error || "Something went wrong! Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Network error! Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidNostrPub = (npub: string) => {
    return npub.startsWith("npub1") && npub.length === 63;
  };

  const isValidContact =
    contactType === "email" ? isValidEmail(contact) : isValidNostrPub(contact);

  const BrandmarkPattern = () => (
    <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="brand-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 30 60 M 0 30 L 60 30"
              stroke="#78350f"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brand-pattern)" />
      </svg>
    </div>
  );

  return (
    <div className="w-full overflow-x-hidden bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6">
        <div className="flex items-center space-x-2">
          <Image
            src="/beef-initiative-icon.png"
            alt="Beef.Money logo - rancher-direct beef marketplace"
            width={40}
            height={40}
            className="h-10 w-10"
            loading="eager"
          />
          <span className="text-xl font-black tracking-tight text-amber-900">
            Beef.Money
          </span>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <button
            className={WHITEBUTTONCLASSNAMES}
            onClick={() => setIsSignInOpen(true)}
          >
            Sell Your Beef
          </button>
          <Link href="/marketplace" className="w-auto">
            <button className={PRIMARYBUTTONCLASSNAMES}>
              Browse Marketplace
            </button>
          </Link>
        </div>

        <div className="relative md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-50 rounded-md border-2 border-amber-900 bg-white p-2"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-amber-900" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-amber-900" />
            )}
          </button>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 top-20 z-40 flex flex-col items-center space-y-6 bg-stone-50 pt-10">
              <button
                className={WHITEBUTTONCLASSNAMES}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSignInOpen(true);
                }}
              >
                Sell Your Beef
              </button>
              <Link href="/marketplace" className="block">
                <button
                  className={PRIMARYBUTTONCLASSNAMES}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse Marketplace
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden border-b-4 border-amber-900 bg-stone-900 px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <BrandmarkPattern />

        {/* Background logo watermarks */}
        <div className="pointer-events-none absolute top-[10%] left-[5%] opacity-[0.06]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={120}
            height={120}
            className="h-30 w-30"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute top-[15%] right-[8%] opacity-[0.05]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={150}
            height={150}
            className="h-36 w-36"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute bottom-[10%] left-[12%] opacity-[0.07]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={100}
            height={100}
            className="h-24 w-24"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute right-[14%] bottom-[8%] opacity-[0.05]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={90}
            height={90}
            className="h-22 w-22"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full border border-amber-600 bg-amber-900/30 px-4 py-1 text-sm font-semibold tracking-widest text-amber-400 uppercase">
            Food Freedom &bull; Rancher Direct &bull; No Middlemen
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-black text-white md:text-6xl lg:text-7xl">
            Know Your Rancher. <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="relative z-10 text-amber-400">
                Buy Real Beef.
              </span>
            </span>
          </h1>

          <p className="mx-auto mb-4 max-w-2xl text-lg text-stone-300">
            Connect directly with local ranchers selling grass-fed,
            pasture-raised beef. Cut out the grocery store. Pay the rancher
            directly. Know exactly where your food comes from.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">&#10003;</span> Grass-fed &amp;
              pasture-raised
            </span>
            <span className="flex items-center gap-1">
              <span className="text-amber-500">&#10003;</span> No mandatory fees
            </span>
            <span className="flex items-center gap-1">
              <span className="text-amber-500">&#10003;</span> Direct to rancher
            </span>
            <span className="flex items-center gap-1">
              <span className="text-amber-500">&#10003;</span> Bitcoin accepted
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/marketplace">
              <button className="rounded-lg border-2 border-amber-500 bg-amber-600 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_#78350f] transition-all hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-[6px_6px_0px_#78350f] active:translate-y-0 active:shadow-none">
                Find Local Ranchers Near You
              </button>
            </Link>
            <button
              onClick={() => setIsSignInOpen(true)}
              className="rounded-lg border-2 border-stone-500 bg-transparent px-8 py-4 text-lg font-bold text-stone-200 transition-all hover:border-amber-500 hover:text-amber-400"
            >
              I&apos;m a Rancher &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b-2 border-amber-900 bg-amber-900 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 text-center">
          <div>
            <span className="block text-2xl font-black text-amber-400">2+</span>
            <span className="text-sm text-amber-100">Local Ranches</span>
          </div>
          <div className="hidden h-8 w-px bg-amber-700 md:block" />
          <div>
            <span className="block text-2xl font-black text-amber-400">
              10+
            </span>
            <span className="text-sm text-amber-100">Products Listed</span>
          </div>
          <div className="hidden h-8 w-px bg-amber-700 md:block" />
          <div>
            <span className="block text-2xl font-black text-amber-400">0%</span>
            <span className="text-sm text-amber-100">Mandatory Fees</span>
          </div>
          <div className="hidden h-8 w-px bg-amber-700 md:block" />
          <div>
            <span className="block text-2xl font-black text-amber-400">
              100%
            </span>
            <span className="text-sm text-amber-100">Direct to Rancher</span>
          </div>
        </div>
      </section>

      {/* Mission Statement Banner */}
      <section className="border-b-2 border-amber-900 bg-amber-50 py-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xl font-bold text-amber-900 md:text-2xl">
            &ldquo;The Beef Initiative is about rebuilding the relationship
            between producers and consumers &mdash; one ranch at a time.&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold tracking-widest text-amber-700 uppercase">
            Beef.Money &mdash; Powered by the Beef Initiative
          </p>
        </div>
      </section>

      {/* Problem -> Solution */}
      <section className="relative z-10 border-b-2 border-amber-900 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-stone-900 md:text-4xl">
              The Food Supply Is Broken.{" "}
              <span className="text-amber-800">We Fix That.</span>
            </h2>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-8">
              <h3 className="mb-4 text-xl font-black text-red-700">
                The Problem
              </h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">&#10007;</span>
                  Grocery store beef travels thousands of miles and sits for
                  weeks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">&#10007;</span>
                  Factory farming squeezes ranchers out of the market
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">&#10007;</span>
                  Corporate middlemen take the profit while ranchers struggle
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">&#10007;</span>
                  Consumers have no idea where their meat actually comes from
                </li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-8">
              <h3 className="mb-4 text-xl font-black text-amber-800">
                With Beef.Money
              </h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">&#10003;</span>
                  Get beef straight from the ranch, fresh and traceable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">&#10003;</span>
                  Support independent ranchers keeping land in production
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">&#10003;</span>
                  No mandatory fees &mdash; ranchers keep what they earn
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">&#10003;</span>
                  Pay with Bitcoin, cash, or digital methods &mdash; your choice
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative z-10 overflow-hidden border-b-2 border-amber-900 bg-stone-900 py-16"
      >
        <BrandmarkPattern />

        {/* Background logo watermarks */}
        <div className="pointer-events-none absolute top-[12%] left-[8%] opacity-[0.06]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={110}
            height={110}
            className="h-28 w-28"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute right-[10%] bottom-[15%] opacity-[0.05]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={90}
            height={90}
            className="h-22 w-22"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-stone-400">
              Three simple steps to rancher-direct beef
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border-2 border-amber-700 bg-stone-800 p-6 text-center shadow-[4px_4px_0px_#92400e]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Find a Rancher
              </h3>
              <p className="text-stone-400">
                Search by location to find beef ranchers near you
              </p>
            </div>

            <div className="rounded-lg border-2 border-amber-700 bg-stone-800 p-6 text-center shadow-[4px_4px_0px_#92400e]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Choose Your Cut
              </h3>
              <p className="text-stone-400">
                Select whole/half cow, individual cuts, ground beef, organ
                meats, and more
              </p>
            </div>

            <div className="rounded-lg border-2 border-amber-700 bg-stone-800 p-6 text-center shadow-[4px_4px_0px_#92400e]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Pay &amp; Pick Up
              </h3>
              <p className="text-stone-400">
                Pay the rancher directly and arrange pickup or delivery
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/marketplace">
              <button className="rounded-lg border-2 border-amber-500 bg-amber-600 px-8 py-3 font-bold text-white shadow-[4px_4px_0px_#92400e] transition-all hover:-translate-y-0.5 hover:bg-amber-500 active:translate-y-0 active:shadow-none">
                Start Browsing
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 border-b-2 border-amber-900 bg-amber-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-stone-900 md:text-4xl">
              Why Ranchers and Buyers Choose Us
            </h2>
            <p className="mx-auto max-w-2xl text-stone-600">
              Direct food sales from farms reached{" "}
              <a
                href="https://www.ers.usda.gov/data-products/charts-of-note/chart-detail?chartId=108821"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-800 underline"
              >
                $17.5 billion in 2022
              </a>
              , up 25% since 2017 according to the USDA Census of Agriculture
              &mdash; reflecting surging demand for fresh, traceable food sold
              direct from local ranches.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border-2 border-amber-900 bg-white p-8 text-center shadow-[4px_4px_0px_#78350f]">
              <span className="mb-4 block text-4xl text-amber-700">0%</span>
              <h3 className="mb-2 text-xl font-bold">No Mandatory Fees</h3>
              <p className="text-stone-600">
                We never take a mandatory cut. Ranchers can choose to set an
                optional donation rate to support the platform, but it&apos;s
                always their choice.
              </p>
            </div>
            <div className="rounded-lg border-2 border-amber-900 bg-white p-8 text-center shadow-[4px_4px_0px_#78350f]">
              <span className="mb-4 block text-4xl text-amber-700">100%</span>
              <h3 className="mb-2 text-xl font-bold">
                Private &amp; Sovereign
              </h3>
              <p className="text-stone-600">
                Your data stays encrypted. No tracking, no selling your info.
                Built on decentralized infrastructure you can trust.
              </p>
            </div>
            <div className="rounded-lg border-2 border-amber-900 bg-white p-8 text-center shadow-[4px_4px_0px_#78350f]">
              <span className="mb-4 block text-4xl text-amber-700">24/7</span>
              <h3 className="mb-2 text-xl font-bold">Always Available</h3>
              <p className="text-stone-600">
                Browse ranches and products anytime. Connect with your rancher
                when it works for you.
              </p>
            </div>
          </div>

          <blockquote className="mx-auto mt-12 max-w-3xl rounded-lg border-2 border-amber-900 bg-white p-6 text-center shadow-[4px_4px_0px_#78350f]">
            <p className="mb-3 text-lg text-stone-700 italic">
              &ldquo;The shorter the chain between raw food and fork, the
              fresher it is and the more transparent the system is.&rdquo;
            </p>
            <cite className="text-sm font-bold text-stone-900 not-italic">
              &mdash; Joel Salatin,{" "}
              <span className="font-normal italic">
                Everything I Want To Do Is Illegal
              </span>
            </cite>
          </blockquote>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 border-b-2 border-amber-900 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">
              Common Questions
            </h2>
          </div>

          <div className="rounded-lg border-2 border-amber-900 bg-amber-50 p-6 shadow-[4px_4px_0px_#78350f]">
            <FAQItem
              question="Can I buy beef directly from a rancher?"
              answer="Yes. Beef.Money connects you directly with ranchers who sell their beef without middlemen. You arrange the transaction directly with the rancher — no platform cuts, no corporate intermediaries."
            />
            <FAQItem
              question="How do I pay the rancher?"
              answer="You pay the rancher directly using whatever method you both agree on — Bitcoin, cash, or other digital payment methods. There are no mandatory platform fees. Ranchers may choose to set an optional donation rate to help support the site, but that's entirely up to them."
            />
            <FAQItem
              question="Is my information private?"
              answer="Yes. All your data is encrypted and private. We never share user data with third parties or regulators. Our platform is built on Nostr, a decentralized protocol that prioritizes privacy."
            />
            <FAQItem
              question="What kinds of beef can I buy?"
              answer="That depends on the rancher you choose. Many offer whole or half cows, individual cuts, ground beef, organ meats, and more — all pasture-raised and grass-fed. You can ask your rancher directly about their practices and animals."
            />
            <FAQItem
              question="I'm a rancher. How do I list my products?"
              answer="It's free and takes just a few minutes. Click 'Sell Your Beef' in the navigation, create your profile, and start adding products. You set your own prices, pickup options, and payment methods."
            />
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="relative z-10 overflow-hidden border-b-2 border-amber-900 bg-stone-900 py-16">
        <BrandmarkPattern />

        {/* Background logo watermarks */}
        <div className="pointer-events-none absolute top-[18%] left-[12%] opacity-[0.06]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={100}
            height={100}
            className="h-24 w-24"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute right-[8%] bottom-[20%] opacity-[0.05]">
          <Image
            src="/beef-initiative-icon.png"
            alt=""
            width={85}
            height={85}
            className="h-20 w-20"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              Latest from Our Channel
            </h2>
            <p className="text-lg text-stone-400">
              Stories from the rancher-direct beef community
            </p>
          </div>

          <div className="flex items-center justify-center">
            <YouTubeCarousel />
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.youtube.com/@milkmarketmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-amber-500 bg-transparent px-6 py-3 font-bold text-amber-400 transition-all hover:bg-amber-900"
            >
              Visit Our Channel
            </a>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section
        id="signup"
        className="relative z-10 overflow-hidden border-b-2 border-amber-900 bg-amber-50 py-16"
      >
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-black text-stone-900 md:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mb-8 text-lg text-stone-600">
            Get updates on new ranches, products, and the food freedom movement
          </p>

          <div className="rounded-lg border-2 border-amber-900 bg-white p-8 text-left shadow-[4px_4px_0px_#78350f]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-base font-bold">
                  How would you like us to reach you?
                </label>
                <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name="contactType"
                      value="email"
                      checked={contactType === "email"}
                      onChange={() => setContactType("email")}
                      className="mr-2 accent-amber-800"
                    />
                    Email
                  </label>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name="contactType"
                      value="nostr"
                      checked={contactType === "nostr"}
                      onChange={() => setContactType("nostr")}
                      className="mr-2 accent-amber-800"
                    />
                    Nostr
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-base font-bold"
                >
                  {contactType === "email"
                    ? "Email Address"
                    : "Nostr Public Key (npub)"}
                </label>
                <input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={
                    contactType === "email" ? "your@email.com" : "npub1..."
                  }
                  className="w-full rounded-lg border-2 border-amber-900 p-3 shadow-[2px_2px_0px_#78350f] focus:outline-none"
                  style={{ backgroundColor: "#fef3c7" }}
                />
              </div>

              <button
                type="submit"
                disabled={!isValidContact || isSubmitting}
                className="w-full rounded-lg border-2 border-amber-900 bg-amber-800 px-6 py-3 font-bold text-white shadow-[4px_4px_0px_#78350f] transition-all hover:-translate-y-0.5 hover:bg-amber-700 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Get Updates"}
              </button>
            </form>

            {submitMessage && (
              <div
                className={`mt-4 rounded-lg p-4 ${
                  submitMessage.type === "success"
                    ? "border border-green-200 bg-green-100 text-green-800"
                    : "border border-red-200 bg-red-100 text-red-800"
                }`}
              >
                <p className="flex items-center space-x-2">
                  <span>
                    {submitMessage.type === "success" ? "&#10003;" : "&#10007;"}
                  </span>
                  <span>{submitMessage.text}</span>
                </p>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-stone-500">
              <p>Your contact info stays private and will never be shared</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 overflow-hidden border-b-2 border-amber-900 bg-amber-800 py-16">
        <BrandmarkPattern />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-black text-white md:text-5xl">
            Take Back Your Food Supply.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-100">
            Join the movement connecting people directly with local ranchers. No
            middlemen. No mystery meat. Just real beef from real ranchers.
          </p>
          <Link href="/marketplace">
            <button className="rounded-lg border-2 border-amber-300 bg-amber-400 px-8 py-4 text-lg font-bold text-amber-900 shadow-[4px_4px_0px_#78350f] transition-all hover:-translate-y-0.5 hover:bg-amber-300 active:translate-y-0 active:shadow-none">
              Find Local Beef Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-stone-950 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-6 text-center md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-bold text-amber-400">Sovereign</h4>
              <p className="text-sm text-stone-400">
                All data encrypted and secure
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-amber-400">Permissionless</h4>
              <p className="text-sm text-stone-400">
                No central authority controls the platform
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-amber-400">Peer to Peer</h4>
              <p className="text-sm text-stone-400">
                Deal directly with ranchers
              </p>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center">
            <div className="mb-6 flex items-center justify-center space-x-3">
              <Image
                src="/beef-initiative-icon.png"
                alt="Beef.Money logo - rancher-direct beef marketplace"
                width={36}
                height={36}
                className="h-9 w-9"
                loading="lazy"
              />
              <span className="text-xl font-black tracking-tight text-amber-400">
                Beef.Money
              </span>
            </div>
            <p className="mb-6 text-lg font-bold text-amber-300">
              The Beef Revolution Won&apos;t Be Commodity Graded. Join Us.
            </p>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/about"
                className="text-sm text-stone-400 hover:text-amber-400 hover:underline"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm text-stone-400 hover:text-amber-400 hover:underline"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-sm text-stone-400 hover:text-amber-400 hover:underline"
              >
                FAQ
              </Link>
              <Link
                href="/terms"
                className="text-sm text-stone-400 hover:text-amber-400 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-stone-400 hover:text-amber-400 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/producer-guide"
                className="text-sm text-stone-400 hover:text-amber-400 hover:underline"
              >
                Producer Guide
              </Link>
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://github.com/shopstr-eng/milk-market"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image
                  src="/github-mark-white.png"
                  alt="Beef.Money open source code on GitHub"
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
              <a
                href="https://njump.me/milkmarket@milk.market"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image
                  src="/nostr-icon-white-transparent-256x256.png"
                  alt="Beef.Money on Nostr decentralized network"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </a>
              <a
                href="https://x.com/milkmarketmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image
                  src="/x-logo-white.png"
                  alt="Follow Beef.Money on X (Twitter)"
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.youtube.com/@milkmarketmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image
                  src="/youtube-icon.png"
                  alt="Beef.Money YouTube channel"
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.instagram.com/milkmarketmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image
                  src="/instagram-icon.png"
                  alt="Beef.Money on Instagram"
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
            </div>
            <p className="text-sm text-stone-500">
              &copy; {new Date().getFullYear()} Beef.Money. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        sellerFlow
      />
    </div>
  );
}
