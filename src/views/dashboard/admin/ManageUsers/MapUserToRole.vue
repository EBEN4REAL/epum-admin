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
            <h5 class="title">Map User To Role</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="">
        <form>
          <div class="text-center">
             <div class="row mt-3">
              <div class="col-md-4 text-left">
                <small>Select Role</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" >
                      <option disabled selected>Select Role</option>
                      <option>Branch Manager</option>
                      <option>Company Admin</option>
                      <option>Industry Manager</option>
                  </select>
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn_theme">Add User</button>
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

export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {
      backgroundUrl
    };
  },
};
</script>
