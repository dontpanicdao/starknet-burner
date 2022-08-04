const style = ` max-width: 1280px;
margin: 0 auto;
padding: 2rem;
text-align: center;`;

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
    <div class="card" style="${style}">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

  setupCounter(document.querySelector("#counter"));
};

export { hello, displayCounter };
