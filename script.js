const socket = new WebSocket('ws://localhost:3000');  // WebSocket connection to the server

socket.onopen = () => {
    console.log('Connected to the server');
};

socket.onmessage = (event) => {
    let messageText;

    // Check if the received message is a Blob (not a string)
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
            messageText = reader.result;  // This will be the text content of the Blob
            displayMessage(messageText);  // Display the message
        };
        reader.readAsText(event.data);  // Read the Blob as text
    } else {
        // If it's already a string, just display it
        messageText = event.data;
        displayMessage(messageText);
    }
};

// Function to display messages in the chat window
function displayMessage(messageText) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = messageText;
    document.getElementById('messages').appendChild(messageDiv);

    // Scroll to the bottom of the messages
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;

    if (messageText.trim() !== '') {
        // Send the message to the WebSocket server
        socket.send(messageText);

        // Clear the input field
        messageInput.value = '';

        // Scroll to the bottom of the messages
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    }
});
