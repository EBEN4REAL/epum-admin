<template>
    <masterLayout>
        <div class="center_div">
        <div class="pad_div">
          <div class="mt-3 tabs__lists">
              <h3>Resolve USSD Voucher</h3>
          </div>
        </div>
        <div class="form_content">
          <!-- <div class="input_holder">
            <div class="mt-4">
              <input type="hidden" class="email" />
              <input type="hidden" class="phone" />
              <input type="hidden" class="publicKey" />
              <input type="hidden" name="trxRef" class="trxRef" />
              <input type="hidden" name="flwRef" class="flwRef" />
              <input
                type="number"
                name="amount"
                class="form-control form__input amount"
                placeholder="Amount"
                style="width: 100%"
              />
            </div>
          </div> -->

          <form action="">
              <div class="form-group row">
    <label for="name" class="col-sm-4 col-form-label">Transaction Reference</label>
    <div class="col-sm-8">
      <input type="name" class="form-control form__input" id="transactionRef" placeholder="Transaction Reference">
    </div>
  </div>
  <div class="form-group row">
    <label for="phonenumber" class="col-sm-4 col-form-label">Phone Number</label>
    <div class="col-sm-8">
      <input type="number" class="form-control form__input" id="inputphoneNumber" placeholder="Recipient's Phone Number">
    </div>
  </div>
  <div class="form-group row">
    <label for="amount" class="col-sm-4 col-form-label">Amount</label>
    <div class="col-sm-8">
      <input type="number" class="form-control form__input" id="inputAmount" placeholder="Amount">
    </div>
  </div>
          
          <div class="mt-4 text-center">
            <button class="btn btn_theme">Resolve</button>
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

export default {
    components: {
        masterLayout
    },
    data() {
        return {
          backImg,
        }
    }
}
</script>