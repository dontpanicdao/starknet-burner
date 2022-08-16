const handler = async (req, res) => {
  const { k } = req.query;
  console.log("message", k);
  const resp = await fetch(`https://drone.carnage.sh/${k}`);
  //   const resp = await fetch(`${process.env.DRONE_BASE_URL}/${k}`);
  console.log("resp", resp);
  if (resp.status !== 200) {
    return res.status(204).send("");
  }
  const data = await resp.json();
  res.status(200).json(data);
};

export default handler;
