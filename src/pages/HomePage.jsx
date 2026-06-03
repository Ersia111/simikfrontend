import { Link } from "react-router-dom";

import ScrollHandsHero from "../components/ScrollHandsHero";
import HomeFeatures from "../components/HomeFeatures";
import WhySiMik from "../components/WhySiMik";
import HowItWorks from "../components/HowItWorks";
import HomeStats from "../components/HomeStats";
import HomeCTA from "../components/HomeCTA";

function HomePage() {
  return (
    <main className="bg-[#050b1a] text-white">
      <ScrollHandsHero />
      <HomeFeatures />
      <WhySiMik />
      <HowItWorks />
      <HomeStats />
      <HomeCTA />
    </main>
  );
}



export default HomePage;