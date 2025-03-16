import "../../App.css";
import "../../index.css";
import { useRef, useEffect } from "react";

export default function Home() {
  const section3Ref = useRef(null);
  const cursorLightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!section3Ref.current || !cursorLightRef.current) return;

      const rect = section3Ref.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        cursorLightRef.current.style.setProperty("--x", `${e.clientX}px`);
        cursorLightRef.current.style.setProperty("--y", `${e.clientY}px`);
        cursorLightRef.current.style.opacity = "1";
      } else {
        cursorLightRef.current.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Section - 10% taller than viewport */}
      <section className="relative h-[130vh] flex items-center justify-center">
        {/* Video Container */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/home.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay Stack */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-white via-white/2 to-transparent backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center text-white">
          <h1 className="text-6xl md:text-9xl font-Jingle text-indigo-900 animate-fadeInH1 drop-shadow-lg">
            Untaboo.
          </h1>
          <p className="mt-2 md:mt-2 ml-[26%] text-lg uppercase tracking-[0.35em] md:text-xl text-gray-600 animate-fadeInP">
            Because health has no shame
          </p>
        </div>
      </section>

      {/* SECTION 2*/}
      <section className="relative justify-center flex items-center bg-white">
        {/* Extended Transition Connector */}

        <div className="relative items-center z-30 min-h-screen pt-[100px]">
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-gray-800">
              "Breaking barriers,{" "}
              <span className="font-medium text-indigo-600">
                one conversation
              </span>{" "}
              at a time.
              <br />
              Because <span className="italic">every body</span> deserves
              <br />
              <span className="font-medium">
                understanding, care, and respect.
              </span>
              "
            </h2>
            <p className="mt-8 text-lg text-gray-500">- Untaboo Team</p>
          </div>
        </div>
      </section>

      {/* SECTION 3*/}
      <section
        ref={section3Ref}
        className="relative min-h-screen bg-indigo-900 rounded-t-[100px] overflow-hidden"
      >
        {/* Cursor Light Effect */}
        <div
          ref={cursorLightRef}
          className="fixed pointer-events-none w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
          style={{
            left: "var(--x, 0)",
            top: "var(--y, 0)",
            background:
              "radial-gradient(circle at center, rgba(240, 238, 238, 0.91) 0%, transparent 60%)",
            filter: "blur(30px)",
          }}
        />
        {/* Content to be added*/}
      </section>
    </div>
  );
}
