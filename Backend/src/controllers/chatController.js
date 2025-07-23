const axios = require('axios');

exports.handleChat = async (req, res) => {
  const { user_id, message } = req.body;
  try {
    const langchainRes = await axios.post('http://0.0.0.0:8000/chat', {
      user_id,
      message,
    });
    res.json({ response: langchainRes.data.response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "LangChain service error" });
  }
};
