require("dotenv").config();
const http = require("http");
const { connectDB } = require("./services/mongo"); // Import database connection
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Ensure database connects before starting the server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to start server due to DB error:", err);
});
