require("dotenv").config();
const http = require("http");
const { connectDB } = require("./services/mongo");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
