<template>
    <masterLayout>
        <div class="center_div mt-3 pb-2">
          <div class="pad_div">
            <div class="mt-3 tabs__lists">
                <h5>Extend Voucher</h5>
            </div>
          </div>
          <div class="form_content">
          <form action="">
                <div class="form-group row">
                  <label for="name" class="col-sm-4 col-form-label">Pin</label>
                  <div class="col-sm-8">
                    <input type="number" class="form-control form__input" v-model="pin">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="amount" class="col-sm-4 col-form-label">Date</label>
                  <div class="col-sm-8">
                    <vue-ctk-date-time-picker
                      id="DateTimePicker"
                      v-model="expiry"
                      color="#290C53"
                      format="YYYY-MM-DDTHH:mm:ss"
                      formatted="DD/MM/YYYY h:mm a"
                      label="Select date and time"
                      :min-date="minDate"
                    />
                     <div class="mt-4 mx-auto text-center">
                      <button class="btn btn_theme" @click="extendVoucher"
                    :disabled="isButtonDisabled ? true : null"
                    :style="[
                      isButtonDisabled
                        ? { cursor: 'not-allowed' }
                        : { cursor: 'pointer' }
                    ]"
                    >Extend
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
                 
            </form>
          </div>
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
          pin: '',
          expiry: "", 
          isButtonDisabled: false,
          minDate:this.$moment(new Date()).format("YYYY-MM-DD"),
        }
    },
    methods: {
      extendVoucher(event) {
        event.preventDefault();
        if(!this.pin) {
            this.$toast("Please input a pin", {
                type: "error", 
                timeout: 3000
            });
            return;
        }

        if(!this.expiry) {
            this.$toast("Please select a date", {
                type: "error", 
                timeout: 3000
            });
            return;
        }

        $('.loader').show();
        this.isButtonDisabled = true;

        this.axios.put(`${configObject.apiBaseUrl}/Admin/ExtendVoucher?Pin=${this.pin}&Expiry=${this.expiry}`, {}, configObject.authConfig())
            .then(res => {
                  this.$toast("Successfully Extended Voucher", {
                      type: "success",
                      timeout: 3000
                  });
                  this.isButtonDisabled = false;
                  $('.loader').hide();
                  this.$router.push({ name: 'voucherMonitor' })
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
}
</script>