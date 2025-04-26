import React, { useEffect, useState, useRef } from "react";
import API from "../../services/API";
import { io } from "socket.io-client";
import Layout from "../../components/shared/Layout/Layout";
import TableForPatientDetails from "../../components/shared/tables/TableForPatientDetails";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const PatientList = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Added searchTerm state
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("localhost:8080");
    setSocket(newSocket);
    if (user) {
      newSocket.emit("join", { userId: user._id, userType: "donar" });
    }
    return () => newSocket.disconnect();
  }, [user]);

  // Fetch patient data
  const getPatientData = async () => {
    try {
      const response = await API.get("/patient/patient-list");
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  // Fetch chat history
  const fetchChatHistory = async (patientId) => {
    try {
      const { data } = await API.get(
        `/chats/${user._id}?contactId=${patientId}`
      );
      if (data?.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Handle notifications and messages
  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (message) => {
        setMessages((prev) => [...prev, message]);
      };

      const handleReceiveNotification = (notification) => {
        toast.info(notification.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      };

      const handleTyping = (typingUser) => {
        if (typingUser === chat?._id) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      };

      // Attach listeners
      socket.on("receiveMessage", handleReceiveMessage);
      socket.on("receiveNotification", handleReceiveNotification);
      socket.on("typing", handleTyping);

      // Cleanup listeners on component unmount or re-render
      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.off("receiveNotification", handleReceiveNotification);
        socket.off("typing", handleTyping);
      };
    }
  }, [socket, chat]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get("chat");
    if (chatId && data.length > 0) {
      const targetChat = data.find((item) => item._id === chatId);
      if (targetChat) {
        setChat(targetChat);
        fetchChatHistory(chatId);
      }
    }
  }, [data]);

  // Send a new message and save it to the backend
  const handleSendMessage = async () => {
    if (socket && chat && newMessage.trim()) {
      const messageData = {
        senderId: user._id,
        senderName: user.name,
        recipientId: chat._id,
        message: newMessage,
        userType: user.role.toLowerCase(), // Add this line (ensure 'donar' becomes 'donor')
        timestamp: new Date().toISOString(),
      };

      try {
        await API.post("/chats", messageData);
        socket.emit("sendMessage", messageData);
        setMessages((prev) => [...prev, { ...messageData, status: "sent" }]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:pl-64">
          <h1 className="flex mt-8 items-center text-black mb-2 justify-center font-serif text-6xl font-bold mx-8 py-2 rounded-lg">
            Welcome Donar {user?.name}
          </h1>
          <TableForPatientDetails
            data={data}
            list={"Patient List"}
            onMessageClick={(patient) => {
              setChat(patient);
              fetchChatHistory(patient._id);
            }}
          />
          {chat && (
            <div className="fixed bottom-0 right-0 w-[400px] h-[600px] bg-gray-100 shadow-lg rounded-lg flex flex-col">
              <div className="flex items-center justify-between p-4 bg-white rounded-t-lg border-b">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://api.dicebear.com/6.x/lorelei/svg?seed=Felix"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{chat.name.slice(0, 5)}</h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mr-2"
                  />
                  <button
                    onClick={() => setChat(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <IoMdClose className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages
                  .filter((msg) =>
                    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.senderId === user._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.senderId === user._id
                            ? "bg-white text-black"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        <div className="text-xs opacity-70 mb-1">
                          {msg.senderName} -{" "}
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                {isTyping && (
                  <div className="text-left text-gray-500 text-sm">
                    {chat.name} is typing...
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-4 bg-white rounded-b-lg border-t"
              >
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaSmile className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaPaperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      socket.emit("typing", chat._id);
                    }}
                    placeholder="Message Here!"
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <button
                    type="submit"
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    disabled={!newMessage.trim()}
                  >
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PatientList;
