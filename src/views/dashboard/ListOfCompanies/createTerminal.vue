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
            <h5 class="title">Create Terminal</h5>
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
                <label>Vendor</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Vendor" class="" v-model="vendor" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Transaction Limit</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="number" placeholder="Transaction Limit" class="" v-model="transactionLimit" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Fee</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="number" placeholder="Fee" class="" v-model="fee" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Terminal Id</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Terminal Id" class="" v-model="terminalId" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Serial No.</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Serial No." class=""  v-model="serialNo"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Service Type</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Service Type" class=""  v-model="serviceType"/>
                </div>
              </div>
            </div>
            
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Slip Header</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Slip Header" class=""  v-model="slipHeader"/>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label>Slip Footer</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Slip Footer" class=""  v-model="slipFooter"/>
                </div>
              </div>
            </div>
            <!-- <div class="row align-items-center mt-3">
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
            </div> -->
            <div class="row  mt-3">
              <div class="col-md-4 text-left">
              </div>
              <div class="col-md-8 text-left">
                <div class="text-center mt-3">
                  <button class="btn btn_theme" @click="createTerminal" :style="[
                      isButtonDisabled
                        ? { cursor: 'not-allowed' }
                        : { cursor: 'pointer' }
                    ]">Create
                     <img
                        src="@/assets/img/git_loader.gif"
                        style="display:none"
                        width="15px"
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
      vendor: null,
      transactionLimit: null,
      fee: null,
      terminalId: null,
      serialNo: null,
      serviceType: null,
      slipHeader: "",
      slipFooter: "",
      isButtonDisabled: false
    };
  },
  methods: {
    createTerminal(event) {
        event.preventDefault();
        if(!this.vendor) {
            this.$toast("Vendor field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.transactionLimit) {
            this.$toast("Transaction Limit field Cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.fee) {
            this.$toast("Fee field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.terminalId) {
            this.$toast("Terminal Id field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.serialNo) {
            this.$toast("Serial Number field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.serviceType) {
            this.$toast("Service Type field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.slipHeader) {
            this.$toast("Slip Header field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
        if(!this.slipFooter) {
            this.$toast("Slip Footer field cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }

        const data = {
            terminalId: this.terminalId,
            serialNo: this.serialNo,
            serviceType: this.serviceType,
            branchId: this.$route.query.companyBranchId,
            transactionLimit: parseInt(this.transactionLimit),
            fee: parseInt(this.fee),
            vendor: this.vendor,
            slipHeader: this.slipHeader,
            slipFooter: this.slipFooter,
        }

        this.isButtonDisabled = true
        $('.loader').show();

        this.axios.post(`${configObject.apiBaseUrl}/Pos/CreateTerminal`, data, configObject.authConfig())
            .then(res => {
                    this.$toast("POS Terminal created successfully", {
                        type: "success",
                        timeout: 3000
                    });
                    this.isButtonDisabled = false
                    $('.loader').hide();
                    this.$router.push({name: 'pos_terminals', query: { companyBranchId: this.$route.query.companyBranchId, companyId: this.$route.query.companyId}})
            })
            .catch(error => {
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$toast("Unable to create POS terminal", {
                    type: "error",
                    timeout: 3000
                });
            });
    }
  }
};
</script>
