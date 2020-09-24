
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
            <!-- </div> -->
        </section>
    </div>
</template>
<script>
import cardBg from '@/assets/img/bg__card.png';
import configObject from "@/config";
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
            alert();
            $event.preventDefault();
            if(!this.email) {
                // this.$toast.open({
                //     message: "Email Required",
                //     type: "error",
                //     duration: 3000
                // });
                return;
            }else {
                if(!this.validEmail(this.email)) {
                    // this.$toast.open({
                    //     message: "Inavlid Email Format",
                    //     type: "error",
                    //     duration: 3000
                    // });
                }
            }
             if(!this.password) {
                // this.$toast.open({
                //     message: "Password Required",
                //     type: "error",
                //     duration: 3000
                // });
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
                        console.log(res.data);
                    this.$toast.open({
                        message: "Sign Successful",
                        type: "success",
                        duration: 3000
                    });
                    $('.loader').hide();
                    this.isButtonDisabled = false;
                    localStorage.setItem("userDetails", JSON.stringify(res.data));
                    configObject.authConfig = {
                        headers: { Authorization: "bearer " + res.data.token }
                    };
                    if (res.data.role === "RemisAdmin") {
                        this.$router.push({ name: "remisAdminDashboard" });
                    }
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    // this.$toast.open({
                    //     message: error.response.data.message,
                    //     type: "error",
                    //     duration: 3000
                    // });
                });
            
        },
    }
}
</script>