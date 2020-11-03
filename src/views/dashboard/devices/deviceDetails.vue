<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
           <div class="devices-card">
                <div class="row px-5">
                <div class="col-lg-6">
                    <div class="device-header">
                        <h5>{{deviceDetailObj.branchName}} DEVICE DATAILS</h5>
                        <p>Synced Transactions: {{deviceDetailObj.syncedTransaction}}, Un-Synced Transactions: {{deviceDetailObj.unsynced}} </p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="transactionc_card p-1 text-white text-center">
                        <h6>TOTAL DEVICE TRANSACTIONS</h6>
                        <p>{{deviceDetailObj.totalTransaction}}</p>
                    </div>
                </div>
            </div>
           </div>
        </section>
        
        <div class="mt-3 full__row_section device_details_card">
            <div class="small_card p-3">
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>BRANCH NAME</h6>
                           <h5>{{deviceDetailObj.branchName}}</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>FIRMWARE VERSION</h6>
                           <div class="flex_card">
                               <h5>{{!deviceDetailObj.canUpdate ? 'Device Can Not Update' : 'Device Can Update' }}  </h5>
                               <button class="btn resolve-btn"  @click="toggleCanUpdate">Revert</button>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>PHONE NUMBER</h6>
                           <h5>{{deviceDetailObj.phone}}</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>SHOULD DEVICE RESTART?</h6>
                           <div class="flex_card">
                               <h5>{{!deviceDetailObj.restart ? 'Device is not set for restart' : 'Device is set for  restart' }}  </h5>
                               <!-- <button class="btn resolve-btn">set to restart</button> -->
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>BRANCH EMAIL</h6>
                           <h5>{{deviceDetailObj.email}}</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>MEMORY USAGE</h6>
                           <div class="flex_card">
                               <h5>{{!deviceDetailObj.memoryReset ? 'Device is Not Set for Memory Reset' : 'Device is Set for  Memory Reset' }}  </h5>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>BRANCH ADDRESS</h6>
                           <h5>{{deviceDetailObj.street}}, {{deviceDetailObj.state}}</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                      <div class="card_border p-3">
                           <h6>LAST UPDATE DOWNLOAD</h6>
                           <p>{{!deviceDetailObj.firmwareUpdate ? 'Not Downloaded Yet' : deviceDetailObj.firmwareUpdate }}  </p>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>DEVICE EVENTS</h6>
                           <h5>Total Events:  {{deviceDetailObj.totalEvent}}</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                      <div class="card_border p-3">
                           <h6>DEVICE TYPE</h6>
                           <h5>{{deviceDetailObj.deviceType}}</h5>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    </masterLayout>
</template>

i<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import Jquery from 'jquery';
let $ = Jquery;
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },
  data() {
    return {
      deviceDetailObj: {}
    };
  },
  mounted() {
    this.getDeviceDetails()
  },
  watch: {
    deviceDetailObj(det) {
      det.syncedTransaction = this.convertThousand(det.syncedTransaction)
      det.totalTransaction = this.convertThousand(det.totalTransaction)
      det.unsynced = this.convertThousand(parseFloat(det.totalTransaction.replace(/,/g, ''))  - parseFloat(det.syncedTransaction.replace(/,/g, '')))
    }
  },
  computed: {
    unsynced() {
      if(this.deviceDetailObj !== {}) return  this.convertThousand(parseFloat(deviceDetailObj.totalTransaction.replace(/,/g, ''))  - parseFloat(deviceDetailObj.syncedTransaction.replace(/,/g, '')))
    }
  },
  methods: {
    convertThousand(request) {
      if (!isFinite(request)) {
          return "0.00";
      }
      return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    toggleCanUpdate() {
        let resp = confirm("Are you sure want to revert this device?");
        if (resp) {
            let update = 0
            if(!this.deviceDetailObj.canUpdate) {
              update = 1
            }
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Devices/ToggleCanUpdate/${this.$route.query.deviceId}/${update}`,
                configObject.authConfig
            )
            .then((res) => {
                this.$toast("Successfully Reverted Device", {
                type: "success",
                timeout: 3000,
                });
            })
            .catch((error) => {
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000,
                });
            });
        }
    },
    getDeviceDetails() {
      this.axios.get(`${configObject.apiBaseUrl}/Devices/Details/${this.$route.query.deviceId}`, configObject.authConfig)
          .then(res => {
            console.log(res.data)
            this.deviceDetailObj = res.data
            $('.loader').hide();
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
  }
};
</script>