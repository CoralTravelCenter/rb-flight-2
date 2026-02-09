import {hostReactAppReady} from "../utils/utils.js";
import tabs from "tabs";

export default async function initTabs() {
  await hostReactAppReady()
    const container= document.querySelector('.tab-container')
    tabs(container);
}
