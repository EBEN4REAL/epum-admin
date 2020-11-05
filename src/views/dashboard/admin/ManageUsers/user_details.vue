<template>
  <masterLayout>
      <div class="user_details">
          <div class="new_row_section mb-3">
          <div class="small_card product_details_card mt-3">
            <div class="row">
              <div class="col-lg-4 col-md-2 user_contact border-right">
                <div class="d-flex justify-content-between">
                    <div class="image">
                        <img src="@/assets/img/company_icon.png" width="60px" />
                    </div>
                    <div class="mobile_resposive__list">
                        <h5>OMORUYI ISAAC</h5>
                        <p class="font-italic mt-3">omoruyiisaac@gmail.com</p>
                        <p class="font-italic text-dark">+2348056120987</p>
                    </div>
                </div>
              </div>
               <div class="col-lg-3 col-md-2 credit_limit border-right">
                <div class="text-center">
                <div class="mx-auto create_btn primary_btn">Credit limit</div>
                <h6 class="mt-2">30</h6>
            </div>
              </div>
              <div class="col-lg-3 col-md-2 number_roles border-right">
                <div class="text-center">
                <button class="mx-auto create_btn primary_btn">Number of roles</button>
                <h6 class="mt-2">30</h6>
              </div>
              </div>
              <div class="col-lg-2 col-md-2">
               <div class="mt-4 mx-auto text-center">
              <button class="p-2 btn btn_theme">Edit User</button>
            </div>
              </div>
            </div>
          </div>
        </div>

 <div class="new_row_section mb-3">
        <div class="row">
  <div class="col-sm-6">
    <div class="card border-0">
      <div class="card-body roles">
        <h5 class="card-title">List of roles for this user</h5>
        <div class="card-text list-roles p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4 mr-5">Customer</h6>
                <button class="mr-5 btn disabled ml-4">Red</button>
            </div>
            <div class="mobile_resposive__list">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Dealers</h6>
                <button class="mr-3 btn resolve-btn ml-4 mobile_btn">Details</button>
            </div>
            </div>
        </div>
         <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4 mr-5">Working</h6>
                <button class="btn resolve-btn ml-4 mobile_btn">Red</button>
            </div>
            <div class="mobile_resposive__list">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Developer</h6>
                <button class="mr-4 btn resolve-btn mobile_btn ml-4">Red</button>
            </div>
            </div>
        </div>
         <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4">Branch Manager</h6>
                <button class="btn resolve-btn ml-4 mobile_btn">Details</button>
            </div>
            <div class="mobile_resposive__list">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Customer</h6>
                <button class="mr-3 btn resolve-btn mobile_btn ml-4">Red</button>
            </div>
            </div>
        </div>
         <div class="card-text p-2 d-flex justify-content-between border-bottom">
            <div class="d-flex justify-content-between">
                <h6 class="ml-4">Company Admin</h6>
                <button class="btn resolve-btn ml-4 mobile_btn">Details</button>
            </div>
            <div class="mobile_resposive__list">
                <div class="d-flex justify-content-between">
                <h6 class="mr-5">Customer</h6>
                <button class="mr-3 btn resolve-btn ml-4 mobile_btn">Red</button>
            </div>
            </div>
        </div>
        <div class="border-bottom-verical"></div>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card branch-list border-0">
      <div class="card-body branch">
        <h5 class="card-title">List of companies or branch managed</h5>
       <div class="card-text p-2 d-flex justify-content-around border-bottom">
        <h6>Company name:</h6>
        <p class="user-name">Andrew Johnston</p>
        <button class="btn red-btn">Red</button>
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
