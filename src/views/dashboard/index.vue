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
                            <h3 class="dashboard__card__header_bottom fg-success">{{companiesCount}}</h3>
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
                            <h3 class="dashboard__card__header_bottom fg-blue">0</h3>
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
                            <h3 class="dashboard__card__header_bottom fg-danger">{{stationsCount}}</h3>
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
            companiesCount: 0,
            stationsCount: 0
        }
    },
    mounted() {
        this.getCompanies()
        this.getStations()
    },
    methods: {
        getCompanies() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company`, configObject.authConfig)
                .then(res => {
                    this.companiesCount = res.data.data.length
                })
                .catch(error => {

                });
        },
        getStations() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Branch/GetStations`, configObject.authConfig)
                .then(res => {
                    this.stationsCount = res.data.length
                })
                .catch(error => {

                });
        },
    }
}
</script>