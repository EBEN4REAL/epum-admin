<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
           <div class="devices-card">
                <div class="row px-5">
                <div class="col-lg-6">
                    <div class="device-header">
                        <h5>ETERNAL FILLING STATION DEVICE DATAILS</h5>
                        <p>Synced Transactions: 0.00, Un-Synced Transactions: 0.00</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="transactionc_card p-1 text-white text-center">
                        <h6>TOTAL DEVICE TRANSACTIONS</h6>
                        <p>0.00</p>
                    </div>
                </div>
            </div>
           </div>
        </section>
        
        <div class="mt-3 full__row_section device_details_card">
            <div class="small_card p-3">
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>BRANCH NAME</h6>
                           <h5>ETERNA SERVICE STATION ILARA MOKIN</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>FIRMWARE VERSION</h6>
                           <div class="flex_card">
                               <h5>Device Can Not Update</h5>
                               <router-link :to="{name: ''}" class="resolve-btn">Revert</router-link>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>PHONE NUMBER</h6>
                           <h5>08032704382</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>SHOULD DEVICE RESTART?</h6>
                           <div class="flex_card">
                               <h5>Device is Not Set for Restart</h5>
                               <router-link :to="{name: ''}" class="resolve-btn">Set to restart</router-link>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>BRANCH EMAIL</h6>
                           <h5>eternailaramokin@mailinator.com</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>MEMORY USAGE</h6>
                           <div class="flex_card">
                               <h5>Device is Not Set for Memory Reset</h5>
                               <router-link :to="{name: ''}" class="resolve-btn">Set to restart</router-link>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>BRANCH ADDRESS</h6>
                           <h5>ILARA MOKIN, AKURE, Ondo</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                      <div class="card_border p-3">
                           <h6>LAST UPDATE DOWNLOAD</h6>
                           <p>Not Downloaded Yet</p>
                       </div>
                   </div>
               </div>
               <div class="row mt-4">
                   <div class="col-lg-6 col-md-6">
                       <div class="card_border p-3">
                           <h6>DEVICE EVENTS</h6>
                           <h5>Total Events: 0.00</h5>
                       </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                      <div class="card_border p-3">
                           <h6>DEVICE TYPE</h6>
                           <h5>POS</h5>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    </masterLayout>
</template>

i<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import Jquery from 'jquery';
let $ = Jquery;
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },
  data() {
    return {
    };
  },
  mounted() {
       },
  methods: {
    
  }
};
</script>