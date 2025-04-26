const express = require("express");
const Chat = require("../models/Chat");

const router = express.Router();

// POST method to save a new chat message
router.post("/", async (req, res) => {
  const { senderId, senderName, recipientId, message } = req.body;

  if (!senderId || !recipientId || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const chatMessage = new Chat({
      senderId,
      senderName,
      recipientId,
      message,
      timestamp: new Date(),
    });

    const savedMessage = await chatMessage.save();
    res.status(201).json({ success: true, data: savedMessage });
  } catch (error) {
    console.error("Error saving chat message:".red, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET method to retrieve chat history
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { contactId } = req.query;

  if (!contactId) {
    return res
      .status(400)
      .json({ success: false, message: "Contact ID is required" });
  }

  try {
    const chats = await Chat.find({
      $or: [
        { senderId: userId, recipientId: contactId },
        { senderId: contactId, recipientId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    console.error("Error fetching chat history:".red, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
