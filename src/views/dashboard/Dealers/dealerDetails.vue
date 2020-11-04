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
            <h3 class="banner__text">Dealer Details</h3>
          </div>
        </div>
        </div>
          <div class="full__row_section mt-3 mb-5">
            <div class="">
              <form>
                <div class="details_form">
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label> Parent Company Name</label >
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Company Name"
                            class="dealer_input"
                            disabled v-model="newDealerObj.companyName"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                       <label> Dealer Name</label >
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Dealer Name"
                            class="dealer_input"
                            disabled v-model="newDealerObj.name"
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
                            class="dealer_input"
                            disabled v-model="newDealerObj.street"
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
                            class="dealer_input"
                            disabled v-model="newDealerObj.city"
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
                                class="dealer_input"
                                v-model="newDealerObj.country"
                                disabled
                                v-show="formMode === 'details'"
                            />
                            <select class="form-control"  v-model="newDealerObj.country"  v-show="formMode === 'edit'">
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
                      <div class="col-md-3">
                        <div class="details_input">
                              <input
                                type="text"
                                placeholder="City"
                                class="dealer_input"
                                v-model="newDealerObj.state"
                                disabled
                                v-show="formMode === 'details'"
                              />
                              <select v-model="newDealerObj.state" class="form-control" v-show="formMode === 'edit'">
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
      dealerObj: {},
      newDealerObj: {},
      states: [],
      formMode: 'details',
      isButtonDisabled: false,
    };
  },
  mounted(){
    this.getStates()
    this.dealerId = this.$route.query.dealerId
    let ml = sessionStorage.getItem(this.dealerId)
    if (!ml){
        let allData = localStorage.getItem("dealersList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === this.dealerId){
                ml = JSON.stringify(my)
                sessionStorage.setItem(this.dealerId, ml)
            }
        })
    }

    let dealerDetails = JSON.parse(ml)
    this.dealerObj = dealerDetails
    this.newDealerObj = {...dealerDetails}
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
      update(event) {
        event.preventDefault();
        if(!this.newDealerObj.name) {
            this.$toast("Dealer Name Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.newDealerObj.street) {
            this.$toast("Street Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.newDealerObj.city) {
            this.$toast("City Field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(this.newDealerObj.country === "select country") {
            this.$toast("Please Select a country", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(this.newDealerObj.state === 'select state') {
            this.$toast("please select state", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        this.isButtonDisabled = true;
        
        const data = {
            name: this.newDealerObj.name,
            street: this.newDealerObj.street,
            city: this.newDealerObj.city,
            state: this.newDealerObj.state,
            country: this.newDealerObj.country,
            companyId: this.newDealerObj.companyId,
            id: this.$route.query.dealerId,
        }
        $('.loader').show();
        this.axios.put(`${configObject.apiBaseUrl}/Company/UpdateDealer`, data, configObject.authConfig)
            .then(res => {
                this.$toast("Successfully edited dealer", {
                    type: "success",
                    timeout: 3000
                });
                $('.loader').hide();
                this.isButtonDisabled = false;
                this.$router.push({ name: "dealers", query: {
                  companyId: this.dealerObj.companyId
                }});
            })
            .catch(error => {
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000
                });
            });
    },
      enableEdit() {
        this.formMode = 'edit';
        const inputs = Array.from(document.querySelectorAll('.dealer_input'))
        inputs.forEach(inp => {
          inp.disabled = false
        })
      },
      cancel_edit() {
        this.formMode = 'details';
        this.newDealerObj = {...this.dealerObj}
        const inputs = Array.from(document.querySelectorAll('.dealer_input'))
        inputs.forEach(inp => {
          inp.disabled = true
        })
      },
    }
};
</script>