<template>
    <nav class="navbar navbar-expand-lg bg-dark py-4">
        <div class="container">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto" v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link">
                            Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">
                            {{ loggedInUser.name }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            @click="logout"
                            style="cursor: pointer"
                            >Logout</a
                        >
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto" v-else>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">
                            Login
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">
                            Register
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "Navbar",
    data() {
        return {
            user: "",
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        ...mapGetters({ loggedInUser: "getUser" }),
    },
    created() {
        if (this.isLoggedIn) {
            this.$store.dispatch("getUser");
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
            this.$router.push("/login");
        },
    },
};
</script>
<style>
.navbar a,
.navbar-nav li a {
    color: #fff;
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 600;
}
</style>
