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
  const counter = document.querySelector("#counter");
  counter.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;
  counter.style.cssText +=
    "max-width:1280px;margin:0 auto;padding:2rem;text-align:center;background-color:red";

  setupCounter(document.querySelector("#counter"));
};

//displayCounter();

export { hello, displayCounter };
