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
            <h5 class="title">Map User To Role ({{email}})</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="">
        <form>
          <div class="text-center">
             <div class="row mt-3">
              <div class="col-md-4 text-left">
                <small>Select Role</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="role">
                      <option disabled value="selectRole">Select Role</option>
                      <option v-for="(aRole, index) in roles" :value="aRole.name" :key="index">{{ aRole.name }}</option>
                      
                  </select>
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn_theme" @click="addUserToRole"
                    :disabled="isButtonDisabled ? true : null"
                    :style="[
                      isButtonDisabled
                        ? { cursor: 'not-allowed' }
                        : { cursor: 'pointer' }
                    ]"
                  >Add User
                    <img
                      src="@/assets/img/git_loader.gif"
                      style="display:none"
                      width="35px"
                      class="ml-3 loader"
                    />
                  </button>
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
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
  },

  mounted() {
    this.getRoles()
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
    const userObject = JSON.parse(ml);
    this.email = userObject.userName
  },
  data() {
    return {
      backgroundUrl,
      role: 'selectRole',
      roles: [],
      isButtonDisabled: false,
      email: ''
    };
  },
  
  methods: {
    getRoles() {
        this.axios
          .get(
              `${configObject.apiBaseUrl}/Admin/GetRoles`, configObject.authConfig)
              .then(res => {
                  res.data.sort((a, b) => {
                      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                  });
                  this.roles = res.data
              })
              .catch(error => {
              });
    },
    addUserToRole(event) {
      event.preventDefault();

      if(this.role == 'selectRole') {
          this.$toast("Please select a role", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      const data = {
        userId: this.$route.query.id,
        role: this.role,
        id: ''
      }

      $('.loader').show();
      this.isButtonDisabled = true;

      this.axios.post(`${configObject.apiBaseUrl}/Admin/AddUserToRole`, data, configObject.authConfig)
          .then(res => {
                this.$toast("Successfully Added User", {
                    type: "success",
                    timeout: 3000
                });
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$router.push({name: 'usersEdit', query: {id: this.$route.query.id}})
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast(error.response.data.message, {
                  type: "error",
                  timeout: 3000
              });
          });
    }
  },
};
</script>
