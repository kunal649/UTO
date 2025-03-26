import { useState, useEffect, useRef } from "react";
import axios from "axios";

function AudioCommunitySection() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [stories, setStories] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);

  // Custom toast function
  const showNotification = (title, description, status = "info") => {
    setNotification({ title, description, status });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // AI voice options
  const aiVoices = [
    { id: "voice1", name: "Neutral Voice", gender: "neutral" },
    { id: "voice2", name: "Female Voice 1", gender: "female" },
    { id: "voice3", name: "Male Voice 1", gender: "male" },
    { id: "voice4", name: "Child Voice", gender: "child" },
  ];
  const [selectedVoice, setSelectedVoice] = useState(aiVoices[0].id);

  // Fetch stories from the backend
  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/v1/stories");
      setStories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching stories:", error);
      setStories([]);
      showNotification(
        "Error",
        "Failed to load stories. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      showNotification(
        "Recording started",
        "Share your experience. Your voice will be anonymized.",
        "info"
      );
    } catch (error) {
      console.error("Error accessing microphone:", error);
      showNotification(
        "Error",
        "Could not access microphone. Please check permissions.",
        "error"
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async () => {
    if (!audioBlob) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("voiceId", selectedVoice);

      const response = await axios.post(
        "http://localhost:5000/v1/process-audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add new story to the list
      setStories([response.data, ...stories]);
      setAudioBlob(null);

      showNotification(
        "Success!",
        "Your story has been processed and shared anonymously.",
        "success"
      );
    } catch (error) {
      console.error("Error processing audio:", error);
      showNotification(
        "Error",
        "Failed to process audio. Please try again.",
        "error"
      );
    } finally {
      setProcessing(false);
    }
  };

  const playAudio = async (storyId) => {
    try {
      if (storyId === currentlyPlaying) {
        audioPlayerRef.current?.pause();
        setCurrentlyPlaying(null);
        return;
      }

      const story = stories.find((s) => s._id === storyId);
      if (!story?.audioUrl) {
        showNotification("Error", "Audio not available", "error");
        return;
      }

      // Create a new audio element for playing the story's audio
      const audioElement = new Audio(story.audioUrl);
      audioElement.onended = () => setCurrentlyPlaying(null);
      audioElement.onerror = () => {
        showNotification("Error", "Failed to play audio", "error");
        setCurrentlyPlaying(null);
      };

      // Play the audio
      audioPlayerRef.current = audioElement;
      audioElement.play();
      setCurrentlyPlaying(storyId);

      showNotification(
        "Playing audio",
        `Now playing: ${story.title} with ${
          aiVoices.find((v) => v.id === story.voiceId)?.name ||
          "Anonymous Voice"
        }`,
        "info"
      );
    } catch (error) {
      console.error("Error playing audio:", error);
      showNotification("Error", "Failed to play audio", "error");
    }
  };

  const likeStory = async (storyId) => {
    try {
      await axios.post(`http://localhost:5000/v1/stories/${storyId}/like`);
      setStories(
        stories.map((story) =>
          story._id === storyId ? { ...story, likes: story.likes + 1 } : story
        )
      );
    } catch (error) {
      console.error("Error liking story:", error);
      showNotification("Error", "Failed to like story", "error");
    }
  };

  const filterStories = (stories) => {
    if (!Array.isArray(stories)) return [];
    if (selectedFilter === "all") return stories;
    return stories.filter((story) => story.category === selectedFilter);
  };

  // Get notification style based on status
  const getNotificationClasses = (status) => {
    const baseClasses =
      "fixed top-5 right-5 z-50 max-w-sm rounded shadow-lg p-3 text-white";
    if (status === "error") return `${baseClasses} bg-red-500`;
    if (status === "success") return `${baseClasses} bg-green-500`;
    return `${baseClasses} bg-blue-500`;
  };

  const filteredStories = filterStories(stories);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Notification display */}
      {notification && (
        <div className={getNotificationClasses(notification.status)}>
          <div className="font-bold mb-1">{notification.title}</div>
          <div className="text-sm">{notification.description}</div>
        </div>
      )}

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">
          Voice of Change: Anonymous Audio Community
        </h1>
        <p className="text-lg text-gray-600">
          Share your experiences, listen to others, and break the silence around
          taboos
        </p>
      </div>

      {/* Recording Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
        <p className="mb-4">
          Record your voice and we&apos;ll convert it to an anonymous AI voice
          to protect your identity
        </p>

        <select
          className="w-full p-2 rounded border border-gray-300 mb-4"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          disabled={isRecording || processing}
        >
          {aiVoices.map((voice) => (
            <option key={voice.id} value={voice.id}>
              {voice.name}
            </option>
          ))}
        </select>

        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <button
              className="px-4 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-50"
              onClick={startRecording}
              disabled={processing}
            >
              🎙️ Start Recording
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
              onClick={stopRecording}
            >
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        {audioBlob && (
          <div className="flex flex-col items-center mt-4">
            <audio
              ref={audioPlayerRef}
              controls
              src={URL.createObjectURL(audioBlob)}
              className="w-full mt-4"
            />
            <button
              className="px-4 py-2 rounded bg-teal-500 text-white font-medium hover:bg-teal-600 disabled:opacity-50 mt-4"
              onClick={processAudio}
              disabled={processing}
            >
              {processing ? "Processing..." : "Process and Share Anonymously"}
            </button>
          </div>
        )}
      </div>

      {/* Browse Stories Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Community Stories</h3>
          <select
            className="w-48 p-2 rounded border border-gray-300"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="menstruation">Menstruation</option>
            <option value="mental-health">Mental Health</option>
            <option value="reproductive-health">Reproductive Health</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredStories.map((story) => (
            <div
              key={story._id}
              className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-teal-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold">{story.title}</h4>
                <span className="px-2 py-1 rounded-full text-sm bg-teal-50 text-teal-600">
                  {story.category}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Shared from {story.location} •{" "}
                {new Date(story.recordedAt).toLocaleDateString()} • Using{" "}
                {aiVoices.find((v) => v.id === story.voiceId)?.name ||
                  "Anonymous Voice"}
              </p>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                    onClick={() => playAudio(story._id)}
                  >
                    {currentlyPlaying === story._id ? "⏸️ Pause" : "▶️ Listen"}{" "}
                    ({story.duration})
                  </button>

                  <button
                    className="px-3 py-1 hover:text-gray-600"
                    onClick={() => likeStory(story._id)}
                  >
                    👍 {story.likes}
                  </button>

                  <button className="px-3 py-1 hover:text-gray-600">
                    💬 {story.comments}
                  </button>
                </div>

                {story.audioUrl && (
                  <audio controls src={story.audioUrl} className="w-full h-8" />
                )}
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="bg-gray-50 p-3 rounded">
                <h5 className="font-bold mb-2">Transcription</h5>
                <p className="text-sm">{story.transcription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AudioCommunitySection;
