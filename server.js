const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔑 ENV VARIABLES
const TOKEN = process.env.TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const TO = process.env.TO;

// 🧪 Root route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 📩 Send WhatsApp (CUSTOM TEMPLATE)
app.post("/send", async (req, res) => {
  try {
    console.log("🔥 Sending custom template...");

    if (!TOKEN || !PHONE_NUMBER_ID || !TO) {
      return res.status(500).send("Missing ENV variables");
    }

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: TO,

        // 🔥 CUSTOM TEMPLATE
        type: "template",
        template: {
          name: "medicine_reminder",   // ⚠️ must match exactly
          language: {
            code: "en_US"
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Message sent:", response.data);
    res.send("Medicine reminder sent 💊");

  } catch (error) {
    console.error("❌ ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

// 🌍 PORT (important for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
