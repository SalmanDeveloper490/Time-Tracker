<template>
    <Navbar />
    <main>
        <div class="container pt-5">
            <router-view></router-view>
        </div>
    </main>
</template>
<script>
import Navbar from "../components/navbar.vue";
export default {
    name: "App",
    components: {
        Navbar: Navbar,
    },
};
</script>
<style></style>
