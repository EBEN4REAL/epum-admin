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
                        <div class="col-md-4">
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
                                        <input type="number" readonly v-model="userObject2.creditLimit" class="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                             <div class="row align-items-center mt-3">
                                <div class="col-md-12 mb-3">
                                    <label style="font-size: 20px; color: #666666">List of Roles for this  user</label>
                                    <hr style="margin: 0">
                                </div>
                                <div class="col-md-12" v-if="roles.length && !loading">
                                     <div class="input__block mb-2" v-for="(role, index) in roles" :key="index">
                                        <input type="text" :value="role" readonly class="" />
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="!roles.length && !loading">
                                    <p>No roles found for this user</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-5">
                             <div class="row align-items-center mt-3">
                                <div class="col-md-12 mb-3">
                                    <label style="font-size: 20px; color: #666666">List of Companies/Branches Managed</label>
                                    <hr style="margin: 0">
                                </div>
                                <div class="col-md-12" v-if="managing.length && !loading">
                                    <div class="row align-items-center" v-for="(manage, index) in managing" :key="index">
                                        <div class="col-md-4 ">
                                            <label>{{getName(manage)}}</label >
                                        </div>
                                        <div class="input__block mb-2 col-md-8">
                                            <input type="text" :value="managingObject[manage]" readonly class="" />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="col-md-9" v-if="!managing.length && !loading">
                                    <p>No company or branch</p>
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
import configObject from "@/config";

export default {
    components: {
        masterLayout,
    },
    data() {
        return {
            userObject: {},
            userObject2: {},
            backgroundUrl, 
            roles: [],
            managingObject: {},
            managing: [],
            loading: true
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

        this.getUserDetails()
    },
    methods: {
        getUserDetails() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Admin/GetUserDetails/${this.$route.query.id}`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
                    this.userObject2 = res.data
                    if (res.data.roles == "") {
                        this.roles = []
                    } else {
                        this.roles = res.data.roles.split(',')
                    }

                    this.managingObject = res.data.manage
                    this.managing = Object.keys(res.data.manage)
                                        .filter(cur => cur.toLowerCase().includes('name'));

                    this.loading = false
                })
                .catch(error => {
                    this.loading = false
                });
        },
        getName(name) {
            const index = name.toLowerCase().indexOf('name')
            const newName = `${name.substring(0, index)} ${name.substring(index, name.length)}`
            const capName = `${newName[0].toUpperCase()}${newName.substring(1, newName.length)}`
            return capName
        }
    }
}
</script>
