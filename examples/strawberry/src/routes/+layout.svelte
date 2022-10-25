<slot />

<style global>
  body,
  html {
    background: #3c3c3b;
    color: #ebebd3;
    font-family: VT323;
    font-size: 1.25rem;
  }

  button {
    background: #92cd41;
    border: 2px solid #555;
    box-shadow: inset (-4px) (-4px) 0px 0px #4aa52e;
    color: white;
    display: inline-block;
    font-family: VT323;
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    position: relative;
    text-align: center;
    text-decoration: none;
  }

  button.warn {
    background-color: #f7d51d;
  }

  button.error {
    background-color: #e76e55;
  }

  .hide {
    display: none;
  }
</style>
