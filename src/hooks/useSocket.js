import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://mvcfolder-api.onrender.com"; 

export const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    const loadMessagesFromLocalStorage = () => {
        const savedMessages = localStorage.getItem("messages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    };

    const saveMessagesToLocalStorage = (messages) => {
        localStorage.setItem("messages", JSON.stringify(messages));
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const userId = userData ? JSON.parse(userData)._id : null;
        if (!userId) return;

        const newSocket = io(SOCKET_SERVER_URL, {
            query: { userId },
        });

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket");
        });

        newSocket.on("receiveMessage", (message) => {
            setMessages((prev) => {
                const updatedMessages = [...prev, message];
                saveMessagesToLocalStorage(updatedMessages);
                return updatedMessages;
            });
        });

        setMessages(loadMessagesFromLocalStorage());

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = (text) => {
        if (socket) {
            const userData = localStorage.getItem("user");
            const user = JSON.parse(userData);
            const userId = user._id;
            const userNickname = user.nickname; 
            const message = { sender: userId, nickname: userNickname, text };
            socket.emit("sendMessage", message);
        }
    };
    

    return { messages, sendMessage };
};
