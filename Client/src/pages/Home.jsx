import "../App.css";
import "../index.css";

export default function Home() {
  return (
    <div className="itshome">
      {/* Section 1 */}
      <section className="relative h-screen opacity-90 flex items-center justify-center">
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

        {/* Chatbot Button */}
        <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
          <button
            onClick={() => {
              // ChatBOT onclick logic
            }}
            aria-label="Chat with us"
          >
            <i className="fa fa-comment" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      {/* Section 2 */}
      <section className="h-192 bg-center bg-cover bg-white flex flex-col items-start justify-center text-center snap-start pt-16"></section>

      {/* Section 3 */}
      <section className="h-screen bg-center bg-cover flex items-start justify-start text-center ">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 h-full w-full object-cover opacity-50 z-0"
        >
          <source src="your-video-url.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Section */}
        <div className="mt-22  text-gray-800 flex-col z-10">
          <h2 className="text-7xl font-bold md:text-5xl">
            Podcasts and Content
          </h2>
        </div>

        {/* Black Strip with Videos */}

        {/* Video Thumbnails with Hover Effects */}
      </section>

      {/* Section 4 */}
      <section className="h-screen bg-center bg-cover bg-gray-600 flex items-center justify-center text-center snap-start">
        <div className="text-gray-800">
          <h2 className="text-3xl font-bold md:text-5xl">Join the Community</h2>
          <p className="mt-4 text-lg md:text-xl">
            Connect with others, share your story, and break the silence around
            womens health.
          </p>
          <a
            href="#community"
            className="mt-8 inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition duration-300"
          >
            Join Us
          </a>
        </div>
      </section>
    </div>
  );
}
