import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { en, nl } from "./keys";
import { eventBus, eventChannel, store } from "./composables";

// import "./style/app.scss";

// call with I18n option
const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en: { ...en },
    nl: { ...nl },
  },
});

type languages = "en" | "nl";

import App from "./App.vue";

createApp(App).use(i18n).mount("#app");

eventBus.on(eventChannel.GET_LANGUAGE, () => {
  const lang = localStorage.getItem(store.LANGUAGE);
  if (lang) {
    i18n.global.locale = lang as languages;
  }
});

eventBus.on(eventChannel.SET_LANGUAGE, (id) => {
  i18n.global.locale = id as languages;
  localStorage.setItem(store.LANGUAGE, id as string);
});
