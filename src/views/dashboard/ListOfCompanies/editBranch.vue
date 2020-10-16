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
            <h5 class="title">EDIT BRANCH INFORMATION</h5>
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
                  <input type="text" placeholder="Branch Name" class="" v-model="comapanyBranchObj.name" />
                </div>
              </div>
            </div>
             <!-- <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Dealer</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="comapanyBranchObj.dealerId">
                      <option disabled selected value="select dealer">select dealer</option>
                      <option v-for="(dl,i) in companyDealers" :key="i" :value="dl.id">{{dl.name}}</option>
                  </select>
                </div>
              </div>
            </div> -->
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Phone</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Phone" class="" v-model="comapanyBranchObj.phone" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Email</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Email" class="" v-model="comapanyBranchObj.email" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Street</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Street" class="" v-model="comapanyBranchObj.street" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>City</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="City" class=""  v-model="comapanyBranchObj.city"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Country</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="comapanyBranchObj.country">
                      <option disabled selected value="select country">select country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Send Report Mail</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Send  Report Mail" class=""  v-model="comapanyBranchObj.sendReportMail"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>State</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select v-model="comapanyBranchObj.state" class="form-control">
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
                  <select class="form-control" v-model="comapanyBranchObj.engagementLevel">
                      <option disabled selected value="select engagement level">Select Engagement Level</option>
                      <option value="Full Auto">Full Auto (Pumps & Tanks)</option>
                      <option value="Auto">Auto (Pumps Only)</option>
                      <option value="Tank Auto">Tank Auto (Tanks Only)</option>
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
                  <input class="form-check-input" type="checkbox" id="" :checked="comapanyBranchObj.online"  @change="checkIfOnline"> Status
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn_theme" @click="updateBranch">Save Changes
                     <img
                        src="@/assets/img/git_loader.gif"
                        style="display:none"
                        width="17"
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

  data() {
    return {
      backgroundUrl,
      comapanyBranchObj: {},
      companyDealers:[],
      states: []
    };
  },
  mounted() {
    this.getStates()
    this.companyBranchId = this.$route.query.companyBranchId
    let ml = sessionStorage.getItem(this.companyBranchId)
    if (!ml){
        let allData = localStorage.getItem("branchesList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === this.companyBranchId){
                ml = JSON.stringify(my)
                sessionStorage.setItem(this.companyBranchId, ml)
            }
        })
    }
    let companyBranchDetails = JSON.parse(ml)
    this.comapanyBranchObj = companyBranchDetails
  },
  watch: {
    comapanyBranchObj(val) {
      val.companyId ? this.getDealers() : null
    }
  },
  methods: {
    checkIfOnline(event) {
      event.preventDefault();
      this.comapanyBranchObj.online = event.target.checked
    },
    getStates() {
      this.axios
        .get(
         `https://api.epump.com.ng/Branch/States`, 
          configObject.authConfig
        )
        .then(res => {
          this.states = res.data
        })
        .catch(error => {

        });
    },
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },
    getDealers() {
      this.axios
      .get(
          `${configObject.apiBaseUrl}/Company/Dealers/${this.comapanyBranchObj.companyId}`, configObject.authConfig)
          .then(res => {
            this.companyDealers = res.data
          })
          .catch(error => {
              this.showLoader = false
          });
    },
    updateBranch(event) {
      event.preventDefault();
      if(!this.comapanyBranchObj.name) {
          this.$toast("Branch Name Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.comapanyBranchObj.phone) {
          this.$toast("Phone Field Cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.comapanyBranchObj.email) {
          this.$toast("Email  Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }else {
        if(!this.validateEmail(this.comapanyBranchObj.email)) {
          this.$toast("Invalid Email Format", {
              type: "error", 
              timeout: 3000
          });
          return;
        }
      }
      if(!this.comapanyBranchObj.street) {
          this.$toast("Street Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.comapanyBranchObj.city) {
          this.$toast("City Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.comapanyBranchObj.sendReportMail) {
          this.$toast("Send Report mail field code Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      const data = {
          id: this.$route.query.companyBranchId,
          name: this.comapanyBranchObj.name,
          phone: this.comapanyBranchObj.phone,
          email: this.comapanyBranchObj.email,
          street: this.comapanyBranchObj.street,
          city: this.comapanyBranchObj.city,
          state: this.comapanyBranchObj.state,
          country: this.comapanyBranchObj.country,
          engagementLevel: this.comapanyBranchObj.engagementLevel,
          online: this.comapanyBranchObj.online,
          sendReportMail: this.comapanyBranchObj.sendReportMail         
      }

      $('.loader').show();
       this.axios.post(`${configObject.apiBaseUrl}/Branch/UpdateBranch`,data, configObject.authConfig)
          .then(res => {
                this.$toast("Branch Updated successfully", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.$router.push({name: 'branches', query: {companyId: this.comapanyBranchObj.companyId}})
          })
          .catch(error => {
              this.isButtonDisabled = false;
              $('.loader').hide();
              this.$toast("Unable to update branch", {
                  type: "error",
                  timeout: 3000
              });
          });
    }
  }
};
</script>
