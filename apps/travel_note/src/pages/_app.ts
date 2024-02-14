import type { App } from 'vue';
// import 'vue-final-modal/style.css'
import { createVfm } from 'shared'

const vfm = createVfm()
export default (app: App) => {
  app.use(vfm);
};