import axios from axios;

export default authModule = {
    // WILL STORE VARIABLES IN STATE
    state: {
        status: "",
        token: localStorage.getItem("token") || 0,
        user: "",
        error: "",
    },

    mutations: {
        authRequest(state) {
            state.status = "Loading";
        },
        authSuccess(state, token) {
            state.status = "success";
            state.token = token;
        },
        setUser(state) {
            state.user = user;
        },
        handleError(state, error) {
            state.error = error;
        },
        logout(state) {
            state.status = "";
            state.token = "";
        }
    },
    // ACTIONS USE FOR CALL API'S
    actions: {
           async login({commit},user){
               commit(authRequest);
               const response = await axios.post('login',user);
               console.log(response);
           }
    },
    // GETTERS WILL USE TO GET STATE VARIABLES VALUES
    getters: {},
};