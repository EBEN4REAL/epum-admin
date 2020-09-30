<template>
  <masterLayout>
    <section class="mt-3 full__row_section">
      <div class="row">
        <div class="col-md-12">
          <div class="banner">
            <h4>Create Company</h4>
          </div>
        </div>
      </div>
    </section>
    <div
      class="full__row_section mt-3 center_div margin-top-center-div ep_card"
    >
      <div class="">
        <form>
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label> Company Name</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Company Name" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>Phone</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Phone" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>Email</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Email" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>Street</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="Street" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>City</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="City" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>Country</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <!-- <input type="text" placeholder="Country" class="" /> -->
                  <select class="form-control" >
                      <option value="Select a Country" disabled>Select a Country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>State</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" placeholder="State" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>Company Products</label>
              </div>
              <div class="col-md-8 text-left">
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="LPG">
                 <label class="form-check-label">LPG</label>
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="DPK">
                 <label class="form-check-label">DPK</label>
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="AGO">
                 <label class="form-check-label">AGO</label>
                </div>
                <div class="form-check form-check-inline">
                 <input class="form-check-input" type="checkbox" id="" value="PMS">
                 <label class="form-check-label">PMS</label>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4">
                <label>Upload Company Logo</label>
              </div>
              <div class="col-md-8">
                <div class="text-left input__block">
                  <input type="file" />
                </div>
              </div>
            </div>
            <div class="text-center mt-3">
              <button class="btn btn_theme">Save</button>
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

export default {
  components: {
    masterLayout,
  },

  mounted() {},
  data() {
    return {};
  },
};
</script>
