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
            <h3 class="banner__text">Company Details</h3>
          </div>
        </div>
        <div class="account_Settings_profile_details_section_row">
          <div class="account_Settings_profile_details_section_first_row">
            <img :src="companyObj.url"  class="profile__pic" />
            <div class="camera_icon" @click="triggerFileUpload">
                <i class="fa fa-camera"></i>
            </div>
          </div>
          <div class="account_Settings_profile_details_section_second_row">
            <h5 class="profile__detail__header mt-2">
              {{newCompObj.name}} <br />
              <small>{{newCompObj.email}}</small>
            </h5>
          </div>
        </div>
        </div>
          <div class="full__row_section mt-3 mb-5">
            <div class="">
              <form id="companyEditForm" name="companyEditForm">
                <input type="file" id="fileInput" name="Logo" style="display: none"  /> 
                <div class="details_form">
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label> Company Name</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Company Name"
                            class="company_input"
                            v-model="newCompObj.name"
                            disabled
                            name="Company.Name"
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
                            type="text"
                            placeholder="Email"
                            v-model="newCompObj.email"
                            disabled
                            class="company_input"
                            name="Company.Email"
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
                            type="text"
                            placeholder="Street"
                            v-model="newCompObj.street"
                            disabled
                            class="company_input"
                            name="Company.Street"
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
                            class="company_input"
                            v-model="newCompObj.city"
                            disabled
                            name="Company.City"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Country</label>
                      </div>
                      <div class="col-md-4">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="City"
                            class="company_input"
                            v-model="newCompObj.country"
                            disabled
                            v-show="formMode === 'details'"
                          />
                          <select class="form-control" name="Company.Country"  v-model="newCompObj.country" v-show="formMode === 'edit'">
                              <option value="select a country" disabled>select a country</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Kenya">Kenya</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row p-2 mt-3">
                      <div class="col-md-4">
                        <label>State</label>
                      </div>
                      <div class="col-md-4">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="City"
                            class="company_input"
                            v-model="newCompObj.state"
                            disabled
                            v-show="formMode === 'details'"
                            name="Company.State"
                          />
                          <select v-model="newCompObj.state" class="form-control" v-show="formMode === 'edit'">
                              <option disabled selected value="select state">select state</option>
                              <option :value="st.name" v-for="(st,i) in states" :key='i'>{{st.name}}</option>
                          </select>
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
import Jquery from 'jquery';
let $ = Jquery;
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },
  data() {
    return {
      backgroundUrl,
      companyObj: {},
      newCompObj: {},
      states: [],
      formMode: 'details',
      isButtonDisabled: false,
    };
  },
  mounted(){
      this.getStates()
      this.companyId = this.$route.query.companyId
      let ml = sessionStorage.getItem(this.companyId)
      if (!ml){
          let allData = localStorage.getItem("companiesList")
          let dt = JSON.parse(allData)
          dt.forEach((my, index) =>{
              if(my.id === this.companyId){
                  ml = JSON.stringify(my)
                  sessionStorage.setItem(this.companyId, ml)
              }
          })
      }

      let companyDetails = JSON.parse(ml)
      this.companyObj = companyDetails
      this.newCompObj = {...companyDetails}
      
  },
  methods: {
    getStates() {
      this.axios.get( `https://api.epump.com.ng/Branch/States`, configObject.authConfig)
          .then(res => {
              this.states = res.data
          })
          .catch(error => {

          });
      },
      triggerFileUpload() {
        $('#fileInput').trigger('click');
      },
      enableEdit() {
        this.formMode = 'edit';
        const inputs = Array.from(document.querySelectorAll('.company_input'))
        inputs.forEach(inp => {
          inp.disabled = false
        })
      },
      cancel_edit() {
        this.formMode = 'details';
        this.newCompObj = {...this.companyObj}
        const inputs = Array.from(document.querySelectorAll('.company_input'))
        inputs.forEach(inp => {
          inp.disabled = true
        })
      },
      validateEmail(email) {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
              return true;
          }
          return false;
      },
      update(event){
        event.preventDefault()
        if(!this.companyObj.name) {
            this.$toast("Company Name Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.companyObj.email) {
            this.$toast("Email Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }else {
            if(!this.validateEmail(this.companyObj.email)) {
            this.$toast("Invalid Email Format", {
                type: "error", 
                timeout: 3000
            });
            return;
            }
        }
        if(!this.companyObj.street) {
            this.$toast("Street Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.companyObj.city) {
            this.$toast("City Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.companyObj.country) {
            this.$toast("Select a valid country", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.companyObj.state) {
            this.$toast("State Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        let companyEditForm = document.getElementById('companyEditForm');
        let formData = new FormData(companyEditForm);
        formData.append('Company.Id', this.$route.query.companyId)
        $('.loader').show();
        this.isButtonDisabled = true
        this.axios.put(`${configObject.apiBaseUrl}/Company/EditCompany`, formData, configObject.authConfigForUpload)
            .then(res => {
                    this.$toast("Company updated successfully", {
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
                this.$toast("Unable to updated company", {
                    type: "error",
                    timeout: 3000
                });
            });
        },
    },
};
</script>