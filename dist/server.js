"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weatherApiServer_1 = require("./api/weatherApiServer");
async function startServer() {
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
    (0, weatherApiServer_1.startWeatherApiServer)(port);
}
if (require.main === module) {
    startServer().catch((error) => {
        console.error("Failed to start server:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=server.js.map