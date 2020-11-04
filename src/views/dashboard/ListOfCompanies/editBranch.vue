<template>
  <masterLayout>
    <div class="profile__section__outer_wrapper">
      <div class="account__header__banner">
        <div
          class="account_settings_banner co_dealer_details"
          :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31, 0.7)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: '5px'
            }
          ]"
        >
          <div class="banner__text_section">
            <h3 class="banner__text">Edit Branch</h3>
          </div>
        </div>
        </div>
          <div class="full__row_section mt-3 mb-5">
            <div class="">
              <form>
                <div class="details_form">
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Outlet Name</label >
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Company Name"
                            class="company_branch_input"
                            disabled v-model="newCompanyBranchObj.name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Phone</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Phone"
                            class="company_branch_input"
                            disabled v-model="newCompanyBranchObj.phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Email</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="email"
                            placeholder="Email"
                            class="company_branch_input"
                            disabled v-model="newCompanyBranchObj.email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Street</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="street"
                            placeholder="Street"
                            class="company_branch_input"
                            disabled v-model="newCompanyBranchObj.street"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>City</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="City"
                            class="company_branch_input"
                            disabled v-model="newCompanyBranchObj.city"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Country</label>
                      </div>
                      <div class="col-md-3">
                        <div class="details_input">
                           <input
                                type="text"
                                placeholder="City"
                                class="company_branch_input"
                                v-model="newCompanyBranchObj.country"
                                disabled
                                v-show="formMode === 'details'"
                            />
                            <select class="form-control"  v-model="newCompanyBranchObj.country"  v-show="formMode === 'edit'">
                                <option value="select a country" disabled>select a country</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Kenya">Kenya</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Send Report Mail</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Send Report Mail"
                            class="company_branch_input"
                            disabled v-model="newCompanyBranchObj.sendReportMail"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row p-2 mt-3">
                      <div class="col-md-4">
                        <label>State</label>
                      </div>
                      <div class="col-md-3">
                        <div class="details_input">
                              <input
                                type="text"
                                placeholder="City"
                                class="company_branch_input"
                                v-model="newCompanyBranchObj.state"
                                disabled
                                v-show="formMode === 'details'"
                              />
                              <select v-model="newCompanyBranchObj.state" class="form-control" v-show="formMode === 'edit'">
                                  <option disabled selected value="select state">select state</option>
                                  <option :value="st.name" v-for="(st,i) in states" :key='i'>{{st.name}}</option>
                              </select>
                          </div>
                      </div>
                    </div>
                    <div class="row p-2 mt-3">
                      <div class="col-md-4">
                        <label>Engagement Level</label>
                      </div>
                      <div class="col-md-3">
                        <div class="details_input">
                              <input
                                type="text"
                                placeholder="City"
                                class="company_branch_input"
                                v-model="newCompanyBranchObj.engagementLevel"
                                disabled
                                v-show="formMode === 'details'"
                              />
                              <select class="form-control" v-model="newCompanyBranchObj.engagementLevel" v-show="formMode === 'edit'">
                                  <option disabled selected value="select engagement level">Select Engagement Level</option>
                                  <option value="Full Auto">Full Auto (Pumps & Tanks)</option>
                                  <option value="Auto">Auto (Pumps Only)</option>
                                  <option value="Tank Auto">Tank Auto (Tanks Only)</option>
                              </select>
                          </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Online</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input class="form-check-input ml-2 check" v-show="formMode === 'details'"  type="checkbox" id="" v-model="companyBranchObj.online" disabled>
                          <input class="form-check-input ml-2 check " type="checkbox" id="" v-show="formMode === 'edit'" v-model="newCompanyBranchObj.online"  @change="checkIfOnline" >
                        </div>
                      </div>
                    </div>
                  </div>
              </form>
            </div>
          </div>
          <div class="text-center mt-3">
            <button class="btn btn_theme update_info"   @click="update" :style="[
                isButtonDisabled
                  ? { cursor: 'not-allowed' }
                  : { cursor: 'pointer' }
              ]" v-if="formMode === 'edit'">Save 
                <img
                  src="@/assets/img/git_loader.gif"
                  style="display:none"
                  width="35px"
                  class="ml-3 loader"
              />
          </button>
          <button class="btn btn_theme enable_edit" @click="enableEdit" v-if="formMode === 'details'">Enable Edit</button>
          <button class="btn  cancel_edit" @click="cancel_edit" v-if="formMode === 'edit'">Cancel</button>
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
      companyBranchObj: {},
      newCompanyBranchObj: {},
      companyDealers:[],
      states: [],
      formMode: 'details',
      isButtonDisabled: false,
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
    this.companyBranchObj = companyBranchDetails
    this.newCompanyBranchObj = {...companyBranchDetails}
  },
  watch: {
    companyBranchObj(val) {
      val.companyId ? this.getDealers() : null
    }
  },
  methods: {
    checkIfOnline(event) {
      event.preventDefault();
      this.newCompanyBranchObj.online = event.target.checked
    },
    enableEdit() {
      this.formMode = 'edit';
      const inputs = Array.from(document.querySelectorAll('.company_branch_input'))
      inputs.forEach(inp => {
        inp.disabled = false
      })
    },
    cancel_edit() {
      this.formMode = 'details';
      this.newDealerObj = {...this.dealerObj}
      const inputs = Array.from(document.querySelectorAll('.company_branch_input'))
      inputs.forEach(inp => {
        inp.disabled = true
      })
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
          `${configObject.apiBaseUrl}/Company/Dealers/${this.companyBranchObj.companyId}`, configObject.authConfig)
          .then(res => {
            this.companyDealers = res.data
          })
          .catch(error => {
              this.showLoader = false
          });
    },
    update(event) {
      event.preventDefault();
      if(!this.newCompanyBranchObj.name) {
          this.$toast("Branch Name Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.newCompanyBranchObj.phone) {
          this.$toast("Phone Field Cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(this.newCompanyBranchObj.phone.length < 10 || this.newCompanyBranchObj.phone.length > 13) {
          this.$toast("Please input a phone number with 10 to 13 characters", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.newCompanyBranchObj.email) {
          this.$toast("Email  Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }else {
        if(!this.validateEmail(this.newCompanyBranchObj.email)) {
          this.$toast("Invalid Email Format", {
              type: "error", 
              timeout: 3000
          });
          return;
        }
      }
      if(!this.newCompanyBranchObj.street) {
          this.$toast("Street Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.newCompanyBranchObj.city) {
          this.$toast("City Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      if(!this.newCompanyBranchObj.sendReportMail) {
          this.$toast("Send Report mail field code Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      const data = {
          id: this.$route.query.companyBranchId,
          name: this.newCompanyBranchObj.name,
          phone: this.newCompanyBranchObj.phone,
          email: this.newCompanyBranchObj.email,
          street: this.newCompanyBranchObj.street,
          city: this.newCompanyBranchObj.city,
          state: this.newCompanyBranchObj.state,
          country: this.newCompanyBranchObj.country,
          engagementLevel: this.newCompanyBranchObj.engagementLevel,
          online: this.newCompanyBranchObj.online,
          sendReportMail: this.newCompanyBranchObj.sendReportMail         
      }

      $('.loader').show();
       this.axios.post(`${configObject.apiBaseUrl}/Branch/UpdateBranch`,data, configObject.authConfig)
          .then(res => {
                this.$toast("Branch Updated successfully", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                if (this.$route.query.dealerId) {
                  this.$router.push({name: 'dealer_branches', query: {dealerId: this.$route.query.dealerId, companyId: this.$route.query.companyId}})
                } else {
                  this.$router.push({name: 'branches', query: {companyId: this.companyBranchObj.companyId}})
                }
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
