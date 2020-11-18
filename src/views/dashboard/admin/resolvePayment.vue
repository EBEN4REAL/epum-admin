<template>
    <masterLayout>
      <div class="center_div pb-5 mb-5"  style="margin-top:0px">
                  <div class="pad_div">
                     <div class="mt-3 tabs__lists text-center">
                        <h5>Resolve Online Payment</h5>
                    </div>
                    <ul class="tabs__lists text-center">
                      <li class="mt-3 mr-4" @click="changeTab('fw')">
                        <a href="#" class="tab_link" :class="[tab === 'fw' ?  'active__tab__link' : null]">
                          <i
                            class="fa fa-credit-card mr-2"
                            aria-hidden="true"
                            :style="[tab === 'card' ?  {color:'#370F70'} : null]"
                          ></i>
                          Flutterwave
                        </a>
                      </li>
                      <li class="mt-3" @click="changeTab('mf')">
                        <a href="#" class="tab_link" :class="[tab === 'mf' ?  'active__tab__link' : null]">
                          <i
                            class="fa fa-credit-card mr-2"
                            aria-hidden="true"
                            :style="[tab === 'wallet' ?  {color:'#370F70'} : null]"
                          ></i>
                       Monnify
                        </a>
                      </li>
                    </ul>
                  </div>
                   <div class="form_content" v-if="tab === 'fw'">
                      <form action="">
                          <div class="form-group row">
                              <label for="name" class="col-sm-4 col-form-label">Email</label>
                              <div class="col-sm-8">
                                <input type="email" class="form-control form__input"  v-model="email" id="transactionRef" placeholder="Email">
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="name" class="col-sm-4 col-form-label">Transaction ID</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control form__input" id="transactionRef" v-model="transactionID" placeholder="Transaction ID">
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="name" class="col-sm-4 col-form-label">Payment Reference</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control form__input" v-model="paymentRef" id="transactionRef" placeholder="payment reference">
                              </div>
                            </div>
                             <div class="form-group row">
                              <label for="name" class="col-sm-4 col-form-label">Remis</label>
                              <div class="col-sm-8">
                                <select class="form-control" v-model="remis">
                                  <option value="isRemis" selected disabled>Is remis</option>
                                  <option value="true">True</option>
                                  <option value="false">False</option>
                                </select>
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="amount" class="col-sm-4 col-form-label">Amount</label>
                              <div class="col-sm-8">
                                <input type="number" class="form-control form__input" id="inputAmount" placeholder="Amount" v-model="amount">
                                <div class="mt-4 mx-auto text-center">
                                  <button class="btn btn_theme" @click="resolveFlutterWavePayment" :disabled="isButtonDisabled ? true : null"
                                    :style="[
                                      isButtonDisabled
                                        ? { cursor: 'not-allowed' }
                                        : { cursor: 'pointer' }
                                    ]">Resolve Payment</button>
                                    </div>
                                  </div>
                              </div>
                            
                        </form>
                    </div>

                   <div v-if="tab === 'mf'">
                     <div class="form_content" v-if="tab === 'mf'">
                      <form action="">
                            <div class="form-group row">
                              <label for="name" class="col-sm-4 col-form-label">Email</label>
                              <div class="col-sm-8">
                                <input type="email" class="form-control form__input" v-model="mfEmail" placeholder="Email">
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="amount" class="col-sm-4 col-form-label">Transaction Reference</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control form__input" v-model="transactionRef" placeholder="Transaction Reference">
                                <div class="mt-4 mx-auto text-center">
                                  <button class="btn btn_theme"  @click="resolveMonifyPayment" :disabled="isButtonDisabled ? true : null"
                                    :style="[
                                      isButtonDisabled
                                        ? { cursor: 'not-allowed' }
                                        : { cursor: 'pointer' }
                                    ]">Resolve Payment
                                  </button>
                                    </div>
                                  </div>
                              </div>
                            
                        </form>
                    </div>
                  </div>
      </div>
    </masterLayout>
</template>

<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout';
import backImg from "@/assets/img/pattern_img.png";
import configObject from "@/config";

export default {
    components: {
        masterLayout
    },
    data() {
        return {
          backImg,
          tab: 'fw',
          email: null,
          transactionID:'',
          paymentRef: null,
          amount: null,
          remis: "isRemis",
          isButtonDisabled:  false,
          showLoader: false,
          showSpinner: false,
          mfEmail: null,
          transactionRef: null
        }
    },
    methods: {
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    },
      changeTab(tab) {
        this.tab = tab;
      },
      resolveFlutterWavePayment() {
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
      if (!this.transactionID) {
          this.$toast('transaction ID is Required', {
              type: "error",
              timeout: 3000
          });
          return;
        }
        if (!this.paymentRef) {
          this.$toast('Payment is required is Required', {
              type: "error",
              timeout: 3000
          });
          return;
        }
        if (this.isRemis === 'isRemis') {
          this.$toast('isRemis  option is required', {
              type: "error",
              timeout: 3000
          });
          return;
        }
        if (!this.amount) {
          this.$toast('Amount  is required', {
              type: "error",
              timeout: 3000
          });
          return;
        }
        this.showSpinner = true
        this.isButtonDisabled = true

        if(this.remis === 'true') {
          this.remis = true
        }
        if(this.remis === 'false') {
          this.remis = false
        }
        let data = {
          "email": this.email,
          "transactionId": this.transactionID,
          "paymentReference": this.paymentRef,
          "amount": parseFloat(this.amount),
          "remis": true
        }
        console.log(data)
        // this.axios
        //   .post(`${configObject.apiBaseUrl}​/Admin/ResolvePayment/Flutterwave`, data ,  configObject.authConfig)
        //   .then(response => {
        //     this.showSpinner = false
        //     this.isButtonDisabled = false
        //     this.$toast('Successfully resolved flutterwave payment', {
        //       type: "success",
        //       timeout: 3000
        //     });
        //   })
        //   .catch(error => {
        //     this.showSpinner = false
        //     this.isButtonDisabled = false
        //     this.$toast(error.response.data.message, {
        //       type: "error",
        //       timeout: 3000
        //     });
        //   });
      },
      resolveMonifyPayment() {
         if(!this.mfEmail) {
          this.$toast("Email  Field cannot be blank", {
              type: "error", 
              timeout: 3000
          });
          return;
      }else {
        if(!this.validateEmail(this.mfEmail)) {
          this.$toast("Invalid Email Format", {
              type: "error", 
              timeout: 3000
          });
          return;
        }
      }
      if (!this.transactionRef) {
          this.$toast('Transaction Reference is Required', {
              type: "error",
              timeout: 3000
          });
          return;
        }
        this.showSpinner = true
        this.isButtonDisabled = true
        let data = {
          "email": this.mfEmail,
          "transactionReference": this.transactionRef
        }
        console.log(data)
        this.axios
          .post(`${configObject.apiBaseUrl}​/Admin/ResolvePayment/Monnify`, data ,  configObject.authConfig)
          .then(response => {
            this.showSpinner = false
            this.isButtonDisabled = false
            this.$toast('Successfully resolved Monify payment', {
              type: "success",
              timeout: 3000
            });
          })
          .catch(error => {
            this.showSpinner = false
            this.isButtonDisabled = false
            this.$toast(error.response.data.message, {
              type: "error",
              timeout: 3000
            });
          });
      },
    }
}
</script>