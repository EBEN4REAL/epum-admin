<template>
  <masterLayout>
    <div class="row">
      <div class="col-lg-9 col-md-6">
        <div class="new_row_section">
          <div class="row mt-3">
            <div class="col-lg-12 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by creating and managing your company here</p>
                        </div>
                        <div class="col-md-4">
                            
                        </div>
                    </div>
                </div>
             </div>
            </div>

          <div class="small_card product_details_card audit-sales mt-3">
              <div class="row p-4 align-items-center">
            <div class="col-md-4">
                <div class="start-date input__block">
                    <input type="date" name="" placeholder="set a date" id="" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="start-date ml-5 input__block">
                    <input type="date" name="" id="" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="text-center">
                    <button class="btn btn-success text-white"><i class="fa fa-plus mr-2"></i>Download</button>
                </div>
            </div>

            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div class="branch_card audit-sales-card position-fixed">
          <div class="">
            <div class="row align-items-center mt-3">
              <div class="col-md-6 mt-2 text-left">
                <p>Branch Name</p>
              </div>
              <div class="col-md-6">
                <div class="">
                  <p style="font-size: 20px; font-weight: bold;"></p>
                </div>
              </div>
            </div>
            <div class="align-items-center mt-3">
              <p style="font-size: 13px">
                Company Name<span
                  class="font-weight-bold ml-2"
                  style="font-size: 13px"
                  ></span
                >
              </p>
              <p style="font-size: 13px">
                Company City<span
                  class="font-weight-bold text-left ml-2"
                  style="font-size: 13px"
                  ></span
                >
              </p>
              <p style="font-size: 13px">
                Country<span
                  class="font-weight-bold ml-2"
                  style="font-size: 13px"
                  ></span
                >
              </p>
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
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import TableLoader from "@/components/tableLoader/index";

export default {
  components: {
    masterLayout,
    TableLoader
  },
 
  data() {
    return {
        userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
      showLoader: false
    };
  },
  computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
  methods: {

  },
};
</script>
