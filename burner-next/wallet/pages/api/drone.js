export default function handler(req, res) {
  res.status(200).json({
    sessionPublicKey: req.sessionPublicKey,
    account: "0xDeadBeef",
    expires: 1658875466,
    contract: "0x...",
    token: ["0x...", "0x..."],
  });
}
