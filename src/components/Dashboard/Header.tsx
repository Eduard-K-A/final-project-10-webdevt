import React from "react";
import SearchForm from "../Search/SearchForm";

interface HeaderProps {
  type?: "list" | "home";
}

const HERO_IMAGE_URL = "/assets/dashboardImg.png";

const Header: React.FC<HeaderProps> = ({ type = "home" }) => {
  const isHomePage = type === "home";

  if (!isHomePage) {
    return (
      <header
        className="bg-cover bg-center bg-no-repeat pb-8 pt-4 text-black"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="mx-auto max-w-7xl px-4" />
      </header>
    );
  }

  return (
    <header className="relative min-h-[560px] w-full overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_IMAGE_URL}
        alt="Hotel lobby background"
      />

      <div className="absolute inset-0 bg-[#1a2a4a]/45" />

      <div className="relative mx-auto flex min-h-[560px] w-full max-w-6xl flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl pb-8 pt-12 text-center">
          <h1
            className="mb-3 text-4xl font-medium leading-tight text-white opacity-0 animate-fade-in md:text-5xl"
            style={{ animationDuration: "0.8s" }}
          >
            Experience Luxury Redefined
          </h1>

          <p
            className="text-base font-medium text-white/85 opacity-0 animate-fade-in md:text-lg"
            style={{
              animationDelay: "0.5s",
              animationDuration: "1s",
            }}
          >
            Your perfect escape awaits at the world's finest boutique hotel
          </p>
        </div>

        <section
          aria-label="Search rooms"
          className="w-full max-w-5xl opacity-0 animate-slide-up-fade-in"
          style={{ animationDelay: "1.2s", animationDuration: "0.8s" }}
        >
          <div className="rounded-2xl border border-white/70 bg-white/95 p-3 shadow-xl backdrop-blur sm:p-4">
            <SearchForm />
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
