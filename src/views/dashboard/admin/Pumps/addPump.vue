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
            <h5 class="title">Create Pump</h5>
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
                  <label class="label">Associate Pump to Tank</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <select class="form-control">
                      <option disabled selected>
                        Select Associate Pump to Tank
                      </option>
                      <option>AGO Tank 1</option>
                      <option>PMS Tank 1</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Manufacturer</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Model</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Version</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-5">
                <div class="col-md-4">
                  <label class="font-weight"> Pump</label>
                </div>
                <div class="col-md-8">
                  <div class="float-right">
                    <button class="btn btn-success">
                      <i class="fa fa-plus"></i>Add Pump
                    </button>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label"> Pump Name</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Display Name</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" />
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <button class="btn btn_theme">Update</button>
                <button class="btn btn_theme">Cancel</button>
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
