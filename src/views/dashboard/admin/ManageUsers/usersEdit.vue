<template>
  <masterLayout>
      <div class="users_edit">
          <div class="new_row_section mb-3">
          <div class="small_card product_details_card mt-3">
            <div class="row">
              <div class="col-lg-3 col-md-2 user_contact border-right">
                <div class="text-center">
                <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/clock (4).svg" width="60px" />
              </div>
                    <router-link title="" :to="{name:'map_user_branch'}" class="mx-auto btn create_btn primary_btn colour_one" > Map User To Branch
                    </router-link>
                </div>
              </div>
               <div class="col-lg-3 col-md-2 credit_limit border-right">
                <div class="text-center">
              <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/truck.svg" width="60px" />
              </div>
                <router-link :to="{name:'map_user_dealer'}" class="btn mx-auto create_btn primary_btn colour_two" >
                    Map User To Dealer
                </router-link>
            </div>
              </div>
              <div class="col-lg-3 col-md-2 number_roles border-right">
                <div class="text-center">
              <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/car-parking.svg" width="60px" />
              </div>
                <router-link :to="{name:'map_user_to_comapny'}" class="btn mx-auto create_btn primary_btn colour_three" >Map User To Company
          </router-link>
              </div>
              </div>
              <div class="col-lg-3 col-md-2">
               <div class="text-center">
                   <div class="icon_wrapper centralize icon_div_big mx-auto text-center">
                    <img src="@/assets/img/truck.svg" width="60px" />
              </div>
              <router-link :to="{name:'removeUserRole'}" class="btn mx-auto create_btn primary_btn colour_three" > Remove User Role
          </router-link>
            </div>
              </div>
            </div>
          </div>
        </div>

 <div class="new_row_section mb-3">
     <div class="bg_image">
         <img src="@/assets/img/backimage.svg" alt="" height="30%">
     </div>
      </div>
      </div>    
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
  },

  mounted() {
  },
  data() {
    return {
    };
  },
  
  methods: {
  },
};
</script>
