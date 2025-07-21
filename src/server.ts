import { startWeatherApiServer } from "./api/weatherApiServer";

async function startServer(): Promise<void> {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    console.log("Received SIGTERM, shutting down gracefully...");
    process.exit(0);
  });

  process.on("SIGINT", () => {
    console.log("Received SIGINT, shutting down gracefully...");
    process.exit(0);
  });

  startWeatherApiServer(port);
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
