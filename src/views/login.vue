
<template>
     <div class="row page_container">
        <section class="image_section col-md-7">
            <img src="@/assets/img/epump-logo.png" class="ml-5" alt="">
            <div class="image_section_text">
                <div class="people_image_holder">
                    <img src="@/assets/img/1.png" alt="" class="img-responsive people_image">
                </div>
                <div>
                    <p class="manage_text">Welcome Admin</p>
                    <p>Sign in to manage all company users and assets.</p>
                </div>
            </div>
        </section>

        <section class="login_container col-md-5" :style="[
                    {
                        background: '#370f70',
                    }
                    ]">
                <p class="login_header_text sign_in_text">Sign In</p>

                <form class="form_holder">
                    <div class="form_input">
                        <label class="form_label">Email</label>
                        <input type="text" class="login_text" v-model="email">
                    </div>
    
                    <div class="form_input">
                        <label class="form_label">Password</label>
                        <input type="password" class="login_text" v-model="password">
                    </div>
    
                    <div class="form_input">
                        <button 
                        class="login_button" 
                        @click="signIn($event)" 
                        :disabled="isButtonDisabled ? true : null"
                        :style="[
                            isButtonDisabled
                            ? { cursor: 'not-allowed' }
                            : { cursor: 'pointer' }
                        ]">
                            LOGIN
                            <img
                                src="@/assets/img/git_loader.gif"
                                style="display:none"
                                width="35px"
                                class="ml-3 loader"
                            />
                        </button>
                    </div>
                </form>
        </section>
    </div>
</template>
<script>
import cardBg from '@/assets/img/bg__card.png';
import configObject from "@/config";
import jwt_decode from "jwt-decode";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    name: 'Login',
    data() {
        return {
            cardBg,
            email: null,
            password: null,
            isButtonDisabled: false
        }
    },
    methods: {
        validEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true;
            }
            return false;
        },
        signIn($event) {
            $event.preventDefault();
            if(!this.email) {
                 this.$toast("Email Required", {
                    type: "error",
                    timeout: 3000
                });
                return;
            }else {
                if(!this.validEmail(this.email)) {
                    this.$toast("Invalid Email Format", {
                        type: "error",
                        timeout: 3000
                    });
                    return
                }
            }
             if(!this.password) {
                this.$toast("Password Field cannot be blank", {
                    type: "error", // or "success", "error", "default", "info" and "warning",
                    timeout: 3000
                });
                return;
            }
            const data = {
                userName: this.email,
                password: this.password
            }
            this.isButtonDisabled = true;
            $(".loader").show();
            this.axios
                .post(
                `${configObject.apiBaseUrl}/Account/login`, data)
                    .then(res => {
                        
                        $('.loader').hide();
                        this.isButtonDisabled = false;
                        const roles = res.data.role.split(",");
                        res.data.roles = roles
                        
                        if(roles.includes("Super Admin") || roles.includes("Admin")) {
                            localStorage.setItem("adminUserDetails", JSON.stringify(res.data));

                            const decoded = jwt_decode(res.data.token);
                            const exp = decoded.exp * 1000;
                            localStorage.setItem('jwtExpiry', exp)

                            this.$router.push({ name: "adminDashboard" });

                            this.$toast("Login Successful", {
                                type: "success",
                                timeout: 3000
                            });
                        } else {
                            this.$toast("You do not have any of the required roles to access this portal", {
                                type: "error",
                                timeout: 3000
                            });
                        }
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
            
        },
    }
}
</script>