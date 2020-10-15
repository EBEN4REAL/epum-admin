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
        <form  >
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label> Company Name</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Company Name" class="" name="Name"  v-model="Name" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Phone</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Phone" class="" name="Phone" v-model="Phone" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Email</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Email" class=""  name="Email" v-model="Email" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Street</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Street" class="" name="Street" v-model="Street" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>City</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="City" class="" name="City"  v-model="City"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Country</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" name="Country" v-model="Country">
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
                  <select v-model="State" class="form-control">
                    <option disabled selected value="select state">select state</option>
                    <option :value="st.name" v-for="(st,i) in states" :key='i'>{{st.name}}</option>
                  </select>
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
                  <b-form-file
                    v-model="Logo"
                    :state="Boolean(Logo)"
                    placeholder="Upload Logo"
                    accept="image/jpeg, image/png, image/gif">
                  </b-form-file>
                </div>
                <div class="text-left mt-4">
                  <button class="btn btn_theme"  @click="sendForm">Create
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
      Name: null,
      Phone: null,
      Email: null,
      City: null,
      State: "select state",
      Street: null,
      Country: "select a country",
      Logo: [],
      states: []
    };
  },
  mounted() {
    this.getStates()
  },
  methods: {
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },
    sendForm(event){
      event.preventDefault()
       if(!this.Name) {
          this.$toast("Company Name Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.Phone) {
          this.$toast("Phone Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.Email) {
          this.$toast("Email Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }else {
        if(!this.validateEmail(this.Email)) {
          this.$toast("Invalid Email Format", {
              type: "error", 
              timeout: 3000
          });
          return;
        }
      }
      if(!this.Street) {
          this.$toast("Street Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.City) {
          this.$toast("City Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(this.Country === "select a country") {
          this.$toast("Select a valid country", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.State) {
          this.$toast("State Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.Logo) {
          this.$toast("Please select a logo", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      let formData = new FormData()
      formData.append('Company.State', this.State)
      formData.append('Company.Country', this.Country)
      formData.append('Company.Phone', this.Phone)
      formData.append('Company.City', this.City)
      formData.append('Company.Name', this.Name)
      formData.append('Company.Email', this.Email)
      formData.append('Logo', this.Logo)
      $('.loader').show();
      this.axios.post(`${configObject.apiBaseUrl}/Company/AddCompany`,formData, configObject.authConfigForUpload)
          .then(res => {
                this.$toast("Company created successfully", {
                    type: "success",
                    timeout: 3000
                });
                this.$router.push({name: 'list_of_companies'})
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
    },
    getStates() {
      alert()
      this.axios
        .get(
         `https://api.epump.com.ng/Branch/States`, 
          configObject.authConfig
        )
        .then(res => {
          console.log(res.data)
          this.states = res.data
        })
        .catch(error => {

        });
    },
  }
};
</script>
