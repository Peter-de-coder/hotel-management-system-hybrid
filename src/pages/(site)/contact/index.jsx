import { Link } from "react-router-dom";
import React from "react";
import Hero from "./_components/Hero";
import MainBtn from "@/components/buttons/MainBtn";
import Form from "./_components/Form";

const Contact = () => {
  return (
    <section>
      <Hero />
      <Form />
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4984.9080638621235!2d6.294103875901508!3d7.119240615951995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10467dacad1e46e1%3A0x268fd1635363d122!2sHybrid%20hotel%20and%20suites%20Elele%20Uzairue!5e1!3m2!1sen!2sng!4v1767295194020!5m2!1sen!2sng"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[70vh]"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
