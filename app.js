document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Connect to WebSocket
    const socket = new WebSocket("ws://localhost:3000");

    // Send button Event Listener
    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();

        if (socket.readyState === WebSocket.OPEN) {
            // Send message to server
            socket.send(message);
            messageInput.value = "";
        } else {
            console.error("WebSocket is not open.");
        }
    });

    // Adding event Listener for incoming messages
    socket.addEventListener("message", event => {
        const message = event.data;

        // Append message to chat
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Event listener for WebSocket Errors
    socket.addEventListener("error", event => {
        console.error("WebSocket error:", event);
    });

    // Event listener for WebSocket Closure
    socket.addEventListener("close", event => {
        console.log("WebSocket closed with code:", event.code);
        // Handle any cleanup or reconnection logic here.
    });
});
