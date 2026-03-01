import {hostReactAppReady} from "../utils/utils.js";

export default async function napravleniya() {
 await hostReactAppReady();

 const tooglers = document.querySelectorAll('.napravleniya-button');
 const pannels = document.querySelectorAll('.napravleniya-panel');

 tooglers.forEach((toogler, idx) => {
     toogler.addEventListener('click', (e) => {
         pannels.forEach(pannel => pannel.classList.remove('active'));
         tooglers.forEach(btn => btn.classList.remove('active'));
         pannels[idx].classList.add('active');
         e.currentTarget.classList.add('active');
     })
 })
}
