const reply = (event) => {
  if (event) {
    console.log("from reply");

    console.log(JSON.stringify(event));
  }
};

export { reply };
