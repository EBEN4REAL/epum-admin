<template>
  <masterLayout>
      <div class="user_details">
          <div class="new_row_section mb-3">
          <div class="small_card product_details_card mt-3">
            <div class="row">
              <div class="col-lg-4 col-md-2 user_contact border-right">
                <div class="d-flex justify-content-between">
                    <div class="image">
                        <img src="@/assets/img/user.svg" width="60px" />
                    </div>
                    <div class="">
                        <h5>{{userObject.userName}}</h5>
                        <p class="font-italic mt-3">{{userObject.firstName}} {{userObject.lastName}}</p>
                        <p class="font-italic text-dark">{{userObject.phoneNumber}}</p>
                    </div>
                </div>
              </div>
               <div class="col-lg-3 col-md-2 credit_limit border-right">
                <div class="text-center">
                <button class="btn create_btn primary_btn">Credit limit</button>
                <h6 class="mt-2">{{userObject2.creditLimit}}</h6>
            </div>
              </div>
              <div class="col-lg-3 col-md-2 number_roles border-right">
                <div class="text-center">
                <button class="btn create_btn primary_btn">Number of roles</button>
                <h6 class="mt-2">{{numberOfRoles}}</h6>
              </div>
              </div>
              <div class="col-lg-2 col-md-2">
               <div class="mt-4 mx-auto text-center">
              <router-link :to="{ name: 'usersEdit', query: {id: this.$route.query.id} }" class="p-2 btn btn_theme">Map User</router-link>
            </div>
              </div>
            </div>
          </div>
        </div>

 <div class="new_row_section pb-5">
    <div class="row">
      <div class="col-sm-6">
        <div class="card border-0">
          <div class="card-body roles">
            <div  class="card-title">
              <h5>List of roles for this user</h5>
            </div>
            <div class="row" style="margin-left: 0; margin-right: 0" v-if="roles.length && !loading">
                <div :class="column(roles, index)" class="card-text card-text-center border-bottom card-text-border-left" v-for="(role, index) in roles" :key="index">
                    <h6 class="ml-2">{{role}}</h6>
                    <!-- <button class="mr-2 btn" 
                    :class="checkRole(role) ? 'resolve-btn' : 'disabled'" 
                    :disabled="checkRole(role) ? false : true"
                     @click="showManaging(role)">
                      Details
                    </button> -->

                    <button class="btn red-btn" @click="removeUser(role)"
                      :disabled="isButtonDisabled ? true : null"
                      :style="[
                        isButtonDisabled
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"
                    >Remove
                    </button>
                </div>
            </div>
            <div v-if="!roles.length && !loading" class="no_managing">
              <img src="@/assets/img/XMLID_1_.svg" width='150px;' class="mt-5 mb-4">
              <h5>No Role for this user</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card border-0">
          <div class="card-body branch">
              <div class="card-title">
                <h5>{{managingName}} Managed</h5>
              </div>
              <div v-if="managing.length && !loading">
                <div class="card-text card-text-center p-2 pl-4 pr-4 d-flex border-bottom" v-for="(manage, index) in managing" :key="index">
                  <h6>{{getName(manage)}}:</h6>
                  <p>{{managingObject[manage]}}</p>
                </div>
            </div>
            <div v-if="!managing.length && !loading" class="no_managing">
              <img src="@/assets/img/XMLID_1_.svg" width='150px;' class="mt-5 mb-4">
              <h5>No Company or Branch Managed</h5>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
      </div>    
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
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
  data() {
    return {
        userObject: {},
        userObject2: {},
        numberOfRoles: 0,
        roles: [],
        managingObject: {},
        managing: [],
        managingIdName: '',
        managingName: 'Company or Branch',
        loading: true,
        isButtonDisabled: false
    }
  },
  
  methods: {
      column(roles, index) {
        if (index == ((roles.length) - 1) && (roles.length % 2) !== 0) {
          return 'col-md-12'
        }
        return 'col-md-6'
      },
      getUserDetails() {
          this.axios
          .get(
              `${configObject.apiBaseUrl}/Admin/GetUserDetails/${this.$route.query.id}`, configObject.authConfig)
              .then(res => {
                  this.userObject2 = res.data
                  if (res.data.roles == "") {
                      this.roles = []
                  } else {
                      let unsortedRoles = res.data.roles.split(',')
                      unsortedRoles.sort((a, b) => {
                        return a > b ? 1 : b > a ? -1 : 0;
                      });
                      this.roles = unsortedRoles
                  }

                  this.numberOfRoles = this.roles.length

                  if (res.data.manage) {
                      this.managingObject = res.data.manage
                      this.managing = Object.keys(res.data.manage)
                                        .filter(cur => cur.toLowerCase().includes('name'));
                      this.managingIdName = Object.keys(res.data.manage)
                                        .filter(cur => cur.toLowerCase().includes('id'))[0]
                  } else {
                    this.managingObject = {}
                    this.managing = []
                    this.managingIdName = ''
                    this.managingName = 'Company or Branch'
                  }

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
          const managingName = name.substring(0, index)
          this.managingName = `${managingName[0].toUpperCase()}${managingName.substring(1, managingName.length)}`
          return capName
      },
      // checkRole(role) {
      //   if (this.managingObject.role.includes(role)) {
      //     return true
      //   }
      //   return false
      // },
      // showManaging(role) {

      // },
      removeUser(role) {
        const data = {
            userId: this.$route.query.id,
            role: role,
            id: role == this.managingObject.role ? this.managingObject[this.managingIdName] : ''
        }

        this.isButtonDisabled = true;

        this.axios.post(`${configObject.apiBaseUrl}/Admin/RemoveUserFromRole`, data, configObject.authConfig)
            .then(res => {
                  this.$toast(`Successfully Removed user from ${data.role} role`, {
                      type: "success",
                      timeout: 3000
                  }); 
                  this.isButtonDisabled = false;
                  this.getUserDetails()
            })
            .catch(error => {
                this.isButtonDisabled = false;
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000
                });
            });
    }
  }
};
</script>
