const handler = async (req, res) => {
  const { k } = req.query;
  const resp = await fetch(`${process.env.DRONE_BASE_URL}/${k}`);
  if (resp.status !== 200) {
    return res.status(204).send("");
  }
  const data = await resp.json();
  res.status(200).json(data);
};

export default handler;
