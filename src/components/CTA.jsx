function CTA() {
  return (
    <section
      id="contact"
      className="relative mx-5 mb-24 min-h-[530px] overflow-hidden rounded-[28px] bg-[#101d18] text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(8,18,14,.98),rgba(8,18,14,.75),rgba(8,18,14,.2)),url('https://images.pexels.com/photos/36072012/pexels-photo-36072012.jpeg?auto=compress&cs=tinysrgb&w=1800')",
        }}
      />

      <div className="relative z-10 max-w-2xl px-8 py-28 lg:ml-[8%]">

        <span className="text-[9px] font-extrabold tracking-[2px] text-[#d9ff4f]">
          04 — TAKE ACTION
        </span>

        <h2 className="mt-5 font-['Manrope'] text-5xl font-extrabold leading-tight tracking-[-3px] sm:text-6xl">
          Be the help
          <br />
          <span className="text-[#d9ff4f]">someone needs.</span>
        </h2>

        <p className="mt-6 max-w-lg text-sm leading-7 text-gray-300">
          Whether you need assistance or want to support your
          community, every action matters.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="rounded-lg bg-[#d9ff4f] px-6 py-4 text-sm font-bold text-[#101b16] transition hover:-translate-y-1">
            Request Help ↗
          </button>

          <button className="rounded-lg border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">
            Join the Network
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;