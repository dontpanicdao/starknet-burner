import {wallet} from './index'

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div> 
    <div class="card" id="starknetburner" /></div>
</div>`

wallet();