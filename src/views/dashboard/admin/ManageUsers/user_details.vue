<template>
  <masterLayout>
      <div class="user_details">
          <div class="new_row_section mb-3">
          <div class="small_card product_details_card mt-3">
            <div class="row">
              <div class="col-lg-4 col-md-2 border-right">
                <div class="d-flex justify-content-between">
                    <div class="image">
                        <img src="@/assets/img/company_icon.png" width="60px" />
                    </div>
                    <div class="">
                        <h5>{{userObject.userName}}</h5>
                        <p class="font-italic mt-3">{{userObject.firstName}} {{userObject.lastName}}</p>
                        <p class="font-italic text-dark">{{userObject.phoneNumber}}</p>
                    </div>
                </div>
              </div>
               <div class="col-lg-3 col-md-2 border-right">
                <div class="text-center">
                <button class="btn create_btn primary_btn">Credit limit</button>
                <h6 class="mt-2">{{userObject2.creditLimit}}</h6>
            </div>
              </div>
              <div class="col-lg-3 col-md-2 border-right">
                <div class="text-center">
                <button class="btn create_btn primary_btn">Number of roles</button>
                <h6 class="mt-2">{{numberOfRoles}}</h6>
              </div>
              </div>
              <div class="col-lg-2 col-md-2">
               <div class="mt-4 mx-auto text-center">
              <button class="btn btn_theme">Edit User</button>
            </div>
              </div>
            </div>
          </div>
        </div>

 <div class="new_row_section mb-3">
        <div class="row">
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body">
        <h5 class="card-title">List of roles for this user</h5>
        <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4">Customer</h6>
                <button class="mr-5 btn resolve-btn disabled ml-4">Red</button>
            </div>
            <div class="">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Customer</h6>
                <button class="mr-5 btn resolve-btn disabled ml-4">Red</button>
            </div>
            </div>
        </div>
         <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4">Customer</h6>
                <button class="btn resolve-btn disabled ml-4">Red</button>
            </div>
            <div class="">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Customer</h6>
                <button class="btn resolve-btn disabled ml-4">Red</button>
            </div>
            </div>
        </div>
         <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4">Customer</h6>
                <button class="btn resolve-btn disabled ml-4">Red</button>
            </div>
            <div class="">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Customer</h6>
                <button class="btn resolve-btn disabled ml-4">Red</button>
            </div>
            </div>
        </div>
         <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4">Customer</h6>
                <button class="btn resolve-btn disabled ml-4">Red</button>
            </div>
            <div class="">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Customer</h6>
                <button class="btn resolve-btn disabled ml-4">Red</button>
            </div>
            </div>
        </div>
        <div class="border-bottom-verical"></div>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body">
        <h5 class="card-title">List of companies or branch managed</h5>
       <div class="card-text p-2 d-flex justify-content-around border-bottom">
        <h6>Company name:</h6>
        <p>Andrew Johnston</p>
        <button class="btn red-btn">Red</button>
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
        loading: true
    }
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

                  this.numberOfRoles = this.roles.length

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
};
</script>
