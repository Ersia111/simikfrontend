import MainLayout from "../layouts/MainLayout";
import ScrollBridgeHero from "../components/ScrollBridgeHero";
import HomeFeatures from "../components/HomeFeatures";
import HowItWorks from "../components/HowItWorks";
import HomeStats from "../components/HomeStats";
import HomeCTA from "../components/HomeCTA";

function Home() {
  return (
    <MainLayout>
      <ScrollBridgeHero />
      <HomeFeatures />
      <HowItWorks />
      <HomeStats />
      <HomeCTA />
    </MainLayout>
  );
}

export default Home;