<template>
    <masterLayout>
        <div class="center_div margin-top-center-div">
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
                    <input type="text" class="form-control form__input" id="" placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="amount" class="col-sm-4 col-form-label">Date</label>
                  <div class="col-sm-8">
                    <input type="date" class="form-control form__input" id="" placeholder="">
                     <div class="mt-4 mx-auto text-center">
                      <button class="btn btn_theme">Save</button>
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