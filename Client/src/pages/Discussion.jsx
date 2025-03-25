import { useState, useEffect, useRef } from "react";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
  },
  mainTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#718096",
  },
  card: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "32px",
  },
  subHeading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "16px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    fontWeight: "500",
    cursor: "pointer",
  },
  redButton: {
    backgroundColor: "#E53E3E",
    color: "white",
  },
  grayButton: {
    backgroundColor: "#CBD5E0",
    color: "black",
  },
  tealButton: {
    backgroundColor: "#319795",
    color: "white",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #E2E8F0",
    marginBottom: "16px",
  },
  storyCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    borderLeft: "4px solid #319795",
    marginBottom: "16px",
  },
  storyHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  storyTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: "#E6FFFA",
    color: "#319795",
    padding: "2px 8px",
    borderRadius: "9999px",
    fontSize: "0.8rem",
  },
  metaText: {
    fontSize: "0.875rem",
    color: "#718096",
    marginBottom: "12px",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  outlineButton: {
    backgroundColor: "transparent",
    border: "1px solid #CBD5E0",
    padding: "4px 12px",
    borderRadius: "4px",
    fontSize: "0.875rem",
  },
  ghostButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: "4px 12px",
    fontSize: "0.875rem",
  },
  divider: {
    margin: "12px 0",
    border: "none",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  },
  transcriptBox: {
    backgroundColor: "#F7FAFC",
    padding: "12px",
    borderRadius: "4px",
  },
  transcriptTitle: {
    fontSize: "0.875rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  notification: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "9999",
    maxWidth: "300px",
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "12px",
    color: "white",
  },
  infoNotification: {
    backgroundColor: "#3182CE",
  },
  successNotification: {
    backgroundColor: "#38A169",
  },
  errorNotification: {
    backgroundColor: "#E53E3E",
  },
  notificationTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  notificationText: {
    fontSize: "0.875rem",
  },
};

function AudioCommunitySection() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [stories, setStories] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [notification, setNotification] = useState(null);

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

  // Mock AI voice options , we'll update these by our own
  const aiVoices = [
    { id: "voice1", name: "Neutral Voice", gender: "neutral" },
    { id: "voice2", name: "Female Voice 1", gender: "female" },
    { id: "voice3", name: "Male Voice 1", gender: "male" },
    { id: "voice4", name: "Child Voice", gender: "child" },
  ];
  const [selectedVoice, setSelectedVoice] = useState(aiVoices[0].id);

  // Mock stories data (would be fetched from API in real app)
  const mockStories = [
    {
      id: 1,
      title: "Overcoming Menstruation Taboo",
      recordedAt: new Date(Date.now() - 86400000 * 2),
      category: "menstruation",
      location: "Delhi",
      audioUrl: "https://example.com/audio1.mp3", // Placeholder
      transcription:
        "Growing up, menstruation was never discussed in my house. When I got my first period, I was scared and confused. My mother only gave me some cloth pads and told me not to talk about it. I wasn't allowed to enter the kitchen or temple during those days. As I grew older, I educated myself about menstrual hygiene and started challenging these taboos in my family.",
      likes: 42,
      comments: 15,
      voiceId: "voice2",
      duration: "2:48",
    },
    {
      id: 2,
      title: "Mental Health Journey",
      recordedAt: new Date(Date.now() - 86400000 * 5),
      category: "mental-health",
      location: "Mumbai",
      audioUrl: "https://example.com/audio2.mp3", // Placeholder
      transcription:
        "I struggled with depression for years in silence. In our community, mental health issues are seen as a weakness or character flaw. Seeking therapy was one of the hardest decisions I made because I worried about the judgment from family members. But after getting proper treatment, I started speaking openly about my journey, which inspired others in my community to seek help too.",
      likes: 36,
      comments: 8,
      voiceId: "voice3",
      duration: "3:15",
    },
    {
      id: 3,
      title: "Breaking the Silence on Infertility",
      recordedAt: new Date(Date.now() - 86400000 * 12),
      category: "reproductive-health",
      location: "Bangalore",
      audioUrl: "https://example.com/audio3.mp3", // Placeholder
      transcription:
        "After five years of marriage, I faced constant pressure and questioning about when we would have a child. No one considered that we might be struggling with infertility, which is rarely discussed openly. My husband and I went through treatments secretly at first. Eventually, I decided to share our journey, and was surprised by how many others were going through similar experiences in silence.",
      likes: 58,
      comments: 27,
      voiceId: "voice2",
      duration: "4:10",
    },
  ];
  useEffect(() => {
    // In a real app, we'll fetch stories from API
    setStories(mockStories);
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

  const processAudio = () => {
    //      Server Side Work
    // In a real app, this would:
    // 1. Upload the audio to the server
    // 2. Process it for transcription
    // 3. Convert to an AI voice
    // 4. Save to database

    setProcessing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const newStory = {
        id: stories.length + 1,
        title: "My Personal Experience",
        recordedAt: new Date(),
        category: "general",
        location: "User Location",
        audioUrl: URL.createObjectURL(audioBlob), // In real app, this would be a server URL
        transcription:
          "This is a simulated transcription of the recorded audio. In a real application, this would be generated through speech-to-text technology and the audio would be converted using AI voice for anonymity.",
        likes: 0,
        comments: 0,
        voiceId: selectedVoice,
        duration: "0:30",
      };

      setStories([newStory, ...stories]);
      setAudioBlob(null);
      setProcessing(false);

      showNotification(
        "Success!",
        "Your story has been processed and shared anonymously.",
        "success"
      );
    }, 2000);
  };

  const playAudio = (storyId) => {
    // In a real app, this would play the actual audio file
    setCurrentlyPlaying(storyId === currentlyPlaying ? null : storyId);

    if (audioPlayerRef.current) {
      if (storyId === currentlyPlaying) {
        audioPlayerRef.current.pause();
      } else {
        // Simulate playing a different audio file
        const story = stories.find((s) => s.id === storyId);
        if (story && story.audioUrl) {
          // In a real implementation, audioPlayerRef would be set to the actual audio element
          showNotification(
            "Playing audio",
            `Now playing: ${story.title} with ${
              aiVoices.find((v) => v.id === story.voiceId)?.name ||
              "Anonymous Voice"
            }`,
            "info"
          );
        }
      }
    }
  };

  const likeStory = (storyId) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, likes: story.likes + 1 } : story
      )
    );
  };

  const filterStories = (stories) => {
    if (selectedFilter === "all") return stories;
    return stories.filter((story) => story.category === selectedFilter);
  };

  // Get notification style based on status
  const getNotificationStyle = (status) => {
    if (status === "error")
      return { ...styles.notification, ...styles.errorNotification };
    if (status === "success")
      return { ...styles.notification, ...styles.successNotification };
    return { ...styles.notification, ...styles.infoNotification };
  };

  return (
    <div style={styles.container}>
      {/* Notification display */}
      {notification && (
        <div style={getNotificationStyle(notification.status)}>
          <div style={styles.notificationTitle}>{notification.title}</div>
          <div style={styles.notificationText}>{notification.description}</div>
        </div>
      )}

      <div style={styles.heading}>
        <h1 style={styles.mainTitle}>
          Voice of Change: Anonymous Audio Community
        </h1>
        <p style={styles.subtitle}>
          Share your experiences, listen to others, and break the silence around
          taboos
        </p>
      </div>

      {/* Recording Section */}
      <div style={styles.card}>
        <h3 style={styles.subHeading}>Share Your Experience</h3>
        <p>
          Record your voice and we&apos;ll convert it to an anonymous AI voice
          to protect your identity
        </p>

        <select
          style={styles.select}
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

        <div style={styles.flexCenter}>
          {!isRecording ? (
            <button
              style={{ ...styles.button, ...styles.redButton }}
              onClick={startRecording}
              disabled={processing}
            >
              🎙️ Start Recording
            </button>
          ) : (
            <button
              style={{ ...styles.button, ...styles.grayButton }}
              onClick={stopRecording}
            >
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        {audioBlob && (
          <div style={{ ...styles.flexCenter, flexDirection: "column" }}>
            <audio
              ref={audioPlayerRef}
              controls
              src={URL.createObjectURL(audioBlob)}
              style={{ marginTop: "16px", width: "100%" }}
            />
            <button
              style={{
                ...styles.button,
                ...styles.tealButton,
                marginTop: "16px",
              }}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3 style={styles.subHeading}>Community Stories</h3>
          <select
            style={{ ...styles.select, width: "200px", marginBottom: 0 }}
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

        <div>
          {filterStories(stories).map((story) => (
            <div key={story.id} style={styles.storyCard}>
              <div style={styles.storyHeader}>
                <h4 style={styles.storyTitle}>{story.title}</h4>
                <span style={styles.badge}>{story.category}</span>
              </div>

              <p style={styles.metaText}>
                Shared from {story.location} • {story.recordedAt.toDateString()}{" "}
                • Using{" "}
                {aiVoices.find((v) => v.id === story.voiceId)?.name ||
                  "Anonymous Voice"}
              </p>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.outlineButton}
                  onClick={() => playAudio(story.id)}
                >
                  {currentlyPlaying === story.id ? "⏸️ Pause" : "▶️ Listen"} (
                  {story.duration})
                </button>

                <button
                  style={styles.ghostButton}
                  onClick={() => likeStory(story.id)}
                >
                  👍 {story.likes}
                </button>

                <button style={styles.ghostButton}>💬 {story.comments}</button>
              </div>

              <hr style={styles.divider} />

              <div style={styles.transcriptBox}>
                <h5 style={styles.transcriptTitle}>Transcription</h5>
                <p style={{ fontSize: "0.875rem" }}>{story.transcription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AudioCommunitySection;
