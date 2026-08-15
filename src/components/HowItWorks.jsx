import {
  FileText,
  Search,
  UserCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Report",
      description:
        "Submit an emergency request with the location, situation and resources required.",
    },
    {
      number: "02",
      icon: Search,
      title: "Assess",
      description:
        "Origin analyzes the request and identifies the urgency and type of assistance needed.",
    },
    {
      number: "03",
      icon: UserCheck,
      title: "Connect",
      description:
        "Verified volunteers, NGOs and response teams are matched with the right request.",
    },
    {
      number: "04",
      icon: Truck,
      title: "Respond",
      description:
        "Resources and assistance are dispatched to the affected location.",
    },
    {
      number: "05",
      icon: CheckCircle2,
      title: "Resolve",
      description:
        "The request is tracked until assistance reaches the affected people.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-cover bg-center py-28 text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/6995244/pexels-photo-6995244.jpeg?auto=compress&cs=tinysrgb&w=1800')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#06100c]/90" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06100c]/70 via-[#06100c]/90 to-[#06100c]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[#d9ff4f]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d9ff4f]" />

            <span className="text-xs font-bold tracking-[3px] text-[#d9ff4f]">
              HOW IT WORKS
            </span>

            <span className="h-px w-10 bg-[#d9ff4f]" />
          </div>

          <h2 className="font-['Manrope'] text-5xl font-extrabold leading-[1] tracking-[-3px] sm:text-6xl lg:text-7xl">
            From emergency
            <br />
            to{" "}
            <span className="text-[#d9ff4f]">
              resolution.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-gray-400">
            Origin simplifies disaster response by connecting every
            stage of the relief process through one coordinated network.
          </p>

        </div>

        {/* Process */}
        <div className="relative mt-20">

          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-[#d9ff4f]/40 to-transparent xl:block" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >

                  {/* Number */}
                  <div className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#d9ff4f]/40 bg-[#0b1713] font-['Manrope'] text-sm font-extrabold text-[#d9ff4f] transition duration-300 group-hover:scale-110 group-hover:bg-[#d9ff4f] group-hover:text-[#0b1713]">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="mt-6 min-h-[310px] rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md transition duration-300 group-hover:-translate-y-2 group-hover:border-[#d9ff4f]/40 group-hover:bg-white/[0.08]">

                    {/* Icon */}
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#d9ff4f] text-[#08120e]">
                      <Icon size={21} strokeWidth={2} />
                    </div>

                    {/* Step Label */}
                    <p className="mt-7 text-[9px] font-bold tracking-[2px] text-[#d9ff4f]">
                      STEP {step.number}
                    </p>

                    <h3 className="mt-2 font-['Manrope'] text-2xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-xs leading-6 text-gray-400">
                      {step.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-gray-500 transition group-hover:text-[#d9ff4f]">
                      LEARN MORE
                      <ArrowRight size={13} />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-6 backdrop-blur-md md:flex-row">

          <div>
            <p className="text-sm font-bold">
              Every second matters during a disaster.
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Origin helps move the right resources to the right place.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-[#d9ff4f] px-6 py-3 text-xs font-bold text-[#08120e] transition hover:-translate-y-1">
            Start a Response
            <ArrowRight size={14} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;