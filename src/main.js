import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBOdt9FVc45W3OkAHSPDxINFLbjsbVIyDM",
    authDomain: "sabr-vue.firebaseapp.com",
    projectId: "sabr-vue",
    storageBucket: "sabr-vue.appspot.com",
    messagingSenderId: "262334488681",
    appId: "1:262334488681:web:23eb944d33507e1392c2f8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const pinia = createPinia()
createApp(App).use(pinia).use(store).mount('#app')
