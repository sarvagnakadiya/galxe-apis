const express = require("express");
const { createPublicClient, http } = require("viem");
const mode_abi = require("./NameRegistryV2.json").abi;
const cors = require("cors");

const app = express();
const chains = require("viem/chains");

const RPC_URL = "https://sepolia.mode.network/";
// const CONTRACT_ADDRESS = "0xDbC50cE0F71621E334ebC73135ed26b184da4984";
const CONTRACT_ADDRESS = "0xCa3a57e014937C29526De98e4A8A334a7D04792b";

const transport = http(RPC_URL);
const client = createPublicClient({
  chain: chains.modeTestnet,
  transport: transport,
});

// Specify allowed origin and methods in corsOptions
const corsOptions = {
  origin: "https://galxe.com",
  methods: ["GET"], // Allow both GET and POST methods
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Welcome to modeDomains APIs for GALXE campaign");
});

app.get("/info/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const balance = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: mode_abi,
      functionName: "balanceOf",
      args: [address],
    });

    if (parseInt(balance) > 0) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
