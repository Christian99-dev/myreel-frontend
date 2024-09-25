import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Tutorial from "@/components/home/Tutorial";
import Work from "@/components/home/Work";

export default function Home() {
  return (
    <div className="w-full bg-purple-dark">
      <main>
        <Hero />
        <div className="flex flex-col gap-[200px]">
          <Tutorial />
          <Work />
          <Footer />
        </div>
      </main>
    </div>
  );
}
