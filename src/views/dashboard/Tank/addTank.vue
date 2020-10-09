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
            <h5 class="title">Create Tank</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="full__row_section mt-3 ep_card">
      <div class="">
        <form>
          <div class="row">
            <div class="col-md-6">
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label"> Tank Name</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Product in Tank</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <select class="form-control">
                      <option disabled selected>
                        Select Product in Tank
                      </option>
                      <option>AGO </option>
                      <option>PMS </option>
                        <option>DPK </option>
                        <option>LPG </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Max Capacity of Tank</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Current Volume</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Product Cost Price</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Product Selling Price</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <hr>
              <div class="text-center mt-3">
                <button class="btn btn-success mr-3">Save</button>
                <button class="btn btn-light">Cancel</button>
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
