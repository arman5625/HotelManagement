import FeaturedRoom from "@/src/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/src/components/Gallery/Gallery";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import NewsLetter from "@/src/components/NewsLetter/NewsLetter";
import PageSearch from "@/src/components/PageSearch/PageSearch";
import { getFeaturedRoom } from "@/src/libs/api";

const Home = async()=> {
  const featuredRoom = await getFeaturedRoom()|| null;
  
  
  console.log("featuredRoom",featuredRoom);
  return (<>
  <HeroSection />
  <PageSearch />
  <FeaturedRoom featuredRoom={featuredRoom}/>
  <Gallery />
  <NewsLetter />
  </>
  );
}

export default Home;