import Scrollytelling from "@/components/Scrollytelling";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import GithubGraph from "@/components/GithubGraph";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Gallery from "@/components/Gallery";
import Projects from "@/components/Projects";

import Preloader from "@/components/Preloader";
import Ethos from "@/components/Ethos";
import Matrix from "@/components/Matrix";
import DevMode from "@/components/EasterEggs/DevMode";
import KonamiMode from "@/components/EasterEggs/KonamiMode";
import BoomMode from "@/components/EasterEggs/BoomMode";
import TerminalMode from "@/components/EasterEggs/TerminalMode";
import GravMode from "@/components/EasterEggs/GravMode";
import FlipMode from "@/components/EasterEggs/FlipMode";
import RaveMode from "@/components/EasterEggs/RaveMode";

import MobileWarning from "@/components/MobileWarning";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Matrix />
      <DevMode />
      <KonamiMode />
      <BoomMode />
      <TerminalMode />
      <GravMode />
      <FlipMode />
      <RaveMode />
      <MobileWarning />
      <Cursor />
      <Noise />
      <NavBar />
      <main className="bg-[#0a0a0a] min-h-screen">
        <div id="home"><Scrollytelling /></div>
        <Ethos />
        <div id="experience"><Experience /></div>
        <div id="skills"><Skills /></div>
        <GithubGraph />
        <Education />
        <Certificates />
        <div id="gallery"><Gallery /></div>
        <div id="projects"><Projects /></div>
      </main>
      <Footer />
    </>
  );
}
