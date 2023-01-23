import "./bootstrap";
import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";
import App from "./layouts/app.vue";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = token;
}

// manage error and expire token
axios.interceptors.response.use(undefined, function (error) {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch("logout");
            return router.push("/login");
        } else {
            store.commit("handle_error", JSON.parse(error.response.data.error));
        }
    }
});

const app = createApp({
    components: {
        App,
    },
});
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.mount("#app");
