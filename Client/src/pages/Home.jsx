import "../App.css";
import "../index.css";

export default function Home() {
  return (
    <div className="itshome relative min-h-screen overflow-hidden">
      {/* Section 1 */}
      <section className="relative h-screen opacity-90 flex items-center justify-center z-10">
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src="/assets/home.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
        />

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
    </div>
  );
}
