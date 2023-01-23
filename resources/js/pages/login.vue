<template>
    <div id="login" class="authForm">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div
                    class="alert alert-warning alert-dismissible fade show"
                    role="alert"
                    v-if="showError"
                >
                    Username or Password is incorrect
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="form">
                    <form action="" method="post" @submit.prevent="submit">
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                name=""
                                v-model="form.email"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                name=""
                                v-model="form.password"
                            />
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary d-block submitBtn"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            showError: false,
        };
    },
    methods: {
        ...mapActions(["login"]),

        submit: function () {
            this.$store
                .dispatch("login", this.form)
                .then(() => this.$router.push("/dashboard"))
                .catch((err) => console.log(err));
        },
    },
};
</script>
<style></style>
