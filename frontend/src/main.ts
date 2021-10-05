import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import { rootStore } from "./store";
import { apolloClient } from "./util/Apollo";

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(rootStore)
  .use(router)
  .mount("#app");
