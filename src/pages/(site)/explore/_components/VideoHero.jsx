import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const VideoHero = () => {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const handleShowVideo = () => {
    setShowVideo(!showVideo);
    setIsPlaying(true);
  };
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video auto play failed:", err));
      setIsPlaying(true);
    }
  }, [showVideo]);

  const togglePlay = () => {
    if (videoRef?.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section>
      {showVideo ? (
        <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            muted
            loop
            playsInline
          >
            <source src="/hybrid.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40 z-0"></div>

          <div className="relative z-10 text-center text-white px-4 flex flex-col items-center gap-4">
            <div
              className="bg-white/85 hover:bg-white transition-all duration-300 rounded-full cursor-pointer w-20 h-20 flex justify-center items-center shadow-lg hover:scale-105"
              onClick={togglePlay}
            >
              <div className="bg-main/10 rounded-full w-16 h-16 flex justify-center items-center">
                {isPlaying ? (
                  <FaPause size={20} className="text-main" />
                ) : (
                  <FaPlay size={20} className="text-main ml-0.5" />
                )}
              </div>
            </div>
            <span className="text-white/95 font-medium text-xs tracking-widest uppercase">
              {isPlaying ? "Pause Video Tour" : "Resume Video Tour"}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center hero3 text-center px-4">
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight uppercase font-poppins">
              Explore Our Paradise
            </h1>
            <p className="text-white/95 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
              Take a virtual walkthrough of Hybrid Hotel & Suites. Experience our luxury rooms, modern amenities, and world-class hospitality first-hand.
            </p>

            <div
              className="relative mt-4 bg-white/90 hover:bg-white transition-all duration-300 rounded-full cursor-pointer w-24 h-24 flex justify-center items-center shadow-lg hover:scale-105 group"
              onClick={handleShowVideo}
            >
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping group-hover:animate-none"></div>
              <div className="relative bg-main/10 rounded-full w-20 h-20 flex justify-center items-center">
                <FaPlay size={24} className="text-main ml-1 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <span className="text-white/80 uppercase tracking-widest text-xs font-semibold mt-2">
              Play Video Tour
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoHero;
