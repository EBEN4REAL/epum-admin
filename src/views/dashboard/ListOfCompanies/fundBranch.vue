<template>
  <masterLayout>
    <section
      class="mt-3 full__row_section banner-gradient"
      :style="[
        {
          backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
      ]"
    >
      <div
        class="row align-items-center justify-content-center hundred-percent-height"
      >
        <div class="col-md-12">
          <div class="text-center">
            <h5 class="title">Fund Branch</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="full__row_section center_div margin-top-center-div mt-3 ep_card">
      <div class="">
        <form>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label> Branch Name</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
               <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label>Branch Contact</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
               <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label> Branch Address </label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <textarea type="text" placeholder="" style="height: 50px;"> </textarea>
                  </div>
                </div>
              </div>
               <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label> Branch Account Balance</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
               <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label> Account Name </label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label>Account Number</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="number" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label>Bank</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label>Amount Deposited</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="Enter the Amount Deposited" class="" />
                  </div>
                </div>
              </div>
               <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label>Upload Document</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="file"/>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <button class="btn btn_theme">Save</button>
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

export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {
      backgroundUrl,
    };
  },
};
</script>
