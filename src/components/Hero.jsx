function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/36072012/pexels-photo-36072012.jpeg?auto=compress&cs=tinysrgb&w=1800')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#050e0b]/95 via-[#050e0b]/80 to-[#050e0b]/45" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-20 pt-32 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9ff4f]/30 bg-[#d9ff4f]/10 px-4 py-2 text-[10px] font-bold tracking-[1.5px] text-[#d9ff4f]">
            <span className="h-2 w-2 rounded-full bg-[#d9ff4f]" />
            EMERGENCY RESPONSE PLATFORM
          </div>

          <h1 className="mt-7 max-w-3xl font-['Manrope'] text-5xl font-extrabold leading-[1] tracking-[-3px] sm:text-6xl lg:text-7xl">
            When disaster
            <br />
            strikes, <span className="text-[#d9ff4f]">Origin responds.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-gray-300">
            A centralized platform connecting affected communities, volunteers,
            NGOs and critical resources — making disaster response faster,
            smarter and more coordinated.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg bg-[#d9ff4f] px-6 py-4 text-sm font-bold text-[#101b16] transition hover:-translate-y-1">
              Request Emergency Help <span className="ml-2">↗</span>
            </button>

            <button className="rounded-lg border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">
              Become a Volunteer
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex">
              {["👨🏻", "👩🏻", "👨🏽", "👩🏽"].map((avatar, index) => (
                <span
                  key={index}
                  className="-ml-2 grid h-9 w-9 place-items-center rounded-full border-2 border-[#17241f] bg-gray-200 first:ml-0"
                >
                  {avatar}
                </span>
              ))}
            </div>

            <div>
              <strong className="block text-xs">1,200+ volunteers</strong>
              <span className="text-[10px] text-gray-400">
                ready to respond
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
