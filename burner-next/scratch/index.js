const hello = () => {
  return console.log("hello from NPM");
};

const setupCounter = (element) => {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter(++counter));
  setCounter(0);
};

const displayCounter = () => {
  document.querySelector("#counter").innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

  setupCounter(document.querySelector("#counter"));
};

export { hello, displayCounter };
