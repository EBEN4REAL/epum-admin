<template>
    <masterLayout>
         <section class="mt-3 full__row_section banner-gradient"  :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
          ]">
      <div class="row align-items-center justify-content-center hundred-percent-height">
        <div class="col-md-12 ">
          <div class="text-center ">
            <h5 class="title">  User Details</h5>
          </div>
        </div>
      </div>
    </section>
        <div class="full__row_section mt-3 ep_card">
            <div class="">
                <form>
                    <div class="row ">
                        <div class="col-md-6 ">
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label>Username</label >
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="email" readonly v-model="userObject.userName" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Firstname</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" readonly v-model="userObject.firstName" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Lastname</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" readonly v-model="userObject.lastName" class="" />
                                    </div>
                                </div>
                            </div>
                           <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Phone</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="text" readonly v-model="userObject.phoneNumber" class="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center mt-3">
                                <div class="col-md-4 ">
                                    <label >Credit Limit</label>
                                </div>
                                <div class="col-md-8">
                                     <div class="input__block">
                                        <input type="number" readonly v-model="userObject.creditLimit" class="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                             <div class="row align-items-center mt-3">
                                <div class="col-md-12 mb-1">
                                    <label >List of Roles for this  user</label>
                                </div>
                                <div class="col-md-9">
                                     <div class="input__block mb-2" v-for="(role, index) in roles" :key="index">
                                        <input type="text" :value="role" readonly class="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      
    </masterLayout>
</template>

<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import backgroundUrl from "@/assets/img/bg__card.png";



export default {
    components: {
        masterLayout,
    },
    data() {
        return {
            userObject: {},
            backgroundUrl, 
            roles: []
        }
    },
  
    mounted(){
        this.id = this.$route.query.id;
        let ml = sessionStorage.getItem(this.id);
        if (!ml) {
        let allData = localStorage.getItem("usersList");
        let dt = JSON.parse(allData);
        dt.forEach((my, index) => {
            if (my.id === this.id) {
                ml = JSON.stringify(my);
                sessionStorage.setItem(this.id, ml);
            }
        });
        }
        this.userObject = JSON.parse(ml);
        this.roles = this.userObject.roles.split(',')
    },
}
</script>
