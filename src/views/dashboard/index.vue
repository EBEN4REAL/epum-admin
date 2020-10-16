<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="dashboard__cards__wrapper">
                <div class="dashboard__card small_card">
                    <div class="small__card_content_wrapper" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           Companies
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/company_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom fg-success">{{companyCount}}</h3>
                        </div>
                    </div>
                </div>
                <div class="dashboard__card  small_card" >
                    <div class="small__card_content_wrapper" style="height: 100%">
                        <h4 class="dashboard__card__header">
                            Dealers
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/dealer_icon.png" width="80px" style="opacity: 0.6;" />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom fg-blue">{{dealerCount}}</h3>
                        </div>
                    </div>
                </div>
                <div class="dashboard__card small_card" >
                     <div class="small__card_content_wrapper" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           Outlets
                        </h4>
                         <div class="mt-3">
                            <img src="@/assets/img/branch_icon.png" width="70px" style="opacity: 0.6;" />
                        </div>
                        <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom fg-danger">{{branchCount}}</h3>
                        </div>
                    </div>
                </div>
            </div>

      </section>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";

export default {
    components: {
        masterLayout
    },
    data() {
        return {
            companyCount: 0,
            branchCount: 0,
            dealerCount: 0
        }
    },
    mounted() {
        this.getCompanyCount()
        this.getBranchCount()
        this.getDealerCount()
    },
    methods: {
        getCompanyCount() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/Count`, configObject.authConfig)
                .then(res => {
                    this.companyCount = res.data
                })
                .catch(error => {

                });
        },
        getBranchCount() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/BranchCount`, configObject.authConfig)
                .then(res => {
                    this.branchCount = res.data
                })
                .catch(error => {

                });
        },
        getDealerCount() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/DealerCount`, configObject.authConfig)
                .then(res => {
                    this.dealerCount = res.data
                })
                .catch(error => {

                });
        }
    }
}
</script>