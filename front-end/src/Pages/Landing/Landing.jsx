import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { Sun, Crosshair } from "react-feather";

import Hero from "./Hero_Photo.png";
import logo from "./logo2.png";
import Feature_1 from "./Feature_Art_1.png";
import Security from "./Security.png";

import Navbar from "../../Components/Navbar/Navbar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Footer from "../../Components/Footer/Footer";

const icons = [
  <Sun className="icon" />,
  <Crosshair className="icon section" />,
];

const Section = ({ Title, Paragraph, Icon }) => {
  return (
    <div className="flex flex-col justify-evenly w-full md:w-1/2">
      <div className="flex flex-row justify-start items-center gap-4">
        {icons[Icon]}
        <h1 className="text-white text-xl md:text-2xl fira-sans-medium">
          {Title}
        </h1>
      </div>
      <p className="antialiased text-gray-500 w-full md:w-11/12 self-end">
        {Paragraph}
      </p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="h-screen overflow-hidden relative" id="About">
      <div className="container relative">
       <div className="h-20 w-20 absolute right-[12%] top-4 hidden md:block">
  <img src={logo} alt="Logo" className="object-cover h-full" />
</div>
      </div>
      <div className="absolute inset-x-1/2 inset-y-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row justify-evenly items-center w-[90%] md:w-[85%] h-[85%] md:h-[50%] gap-4">
        <div className="flex flex-col justify-center w-full md:w-[70%] gap-5">
          <div className="flex flex-col justify-center">
            <h2 className="text-white fira-sans-medium text-3xl md:text-4xl" id="Heading_Sub">
              SpyEye:
            </h2>
            <h1 className="text-white fira-sans-medium text-4xl md:text-5xl lg:text-6xl" id="Hero_Heading">
              Seeing Threates Before They Fly
            </h1>
          </div>
          <p className="text-gray-500 antialiased text-base md:text-lg">
            Protect yourself from even the most advanced and nascent attack
            vectors with our state-of-the-art prediction mechanism. Want to
            check out your risk? Get started with us now!
          </p>
          <Link to="/upload">
            <button className="bg-white text-black w-2/3 md:w-1/3 p-4 rounded fira-sans-bold text-lg md:text-xl hover:scale-105 transition duration-300 ease-in-out">
              Get Started
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center overflow-hidden">
          <img src={Hero} alt="" className="scale-125 w-full md:w-auto" id="HeroImage" />
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <div className="h-[80vh] overflow-hidden relative" id="Features">
      <div className="flex flex-col md:flex-row w-[90%] h-[95%] absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 justify-evenly items-center">
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={Feature_1}
            alt=""
            className="w-full max-w-[300px] md:max-w-[612px] h-auto scale-110"
          />
        </div>
        <div className="flex flex-col justify-evenly   w-full md:w-1/2 gap-5">
          <h2 className="text-white pt-10 fira-sans-medium text-3xl md:text-4xl">
            Tackling Modern<br />Security Threats
          </h2>
          <p className="text-gray-500 antialiased text-base md:text-lg">
            In today's cyber-driven world, the increasing number of
            vulnerabilities in existing software puts enterprises at a huge
            risk of being hacked. That is where we step in!
          </p>
          <div className="bg-gradient-to-r from-[#1c216d] to-[#021732] rounded border-2 border-zinc-800 p-5 shadow-md">
            <div className="flex flex-row justify-start items-center gap-3">
              {icons[0]}
              <h3 className="text-white fira-sans-medium text-lg md:text-xl">
                Impact to Business
              </h3>
            </div>
            <p className="text-gray-500 antialiased text-sm md:text-base my-2">
              Cybersecurity breaches can have severe impacts on businesses.
              They can result in financial issues due to stolen funds and
              operational disruptions, as well as damage a company's
              reputation, leading to a loss of customer trust and decreased
              sales.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <Section
              Title="Alarming Statistics"
              Paragraph="Every 1 in 10 organisations suffers a critical loss of data due to prevalent vulnerabilities that go unnoticed from common security checks."
              Icon={1}
            />
            <Section
              Title="NVD"
              Paragraph="We use highly reliable information from the NVD (Backed by the US Govt.) in order to run complex regression models that predict attacks before they happen."
              Icon={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ExplanationSection = () => {
  return (
    <div className="h-[70vh] overflow-hidden relative">
      <div className="flex flex-col md:flex-row justify-evenly items-center w-[90%] h-[90%] absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-full md:w-3/5 flex flex-col justify-evenly items-start gap-4">
          <h2 className="text-white fira-sans-medium text-3xl md:text-4xl">
            Comprehensive Security To <br />Protect Your Business
          </h2>
          <p className="text-gray-500 antialiased text-base md:text-lg">
            Cybersecurity breaches pose dire threats to businesses, causing
            financial turmoil from stolen funds, disrupting operations, and
            tarnishing reputations. The ripple effect includes a loss of
            customer trust and decreased sales, creating a precarious
            environment for businesses to navigate in the digital landscape.
          </p>
        </div>
        <div className="w-full md:w-2/5 flex justify-center items-center">
          <img src={Security} alt="" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  useGSAP(() => {
    gsap.from("#Navbar", {
      y: -50,
      duration: 0.5,
      delay: 0.5,
      opacity: 0,
    });

    gsap.from("#About", {
      x: -20,
      y: -20,
      duration: 0.5,
      delay: 0.5,
      opacity: 0,
    });
  });

  return (
    <div className="bg-[#021732]   " id="#main">
      <ProgressBar />
      <Navbar />
      <div className="div pt-12 md:pt-0">

        <HeroSection />
        <FeatureSection />
        <ExplanationSection />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
