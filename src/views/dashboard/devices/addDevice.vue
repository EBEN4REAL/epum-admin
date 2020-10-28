<template>
  <masterLayout :branchName="branchName">
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
            <h5 class="title">Add Device</h5>
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
                <label>Device Type</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="selectedDevice">
                      <option disabled selected value="selectADevice">Select Device</option>
                      <option value="Pump">Pump</option>
                      <option value="Tank">Tank</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3" v-if="selectedDevice !== 'selectADevice'">
              <div class="col-md-4 text-left">
                <label>{{selectedDevice}}s</label>
              </div>
              <div class="col-md-8">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="selectedDevice == 'Tank' ? tanks : pumps"
                  name="flavour-2a"
                >
                </b-form-checkbox-group>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Phone Number</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="number" placeholder="Phone Number on Device" class="" v-model="phoneNumber"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Device ID</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="" class="" v-model="inputDeviceId"/>
                </div>
              </div>
            </div>
            <div class="row  mt-3">
              <div class="col-md-4 text-left">
                <label></label>
              </div>
              <div class="col-md-8 text-left">
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id=""  @change="toggleIsDemo">
                 Device is Demo
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn-success" @click="addDevice"
                      :disabled="isButtonDisabled ? true : null"
                      :style="[
                        isButtonDisabled
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"
                    >Add Device
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
      branchName: '',
      comapanyBranchObj: {},
      selected: [],
      selectedDevice: 'selectADevice',
      deviceId: 'selectADevice',
      pumps: [], 
      tanks: [],
      isDemo: false,
      phoneNumber: null,
      inputDeviceId: null,
      isButtonDisabled: false
    };
  },
  watch: {
    selectedDevice: function(newDevice, oldDevice) {
      if (newDevice != oldDevice) {
        this.selected = []
      }
    }
  },
  mounted() {
    this.getTanks()
    this.getPumps()
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
    this.branchName = companyBranchDetails.name
  },
  methods: {
    toggleIsDemo() {
      this.isDemo = !this.isDemo
    },
    getTanks() {
        this.axios
        .get(
        `${configObject.apiBaseUrl}/Branch/Tanks/${this.$route.query.companyBranchId}`,
        configObject.authConfig
        )
        .then(response => {
            this.tanks = response.data.map(cur => {
              return {
                text: cur.name,
                value: cur.id
              }

            })
        })
        .catch(error => {});
    },
    getPumps() {
      this.axios
        .get(
        `${configObject.apiBaseUrl}/Branch/Pumps/${this.$route.query.companyBranchId}`,
        configObject.authConfig
        )
        .then(response => {
            this.pumps = response.data.map(cur => {
              return {
                text: cur.name,
                value: cur.id
              }
            })
        })
        .catch(error => {});
    },
    addDevice(event) {
      event.preventDefault();
      if(this.selectedDevice == 'selectADevice') {
          this.$toast("Please select a device", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.selected.length) {
          this.$toast(`Please select at least one ${this.selectedDevice}`, {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      if(!this.phoneNumber) {
          this.$toast("Please input a phone number", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(this.phoneNumber.length < 10 || this.phoneNumber.length > 13) {
          this.$toast("Please input a phone number with 10 to 13 digits", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.inputDeviceId) {
          this.$toast("Please input a device ID", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      const devicesToAdd = this.selected.join()
      
      const data = {
          branchId: this.$route.query.companyBranchId,
          deviceId: this.inputDeviceId,
          isDemo: this.isDemo,
          deviceType: this.selectedDevice == 'Tank' ? 'Tanks' : 'Pump',
          pumpId: this.selectedDevice == 'Pump' ? devicesToAdd : '',
          phoneNumber: this.phoneNumber,
          tankId: this.selectedDevice == 'Tank' ? devicesToAdd : '',
          probeAddress: 'string',
          userID: 'string',
          devicePass: 'string'
      }


      $('.loader').show();
      this.isButtonDisabled = true;

       this.axios.post(`${configObject.apiBaseUrl}/Company/AddDevice`,data, configObject.authConfig)
          .then(res => {
                this.$toast("Successfully Added Device", {
                    type: "success",
                    timeout: 3000
                });
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$router.push({name: 'branchDetails', query: { companyBranchId: this.$route.query.companyBranchId}})
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
  }
};
</script>
