import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { rootStore } from './store';
import { provider } from './util/Apollo';

createApp(App).use(rootStore).use(router).use(provider).mount('#app');
