const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔑 Replace these with YOUR values from Meta dashboard
const TOKEN = "EAAd7bLllZB9QBRXeOPXP2FF4LwamIQNsMjppJYtZBNaWIZAAIXm8Q29wZAa4YGriZBoSPyAHCb3gh8MdAYn58e2r8UlHONa8Tn55w8Ti2xcRXihnz12L7drbwVEe4tGhRI2a8nTtanOzjgy0zKBSNUDZBVXiZAt5aUhnnEmUUS5UXhfxQtKehCZABUHn8XGdzZBtKZB2FQCeprJggYUVzBYtueUiaxL6hB4ojzlMe1JxhzBmmJ0vZADjFvDTY3ItrrrYqtskxUHY8CEfAoufLw9JyzhRoYq";
const PHONE_NUMBER_ID = "1019496974590719";

// 📱 Your verified WhatsApp number (NO + sign)
const TO = "919405008289";

app.post("/send", async (req, res) => {
  try {
    console.log("📨 Sending WhatsApp message...");

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: TO,
        type: "template",
        template: {
          name: "hello_world", // default working template
          language: { code: "en_US" }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Message Sent:", response.data);
    res.send(response.data);

  } catch (err) {
    console.error("❌ ERROR OCCURRED");

    if (err.response) {
      console.error("API ERROR:", err.response.data);
      res.status(500).json(err.response.data);
    } else {
      console.error("UNKNOWN ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

// Optional test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});