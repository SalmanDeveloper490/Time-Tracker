<template>
    <div id="register" class="authForm">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div
                    class="alert alert-warning alert-dismissible fade show"
                    role="alert"
                    v-if="showError"
                >
                    <div v-if="errors">
                        <span
                            v-for="error in errors"
                            class="text-danger d-block"
                            >{{ error[0] }}</span
                        >
                    </div>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="form">
                    <form method="post" @submit.prevent="submit">
                        <div class="form-group mb-3">
                            <label class="form-label">Name</label>
                            <input
                                type="text"
                                name=""
                                class="form-control"
                                placeholder="Name"
                                v-model="form.name"
                            />
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label">Email</label>
                            <input
                                type="email"
                                name=""
                                class="form-control"
                                placeholder="Email"
                                v-model="form.email"
                            />
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">Password</label>
                            <input
                                type="password"
                                name=""
                                class="form-control"
                                placeholder="Password"
                                v-model="form.password"
                            />
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name=""
                                class="form-control"
                                placeholder="Confirm Password"
                                v-model="form.password_confirmation"
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
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Register",
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            showError: false,
        };
    },
    computed: {
        ...mapGetters({ errors: "getError" }),
    },
    methods: {
        ...mapActions(["Register"]),
        submit: function () {
            let data = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                password_confirmation: this.form.password_confirmation,
            };

            this.$store
                .dispatch("Register", data)
                .then(() => this.$router.push("/dashboard"))
                .catch((err) => {
                    this.showError = true;
                });
        },
    },
};
</script>
<style></style>
