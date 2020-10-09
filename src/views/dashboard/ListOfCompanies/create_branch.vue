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
            <h5 class="title">Create New Branch</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="">
        <form>
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label> Branch Name</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Branch Name" class="" v-model="branchName" />
                </div>
              </div>
            </div>
             <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Dealer</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="dealer">
                      <option disabled selected value="select dealer">select dealer</option>
                      <option>Dealer 1</option>
                      <option>Dealer 2</option>
                  </select>
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
                  <input type="text" placeholder="City" class=""  v-model="city"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Country</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="country">
                      <option disabled selected value="select country">select country</option>
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
                  <select v-model="state" class="form-control">
                    <option disabled selected value="select state">select state</option>
                    <option :value="st.name" v-for="(st,i) in states" :key='i'>{{st.name}}</option>
                  </select>
                </div>
              </div>
            </div>
             <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Engagement Level</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="engagementLevel">
                      <option disabled selected value="select engagement level">Select Engagement Level</option>
                      <option value="Full Auto (Pumps & Tanks) ">Full Auto (Pumps & Tanks)</option>
                      <option value="Auto (Pumps Only)">Auto (Pumps Only)</option>
                      <option value="Tank Auto (Tanks Only)">Tank Auto (Tanks Only)</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row  mt-3">
              <div class="col-md-4 text-left">
                <label>Online</label>
              </div>
              <div class="col-md-8 text-left">
               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="" value="LPG" @change="checkIfOnline"> Status
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn_theme" @click="createBranch">Create
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
import Jquery from 'jquery';
let $ = Jquery;
import configObject from "@/config";


export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {
      backgroundUrl,
      branchName: null,
      group: "select group",
      dealer: "select dealer",
      phone: null,
      email: null,
      street: null,
      country: "select country",
      state: "select state",
      city: null,
      online: true,
      engagementLevel: "select engagement level",
      serviceType: "select service type",
      states: [],
      companyDealers: []
    };
  },
  mounted() {
    this.getStates()
    this.getCompanyDealers()
  },
  methods: {
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },
    checkIfOnline(event) {
      event.preventDefault();
      this.online = event.target.checked
    },
    getCompanyDealers() {
      this.axios
        .get(
         `${configObject.apiBaseUrl}/Company/Dealers/${this.$route.query.id}`, 
          configObject.authConfig
        )
        .then(res => {
          console.log(res.data)
          this.companyDealers = res.data
        })
        .catch(error => {

        });
    },
    getStates() {
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
    createBranch(event) {
      event.preventDefault();
      if(!this.branchName) {
          this.$toast("Branch Name Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      if(this.dealer === "select dealer") {
          this.$toast("Please select a dealer", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.phone) {
          this.$toast("Phone Field Cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.email) {
          this.$toast("Email  Field cannot be blank", {
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
      if(this.country === "select country") {
          this.$toast("Please Select a country", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(this.state === 'select state') {
          this.$toast("please select state", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(this.engagementLevel === "select engagement level") {
          this.$toast("Please Select engagemeent level", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      const data = {
          phone: this.phone,
          email: this.email,
          street: this.street,
          city: this.city,
          state: this.state,
          country: this.country,
          name: this.name
      }

      console.log(data);
      // $('.loader').show();
      //  this.axios.post(`${configObject.apiBaseUrl}/Company/AddCompany`,data, configObject.authConfig)
      //     .then(res => {
      //           this.$toast("Company created successfully", {
      //               type: "success",
      //               timeout: 3000
      //           });
      //           $('.loader').hide();
      //           this.isButtonDisabled = false;
      //     })
      //     .catch(error => {
      //         this.isButtonDisabled = false;
      //         $('.loader').hide();
      //         this.$toast("Unable to create company", {
      //             type: "error",
      //             timeout: 3000
      //         });
      //     });
    }
  }
};
</script>
