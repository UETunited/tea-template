import AlpineI18n from 'alpinejs-i18n';
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.plugin(AlpineI18n);

// create alpine store
Alpine.store('app', {
  loading: true,
  isSidebarOpen: false,
  toggleSidbarMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  isSettingsPanelOpen: false,
  isSearchBoxOpen: false,
});

// create locale
let locale = 'en';
let messages = {
  en: {},
  vi: {},
};
window.AlpineI18n.create(locale, messages);

Alpine.start();

const env = document.querySelector('body').dataset.env;

console.log(env);

// Check that service workers are supported
if ('serviceWorker' in navigator && env === 'production') {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}
