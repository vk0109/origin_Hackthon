function ImpactStats() {
  const stats = [
    ["2,500+", "People Supported"],
    ["1,200+", "Active Volunteers"],
    ["85+", "Partner Organizations"],
    ["24/7", "Response Network"],
  ];

  return (
    <section className="grid grid-cols-2 bg-[#0b1713] px-6 py-8 text-white lg:grid-cols-4">
      {stats.map(([number, label]) => (
        <div
          key={label}
          className="border-[#293a33] py-3 text-center lg:border-r last:border-r-0"
        >
          <h2 className="font-['Manrope'] text-3xl font-extrabold text-[#d9ff4f]">
            {number}
          </h2>

          <p className="mt-1 text-[10px] text-gray-500">
            {label}
          </p>
        </div>
      ))}
    </section>
  );
}

export default ImpactStats;