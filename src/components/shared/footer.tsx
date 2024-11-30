"use client";
import { FooterMenuItems, MenuItem } from "@/constants/landing/menuItem";
import { Socials } from "@/constants/landing/socials";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full h-full mt-6 md:mt-8 flex flex-col items-center bg-[#F1F1F1]">
      <div className="w-full h-full px-5 md:px-10 lg:px-12 py-5 md:py-6 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-7 md:gap-6 max-w-screen-2xl mx-auto">
        {/* Logo and Details */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-3 md:gap-4">
          <div
            className="w-full flex items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image src="/logos/logo.png" alt="logo" width={70} height={70} />
            <h1 className="text-xl font-semibold text-green">
              Jayma Bio Innovations
            </h1>
          </div>
          <p className="text-green text-sm font-medium">
            Our mission is to create innovative, bio-based products that
            prioritize sustainability, strengthen our bond with nature, and
            promote well-being. Through eco-friendly practices, we aim to
            inspire a sustainable future and make a lasting positive impact on
            our planet.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="tel:+919940515782">
              <div className="flex gap-1 items-center">
                <IoMdCall className="size-4 shrink-0 fill-green" />
                <p className="text-sm text-green">+91 99405 15782</p>
              </div>
            </Link>
            <Link href="mailto:info@jaymabioinnovations.com">
              <div className="flex gap-2 items-center">
                <MdEmail className="size-4 shrink-0 fill-green" />
                <p className="text-sm text-green">
                  info@jaymabioinnovations.com
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 flex gap-10 md:pt-5 justify-between md:justify-center">
          {/* Quick Links of Menu */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-green">Quick Links</h1>
            <div className="flex flex-col gap-2">
              {FooterMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-green font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4 pt-1 md:pt-0 md:pl-3">
            <h1 className="text-xl font-semibold text-green">Social Links</h1>
            <div className="flex flex-col gap-2">
              {Socials.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-sm text-green font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col gap-4 md:pt-5 md:pl-4 w-full h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1047.141967854423!2d84.90339052101089!3d22.255074631223646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201e7655555555%3A0x35b1742b3b7b95d3!2sFoundation%20for%20Technology%20and%20Business%20Incubation!5e0!3m2!1sen!2sin!4v1730643858516!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen={true}
            className="w-full h-[80%] rounded-lg border border-green/80 p-1"
          ></iframe>
          <h1 className="text-sm md:text-medium font-semibold leading-6">
            Address :{" "}
            <span className="font-medium">
              T1-109, First floor, FTBI Building, NIT Rourkela, Sector-1,
              Rourkela, Odisha, PIN: 769008
            </span>
          </h1>
        </div>
      </div>
      <div className="w-full bg-lightGreen flex items-center justify-center">
        <div className="w-full h-20 md:h-14 flex flex-col md:flex-row items-center justify-center md:justify-between px-5 md:px-10 lg:px-12 gap-2 max-w-screen-2xl mx-auto">
          <h1 className="text-sm text-green text-center md:text-left">
            © {new Date().getFullYear()} Jayma Bio Innovations Pvt Ltd.
          </h1>
          <Link href="https://exions.tech" target="_blank">
            <h1 className="text-sm font-medium text-green md:tracking-wide">
              Developed by <span className="font-semibold">Exions Tech</span>
            </h1>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
