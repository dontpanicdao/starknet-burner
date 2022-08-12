import {sum} from './index'

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div> 
    <div class="card" id="starknetburner" />${sum(1,2)}</div>
</div>`

