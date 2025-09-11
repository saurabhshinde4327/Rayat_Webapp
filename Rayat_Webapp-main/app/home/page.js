
import HeaderSection from "../components/HeaderSection";
import Navbar from "../components/Navbar";
import Slider from "../components/HeroSlider";
import Gallery from "../components/Gallery";
import AboutSection from "../components/AboutSection ";
import Footer from "../components/Footer";
import Regional from "../components/Regional";
import Header from "../components/Header"; 
import RecentActivity from "../components/RecentActivity"
import Achievements from "../components/Achievements";
import Alumni from "../components/Alumni";
import AboutRayat from "../components/AboutRayat";
import Logo from "../components/Logo";
import ThreeSections from "../components/ThreeSections";


export default function Home() {
  return (
    <div>
     
      <HeaderSection />
   <Header />
      {/* Navbar */}
      <Navbar />
      {/* Image Slider */}
      <Slider />

      {/* About Section */}
     

      {/* News Section */}
     <ThreeSections />

      <AboutRayat />
    
      <AboutSection />

<RecentActivity />
<Gallery />

{/* <RecentSchoolActivity /> */}
<Regional />
<br />
<Achievements />
<Alumni /><br/>
<Logo />

      <Footer />
    </div>
  );
}