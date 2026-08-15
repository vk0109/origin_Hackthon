import { useState } from "react";
import { Play, X, Quote, ArrowUpRight } from "lucide-react";

function Reviews() {
  const [selected, setSelected] = useState(null);

  const media = [
  {
    type: "image",
    src: "https://images.pexels.com/photos/36072012/pexels-photo-36072012.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Flood Rescue",
  },

  {
    type: "image",
    src: "https://images.pexels.com/photos/15861617/pexels-photo-15861617.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Earthquake Response",
  },

  {
    type: "image",
    src: "https://images.pexels.com/photos/8553522/pexels-photo-8553522.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Wildfire Response",
  },

  {
    type: "image",
    src: "https://images.pexels.com/photos/14000781/pexels-photo-14000781.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Landslide Recovery",
  },

  {
    type: "image",
    src: "https://images.pexels.com/photos/12917380/pexels-photo-12917380.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Fire Response",
  },

  {
    type: "image",
    src: "https://images.pexels.com/photos/16250499/pexels-photo-16250499.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Drought Impact",
  },
];
  const row1 = [...media, ...media];
  const row2 = [...media.slice(3), ...media, ...media.slice(0, 3)];

  const Card = ({ item }) => (
    <button
      onClick={() => setSelected(item)}
      className="group relative h-[260px] w-[360px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1511] text-left"
    >
      <img
        src={item.src}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute bottom-5 left-5">
        <p className="text-[9px] font-bold tracking-[2px] text-[#d9ff4f]">
          RESQ FIELD STORY
        </p>

        <h3 className="mt-1 text-xl font-bold text-white">
          {item.title}
        </h3>
      </div>
    </button>
  );

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#06100c] py-32 text-white"
    >
      {/* Animation */}
      <style>{`
        @keyframes driftLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes driftRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .drift-left {
          animation: driftLeft 45s linear infinite;
        }

        .drift-right {
          animation: driftRight 55s linear infinite;
        }

        .drift-left:hover,
        .drift-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">

          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d9ff4f]" />

            <span className="text-xs font-bold tracking-[3px] text-[#d9ff4f]">
              COMMUNITY STORIES
            </span>
          </div>

          <h2 className="font-['Manrope'] text-5xl font-extrabold leading-[0.95] tracking-[-3px] md:text-7xl">
            Stories from
            <br />
            <span className="text-[#d9ff4f]">
              the field.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400">
            Real moments from volunteers, response teams and
            communities working together during emergencies.
          </p>

        </div>
      </div>

      {/* Drift Wall */}
      <div className="relative mt-20 overflow-hidden">

        {/* Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-[#06100c] to-transparent" />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-l from-[#06100c] to-transparent" />

        {/* Row 1 */}
        <div className="drift-left flex w-max gap-5">
          {row1.map((item, index) => (
            <Card
              key={`one-${index}`}
              item={item}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="drift-right mt-5 flex w-max gap-5">
          {row2.map((item, index) => (
            <Card
              key={`two-${index}`}
              item={item}
            />
          ))}
        </div>

      </div>

      {/* Reviews */}
      <div className="mx-auto mt-32 max-w-7xl px-6">

        <div className="mb-14">
          <p className="text-xs font-bold tracking-[3px] text-[#d9ff4f]">
            VOICES OF RESQ
          </p>

          <h3 className="mt-5 text-5xl font-extrabold tracking-[-3px] md:text-6xl">
            What people
            <br />
            <span className="text-[#d9ff4f]">
              say about us.
            </span>
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {[
            [
              "Field Volunteer",
              "Emergency Response",
              "ResQ helps us coordinate emergency response faster and understand where help is needed.",
            ],
            [
              "Relief Coordinator",
              "Partner Organization",
              "Connecting requests, volunteers and resources in one place makes disaster coordination easier.",
            ],
            [
              "Community Member",
              "Affected Community",
              "The platform provides a simple way for communities to communicate their needs during emergencies.",
            ],
          ].map(([name, role, text]) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#d9ff4f]/30"
            >
              <Quote
                size={24}
                className="text-[#d9ff4f]"
              />

              <p className="mt-6 text-sm leading-7 text-gray-400">
                "{text}"
              </p>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-bold">
                  {name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-24 max-w-7xl px-6">

        <div className="rounded-3xl bg-[#d9ff4f] p-10 text-[#07110d] md:p-14">

          <p className="text-xs font-bold tracking-[3px]">
            SHARE YOUR EXPERIENCE
          </p>

          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <h3 className="max-w-2xl text-4xl font-extrabold tracking-[-2px] md:text-5xl">
              Every response creates a story worth sharing.
            </h3>

            <button className="flex w-fit items-center gap-2 rounded-lg bg-[#07110d] px-6 py-3.5 text-xs font-bold text-white">
              Share Your Story
              <ArrowUpRight size={15} />
            </button>

          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10"
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>

          <img
            src={selected.src}
            alt={selected.title}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default Reviews;