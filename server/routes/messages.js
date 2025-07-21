const express = require("express");
const router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");

router.get("/", (req, res) => {
  Message.find()
    .populate("sender")
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", async (req, res) => {
  try {
    const maxMessageId = await sequenceGenerator.nextId("messages");
    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender,
    });
    const createdMessage = await message.save();
    res.status(201).json({
      message: "Message added successfully",
      messageData: createdMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;
      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Message not found",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", async (req, res) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred while deleting the message",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Message not found",
        error: { message: "Message not found" },
      });
    });
});

module.exports = router;
