<template>
  <masterLayout>
    <section class="full__row_section">
      <div class="row">
        <div class="col-lg-9 col-md-6">
          <div class="new_row_section">
            <div class="row mt-3">
              <div class="col-lg-3 col-md-3 remove_padding-right">
                <div
                  class="small__card_content_wrapper small_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">Outlets</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold"
                    >
                      123
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 remove_padding-right">
                <div
                  class="small__card_content_wrapper small_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">PMS Available</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="mt-3">
                    <small class="dashboard__card__header_bottom font-weight-bold"
                      >123</small
                    >
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 remove_padding-right">
                <div
                  class="small__card_content_wrapper small_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">AGO Available</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="mt-3">
                    <small class="dashboard__card__header_bottom font-weight-bold"
                      >123</small
                    >
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 remove_padding-right">
                <div
                  class="small__card_content_wrapper small_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">DPK Available</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="mt-3">
                    <small class="dashboard__card__header_bottom font-weight-bold"
                      >123</small
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="small_card mt-3">
              <div class="title">
                <h4>Product Available in Stock</h4>
                <hr />
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-2 border-right">
                  <div class="text-center mt-3">
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="text-center">
                    <h6 class="dashboard__card__header">PMS Available</h6>

                    <div class="mt-3">
                      <small
                        class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >
                        123
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-2 border-right">
                  <div class="text-center mt-3">
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="text-center">
                    <h6 class="dashboard__card__header">PMS Available</h6>

                    <div class="mt-3">
                      <small
                        class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >
                        123
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-2">
                  <div class="text-center">
                    <img
                      src="@/assets/img/branch_icon.png"
                      width="60px"
                      style="opacity: 0.6"
                    />
                  </div>
                  <div class="text-center">
                    <h6 class="dashboard__card__header">PMS Available</h6>

                    <div class="mt-3">
                      <small
                        class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                      >
                        123
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="small_card mt-3">
              <div class="title">
                <h4>Installed Tanks</h4>
                <hr />
              </div>
              <!-- <div class="row">
                <div class="col-lg-4 col-md-2 border-right">
                  <div class="low_tank text-center">
                    <h4 class="tank__name__header low_tank_name">DPK Tank 2</h4>
                    <p style="margin-bottom: 0 !important" class="max-lines">
                      Last Seen 2hrs
                    </p>
                    <div class="animated__tanks__div">
                      <div class="bowl" style="margin-left: 25%">
                        <div class="inner">
                          <div
                            class="fill"
                            v-bind:style="{
                              '--h': lowTank.height + 'px',
                              '--c': lowTank.color,
                            }"
                          >
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              width="300px"
                              height="300px"
                              viewBox="0 0 300 300"
                              enable-background="new 0 0 300 300"
                              xml:space="preserve"
                            >
                              <path
                                class="waveShape"
                                d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
                                      c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
                                      c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="clearfix mt-3">
                      <div class="left_div">
                        <span class="left">Volume:</span>
                      </div>
                      <div class="right_div">
                        <span class="litres"> 10,000.00 </span>
                      </div>
                    </div>
                    <div class="clearfix pb-4 mt-2">
                      <div class="left_div">
                        <span class="left">Capacity:</span>
                      </div>
                      <div class="right_div">
                        <span class="litres"> 33,000.00 </span>
                      </div>
                    </div>
                    <div class="clearfix pb-4 mt-2">
                      <div class="left_div">
                        <span class="left">Water:</span>
                      </div>
                      <div class="right_div">
                        <span class="litres"> 00.00 </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 border-right">
                <div class="text-center mt-3">
                  <img
                    src="@/assets/img/branch_icon.png"
                    width="60px"
                    style="opacity: 0.6"
                  />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">PMS Available</h6>

                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                      123
                    </small>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2">
                <div class="text-center">
                  <img
                    src="@/assets/img/branch_icon.png"
                    width="60px"
                    style="opacity: 0.6"
                  />
                </div>
                <div class="text-center">
                  <h6 class="dashboard__card__header">PMS Available</h6>

                  <div class="mt-3">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold branch_details_font"
                    >
                      123
                    </small>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="branch_card position-fixed">
            <div class="">
              <div class="row align-items-center mt-3">
                <div class="col-md-6 mt-2 text-left">
                  <p>Branch Name:</p>
                </div>
                <div class="col-md-6">
                  <div class="">
                    <h6 class="font-weight">
                      {{comapanyBranchObj.name}}
                    </h6>
                  </div>
                </div>
              </div>
              <div class="small__card_content_wrapper small_card">
                <h4 class="dashboard__card__header">Outlets</h4>
                <div
                  class="icon_wrapper yellow centralize icon_div_big text-center mt-3"
                >
                  <img
                    src="@/assets/img/branch_icon.png"
                    width="60px"
                    style="opacity: 0.6"
                  />
                </div>
                <div class="mt-3">
                  <h3 class="dashboard__card__header_bottom">123</h3>
                </div>
              </div>
              <div class="align-items-center mt-3">
                <div class="row">
                  <div class="col-md-5">
                     <small> Phone:</small>
                  </div>
                  <div class="col-md-7">
                    <span class="">
                      {{comapanyBranchObj.phone}}
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5">
                     <small>Email:</small>
                  </div>
                  <div class="col-md-7">
                    <bold class="">
                      {{comapanyBranchObj.email}}
                    </bold>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5">
                     <small>Adress:</small>
                  </div>
                  <div class="col-md-7">
                    <bold class="small-boold">
                       {{`${comapanyBranchObj.street},${comapanyBranchObj.city},${comapanyBranchObj.state},${comapanyBranchObj.country}`}}
                    </bold>
                  </div>
                </div>
              </div>
              <div class="mt-4 mx-auto text-center">
                <router-link
                  :to="{ name: 'addDevice' }"
                  class="create_btn btn btn_theme"
                  >Add Device</router-link
                >
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";

export default {
  components: {
    masterLayout,
    
  },

  mounted() {
    this.companyBranchId = this.$route.query.companyBranchId
    let ml = sessionStorage.getItem(this.companyBranchId)
    if (!ml){
        let allData = localStorage.getItem("companyBranchesList")
        let dt = JSON.parse(allData)
        dt.forEach((my, index) =>{
            if(my.id === this.companyBranchId){
                ml = JSON.stringify(my)
                sessionStorage.setItem(this.companyBranchId, ml)
            }
        })
    }
    let companyBranchDetails = JSON.parse(ml)
    this.comapanyBranchObj = companyBranchDetails
    console.log(this.comapanyBranchObj)
  },
  data() {
    return {
      lowTanks: [],
      comapanyBranchObj: {}
    };
  },
};
</script>
