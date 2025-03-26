const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary (free tier)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class AIService {
  async transcribeAudio(audioFile) {
    // In a real implementation, this would use the Web Speech API on the client side
    // For now, we'll return a placeholder
    return "This is a placeholder transcription. In the actual implementation, this would be handled by the Web Speech API in the browser.";
  }

  async cleanTranscription(text) {
    // Simple text cleaning without OpenAI
    return text
      .replace(/[^\w\s.,!?-]/g, "") // Remove special characters
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();
  }

  async convertToAIVoice(audioFile, voiceId) {
    // In a real implementation, this would use the Web Speech API's synthesis
    // For now, we'll return the original audio file
    return fs.readFileSync(audioFile);
  }

  getVoiceGender(voiceId) {
    const voiceMap = {
      voice1: "NEUTRAL",
      voice2: "FEMALE",
      voice3: "MALE",
      voice4: "CHILD",
    };
    return voiceMap[voiceId] || "NEUTRAL";
  }

  async uploadToCloud(audioPath) {
    try {
      // Create a Promise to handle the upload stream
      return new Promise((resolve, reject) => {
        // For a file path, create a read stream and upload
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "untaboo-audio",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        // Create a readable stream from the file path
        fs.createReadStream(audioPath).pipe(stream);
      });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  }

  async generateTitle(transcription) {
    // Simple title generation without AI
    const words = transcription.split(" ");
    const firstSentence = words.slice(0, 5).join(" ");
    return `${firstSentence}...`;
  }

  async detectCategory(text) {
    // Simple category detection using keywords
    const keywords = {
      menstruation: ["period", "menstrual", "pad", "sanitary", "flow"],
      "mental-health": ["depression", "anxiety", "stress", "therapy", "mental"],
      "reproductive-health": [
        "pregnancy",
        "birth",
        "reproductive",
        "fertility",
        "childbirth",
      ],
    };

    const textLower = text.toLowerCase();
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some((word) => textLower.includes(word))) {
        return category;
      }
    }
    return "general";
  }
}

module.exports = new AIService();
