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
            <h5 class="title">Create Company</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="">
        <form method="post" enctype="multipart/form-data">
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label> Company Name</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Company Name" class="" v-model="companyName" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Phone</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Phone" class="" v-model="phone" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Email</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Email" class="" v-model="email" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Street</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Street" class="" v-model="street" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>City</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="City" class="" v-model="city" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Country</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <!-- <input type="text" placeholder="Country" class="" /> -->
                  <select class="form-control" v-model="country">
                      <option value="select a country" disabled>select a country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>State</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="State" class="" v-model="state" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Company Products</label>
              </div>
              <div class="col-md-8 text-left">
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="LPG">
                 <label class="form-check-label">LPG</label>
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="DPK">
                 <label class="form-check-label">DPK</label>
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="AGO">
                 <label class="form-check-label">AGO</label>
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="PMS">
                 <label class="form-check-label">PMS</label>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-4 text-left">
                <label>Upload Company Logo</label>
              </div>
              <div class="col-md-8">
                <div class="text-left ">
                  <input type="file"  accept=".jpg, .jpeg, .png" name="file" id="file-selector" @change="fileChange" />
                </div>
                <div class="text-left mt-4">
                  <button class="btn btn_theme" @click="createCompany">Create
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

  mounted() {},
  data() {
    return {
      backgroundUrl,
      companyName: null,
      phone: null,
      email: null,
      city: null,
      state: null,
      street: null,
      country: "select a country",
      file: null
    };
  },
  methods: {
    fileChange(event) {
      const fileList = event.target.files;
      this.file = fileList[0];
    },
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },
    createCompany(event) {
      event.preventDefault();
      if(!this.companyName) {
          this.$toast("Company Name Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.phone) {
          this.$toast("Phone Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.email) {
          this.$toast("Email Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }else {
        if(!this.validateEmail(this.email)) {
          this.$toast("Invalid Email Format", {
              type: "error", 
              timeout: 3000
          });
          return;
        }
      }
      if(!this.street) {
          this.$toast("Street Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.city) {
          this.$toast("City Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(this.country === "select a country") {
          this.$toast("Select a valid country", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.state) {
          this.$toast("State Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      const data = {
        company: {
          phone: this.phone,
          email: this.email,
          street: this.street,
          city: this.city,
          state: this.state,
          country: this.country,
          name: this.companyName
        },
        logo: this.file
      }

      console.log(data);
      $('.loader').show();
       this.axios.post(`${configObject.apiBaseUrl}/Company/AddCompany`,data, configObject.authConfig)
          .then(res => {
                this.$toast("Company created successfully", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast("Unable to create company", {
                  type: "error",
                  timeout: 3000
              });
          });
    }
  }
};
</script>
