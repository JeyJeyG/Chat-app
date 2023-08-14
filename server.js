const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    console.log("New WebSocket connection established.");

    ws.on("message", message => {
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});
if (socket.readyState === WebSocket.OPEN) {
    // Send the message
    socket.send(message);
} else {
    console.error("WebSocket is not open.");
}
