const reply = (event) => {
  if (event) {
    console.log(`reply from wallet: ${JSON.stringify(event)}`);
  }
};

export { reply };
