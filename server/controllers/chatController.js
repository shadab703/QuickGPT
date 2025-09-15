import Chat from "../models/chat.js";

// API controller for creating a New Chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };
    await Chat.create(chatData);
    res.json({ success: true, message: "Chat Created Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API controller for getting all chats
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.json({ success: true, chats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// API controller for deleting chats
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;
    await Chat.deleteOne({ _id: chatId, userId });
    res.json({ success: true, message: "Chat Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
