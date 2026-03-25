import React from "react";
import heroImg from "../assets/Images/hero.png"; // INSERT YOUR HERO IMAGE PATH HERE
import company1 from "../assets/Icons/company1.svg";
import company2 from "../assets/Icons/company2.svg";
import company3 from "../assets/Icons/company3.svg";
import company4 from "../assets/Icons/company4.svg";
import company5 from "../assets/Icons/company5.svg";

const Hero = () => {
  return (
    <section>
      {/* ─── HERO ─── */}
      <div className="bg-[#f2f0f1] relative overflow-hidden">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="relative min-h-[520px] md:min-h-[600px] flex items-center">
            {/* Left content */}
            <div className="relative z-10 w-full md:w-[52%] py-12 md:py-16">
              <h1 className="font-black text-[40px] md:text-[56px] lg:text-[64px] leading-[1.0] tracking-tight uppercase text-black mb-5">
                Find Clothes That Matches Your Style
              </h1>
              <p className="max-w-xs mb-8 text-sm leading-relaxed text-gray-500">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button className="px-10 py-4 text-sm font-medium text-white transition-colors bg-black rounded-full hover:bg-gray-900">
                Shop Now
              </button>

              {/* Stats */}
              <div className="flex flex-wrap gap-0 mt-10">
                <div className="pr-6 border-r border-gray-300 md:pr-8">
                  <p className="text-2xl font-black text-black md:text-3xl">
                    200+
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    International Brands
                  </p>
                </div>
                <div className="px-6 border-r border-gray-300 md:px-8">
                  <p className="text-2xl font-black text-black md:text-3xl">
                    2,000+
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    High-Quality Products
                  </p>
                </div>
                <div className="pl-6 md:pl-8">
                  <p className="text-2xl font-black text-black md:text-3xl">
                    30,000+
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>

            {/* Hero image — desktop: absolute right, mobile: below content */}
            <div className="absolute bottom-0 right-0 hidden w-full h-full pointer-events-none md:block">
              <img
                src={heroImg}
                alt="Fashion models"
                className="absolute bottom-0 right-0 object-contain object-bottom h-full"
              />
            </div>

            {/* Decorative stars — desktop only */}
            <div className="hidden md:block absolute top-12 right-[18%] pointer-events-none">
              {/* INSERT STAR / SPARKLE SVG HERE */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="hidden md:block absolute top-[55%] right-[48%] pointer-events-none">
              {/* INSERT STAR / SPARKLE SVG HERE */}
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile hero image */}
        <div className="relative w-full md:hidden">
          <img
            src={heroImg}
            alt="Fashion models"
            className="object-cover w-full"
          />
          {/* Decorative stars — mobile */}
          <div className="absolute pointer-events-none top-6 right-4">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="absolute pointer-events-none bottom-10 left-4">
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── BRANDS BAR ─── */}
      <div className="py-5 overflow-hidden bg-black">
        <div className="flex flex-wrap items-center justify-around px-6 mx-auto gap-x-8 gap-y-3 max-w-7xl">
          <img src={company1} alt="" />
          <img src={company2} alt="" />
          <img src={company3} alt="" />
          <img src={company4} alt="" />
          <img src={company5} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
