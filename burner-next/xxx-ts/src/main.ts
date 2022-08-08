import { burner } from ".";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card" id="starknetburner" />
  </div>
`;

burner();
