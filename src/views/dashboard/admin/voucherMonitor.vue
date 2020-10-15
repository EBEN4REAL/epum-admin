<template>
    <masterLayout>
        <div class="center_div voucher_container margin-top-center-div">
          <div class="pad_div">
            <div class="mt-3 tabs__lists">
                <h5>VOUCHER MONITOR</h5>
            </div>
          </div>
          <div class="form_content">
          <form>
                <div class="form-group row">
                  <label for="amount" class="col-sm-4 col-form-label">VOUCHER PIN TO VERIFY</label>
                  <div class="col-sm-8">
                    <input type="number" class="form-control form__input" id="inputVoucher" placeholder="e.g. 1234567890" v-model="voucherPin">
                      <div class="mt-4 mx-auto text-center">
                        <button class="btn btn_theme" 
                        @click="verifyVoucher($event)"
                        :disabled="isButtonDisabled ? true : null"
                        :style="[
                            isButtonDisabled
                            ? { cursor: 'not-allowed' }
                            : { cursor: 'pointer' }
                        ]"
                        >
                          Verify Voucher
                        </button>
                      </div>
                  </div>
                </div>
            </form>
          </div>
          <div
            class="pattern_sec"
            :style="[
                  {
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundImage: `linear-gradient(rgb(55, 15, 112 , 0.001), rgb(55, 15, 112 ,0.001)), url(${backImg})`,
                  }
                  ]"
          ></div>
      </div>
    </masterLayout>
</template>

<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout';
import backImg from "@/assets/img/pattern_img.png";
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout
    },
    data() {
        return {
          backImg,
          voucherPin: '',
          isButtonDisabled: false
        }
    },
    methods: {
      verifyVoucher(event) {
        event.preventDefault()
        if(!this.voucherPin) {
          this.$toast("Please input a voucher pin", {
              type: "error", 
              timeout: 3000
          });
          return;
        }

      this.isButtonDisabled = true

      this.axios.get(`${configObject.apiBaseUrl}/Sale/VerifyVoucher?voucher=${this.voucherPin.toString()}`, configObject.authConfig)
                .then(res => {
                    this.$toast("Successfully verified voucher", {
                        type: "success",
                        timeout: 3000
                    });
                    this.isButtonDisabled = false;
                    console.log(res.data)
                    $('.loader').hide();
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast("Failed to verify voucher", {
                        type: "error",
                        timeout: 3000
                    });
                });
      }
    }
}
</script>