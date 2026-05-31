import React from "react";
import Hero from "./_components/Hero";
import Story from "./_components/Story";
import Stats from "./_components/Stats";
import Values from "./_components/Values";
import CTA from "./_components/CTA";

const About = () => {
  return (
    <section className="bg-background">
      <Hero />
      <Story />
      <Stats />
      <Values />
      <CTA />
    </section>
  );
};

export default About;

