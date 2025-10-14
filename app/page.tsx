import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Stats from "@/components/stats";
import EventSpotlight from "@/components/event-spotlight";
import Tracks from "@/components/tracks";
import WhyJoin from "@/components/why-join";
import Registration from "@/components/registration";
import Footer from "@/components/footer";
import CTA from "@/components/cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhyJoin />
      {/* <Stats /> */}
      {/* <EventSpotlight /> */}
      <Tracks />
      <Registration />
      <CTA />
      <Footer />
    </main>
  );
}
