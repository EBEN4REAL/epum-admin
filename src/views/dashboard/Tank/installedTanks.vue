<template>
    <masterLayout>
        <div class="row mt-3 ml-1">
            <div class="col-lg-2 col-md-3 remove_padding-right">
                 <div class="new_row_section">
                <div
                  class="small__card_content_wrapper small_card installed_tank_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">Installed Tanks</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big text-center"
                  >
                    <img src="@/assets/img/oil-tank.png" width="40px" />
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
            </div>
            <div class="col-lg-2 col-md-3 remove_padding-right">
                 <div class="new_row_section">
                <div
                  class="small__card_content_wrapper small_card installed_tank_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">Empty Tanks</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big empty_bg text-center"
                  >
                    <img src="@/assets/img/oil-tank-1.png" width="40px" />
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
            </div>
            <div class="col-lg-2 col-md-3 remove_padding-right">
                 <div class="new_row_section">
                <div
                  class="small__card_content_wrapper small_card installed_tank_card"
                  style="height: 100%"
                >
                  <p class="dashboard__card__header">Offline Tanks</p>
                  <div
                    class="icon_wrapper inner_border_radius centralize icon_div_big offline_bg text-center"
                  >
                    <img src="@/assets/img/oil-tank-2.png" width="40px" />
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
            </div>
            <div class="col-lg-6 col-md-3 remove_padding-right">
                 <div class="new_row_section installed_card small_card installed_tank_card">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="small_card inner_tank_card">
                                <div class="text-center pt-5">
                                    <router-link :to="{name: 'addTank'}" class="btn btn_device">Add New Tank</router-link>
                                </div>
                           </div> 
                        </div>
                   </div>       
                </div>
            </div>
        </div>

       <div class="new_row_section">
          <div class="small_card product_details_card mt-3">
            <div class="title">
              <h4>Installed tanks</h4>
              <hr />
            </div>
            <div class="row" style="margin-right: 0px;">
          <div
            class="col-md-4 ml-4 text-center"
          >
            <div class="product_summary__wrapper tank__header__Wrapper">
              <div
                class="product_summary_header tank__header"
              ></div>
              <h3 class="tank__name text-center mt-3">PMS Tank 1</h3>
              <div class="text-center flex___div">
                <small class="time__stamps">
                  <img src="@/assets/img/passage-of-time (1).png" width-="10px" />
                  2 mins ago
                </small>
                <div class="bowl text-center">
                  <div class="inner">
                    <!-- <div
                      class="fill"
                      v-bind:style="{
                        '--h': tank.height + 'px',
                        '--c': tank.waveColor
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
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="clearfix volume_info mt-3">
                <div class="left_div">
                  <h4 class="vol_sold">Product Level</h4>
                </div>
                <div class="right_div">
                  <h4 class="vol_sold">10,000</h4>
                </div>
              </div>
              <div class="clearfix volume_info">
                <div class="left_div">
                  <h4 class="vol_sold">Tank Capacity</h4>
                </div>
                <div class="right_div">
                  <h4 class="vol_sold">33,000.00</h4>
                </div>
              </div>
              <div class="clearfix volume_info">
                <div class="left_div">
                  <h4 class="vol_sold">Water Level</h4>
                </div>
                <div class="right_div">
                  <h4 class="vol_sold">1,937.00</h4>
                </div>
              </div>
              <div class="clearfix volume_info">
                <div class="left_div">
                  <h4 class="vol_sold">Cost Price</h4>
                </div>
                <div class="right_div">
                  <h4 class="vol_sold">1,937.00</h4>
                </div>
              </div>
              <div class="clearfix volume_info">
                <div class="left_div">
                  <h4 class="vol_sold">Selling Price</h4>
                </div>
                <div class="right_div">
                  <h4 class="vol_sold">1,937.00</h4>
                </div>
              </div>
              <div class="mt-3 pb-3 tanks_probe">
                <div class="mb-4 mt-4">
                  <router-link
                    :to="{ name: 'tankTransaction'}"
                    class="transactions__btn remove_text_decoration"
                    style="text-decoration: none"
                  >Transaction</router-link>
                  <router-link
                    :to="{ name: 'tankDipping'}"
                    class="probe_transactions_btn remove_text_decoration ml-4"
                    style="text-decoration: none"
                  >Tank Dipping</router-link>
                </div>
                <div class="mb-3">
                  <router-link
                    :to="{ name: 'editTank'}"
                    class="edit_tank_btn remove_text_decoration mt-2"
                    style="text-decoration: none"
                  >Edit Tank</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    return {
    };
  },
  methods: {
    getTanksCount() {
      this.axios
        .get(`${configObject.apiBaseUrl}​/Dashboard/Branch/TankCount/${this.$route.query.companyBranchId}`, configObject.authConfig)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
};
</script>
