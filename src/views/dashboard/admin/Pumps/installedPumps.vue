<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-8 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by creating and managing your installed pumps here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                           <router-link :to="{name: 'addPump', query: { companyBranchId: this.$route.query.companyBranchId }}" class="btn create_btn primary_btn"> Add More Pump</router-link>
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Installed Pumps</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{pumpCount}}</small>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>
        <section class="new_row_section mt-3">
            <div class="row pb-3" style="margin-right: 0px;">
                <div
                class="col-md-4 text-center"
                v-for="(pump, index) in pumps"
                :key="index"
                style="padding: 0px 15px !important; margin-bottom: 20px"
                >
                <div class="pump_holder">
                    <div
                    class="pump_header"
                    :style="{ '--vh': pump.color }"
                    ></div>
                    <h3 class="pump_name text-center mt-3">{{ pump.displayName }}</h3>
                    <div class="text-center flex_div">
                        <small class="time_stamps">
                            <img src="@/assets/img/passage-of-time (1).png" width-="18px" />
                            {{ pump.lastSeen }}
                        </small>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/Group 806.png" />
                        </div>
                    </div>
                    <div class="clearfix volume_info mt-3">
                        <div class="left_div">
                            <h4 class="vol_sold">Last Reading</h4>
                        </div>
                        <div class="right_div">
                            <h4 class="litres">{{ convertThousand(pump.currentReading) }}</h4>
                        </div>
                    </div>
                    <div class="clearfix volume_info">
                        <div class="left_div">
                            <h4 class="vol_sold">Manufacturer</h4>
                        </div>
                        <div class="right_div">
                            <h4 class="litres">{{ pump.manufacturer }}</h4>
                        </div>
                    </div>
                    <div class="clearfix volume_info">
                        <div class="left_div">
                            <h4 class="litres">Source Tank</h4>
                        </div>
                        <div class="right_div">
                            <h4 class="litres">{{ pump.tankName }}</h4>
                        </div>
                    </div>
                    <div
                    class="mt-4 pb-3 pumps_probe"
                    style="display: flex; justify-content: space-evenly"
                    >
                        <!-- <div class="mb-4 remove_pumps_margin" style="margin-right: 1rem"> -->
                        <div class="mb-4 remove_pumps_margin">
                            <router-link
                            :to="{ name: 'pumpDetails', query: {companyBranchId: $route.query.companyBranchId, id: pump.id} }"
                            class="transactions_btn"
                            style="text-decoration: none"
                            >Details</router-link>
                        </div>
                        <!-- <div class="mb-3">
                            <router-link
                            :to="{ name: 'pump_transactions', query: {branchId: $route.query.branchId, id: pump.id} }"
                            class="probe_transactions_btn"
                            style="text-decoration: none"
                            >Transactions</router-link>
                        </div> -->
                    </div>
                </div>
                </div>
            </div>
            <div
            style="background: white; display: flex; justify-content: center; align-items: center; flex-flow: column wrap; height: 300px;"
            v-if="!pumps || pumps.length < 1 && !showLoader"
            >
                <div class="text-center" style="margin-top: 30px">
                    <h3 style="color: rgb(161, 146, 146); font-size: 35px;">No Pumps Added</h3>
                </div>
            </div>
            <TableLoader :showLoader="showLoader" />
        </section>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import TableLoader from "@/components/tableLoader/index";
import masterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
// import EjsTable from '@/components/ejsTable.vue';
// import Temp from '@/components/installed_pumps_template.vue';

import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader
    },
    mounted() {
        this.getPumps();
    },
    data() {
        return {
            showLoader: false,
            pumps: [],
            pumpCount: 0,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
        }
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
    methods: {
        getPumps() {
            this.showLoader = true;
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Branch/Pumps/${this.$route.query.companyBranchId}`, configObject.authConfig)
                .then(response => {
                    sessionStorage.clear()
                    localStorage.setItem("pumpsList", JSON.stringify(response.data))
                    response.data.forEach(element => {
                        if (element.productName !== undefined) {
                            if (element.productName.toLowerCase() === 'pms') {
                                element.color = "#d8991c";
                            } else if (element.productName.toLowerCase() === 'ago') {
                                element.color = "#0fce29";
                            } else if (element.productName.toLowerCase() === 'dpk') {
                                element.color = "#00aced";
                            } else if (element.productName.toLowerCase() === 'lpg') {
                                element.color = "purple";
                            }
                        }
                    });

                    response.data.sort((a, b) =>
                        a.productName.toLowerCase() < b.productName.toLowerCase()
                        ? -1
                        : a.productName.toLowerCase() > b.productName.toLowerCase()
                        ? 1
                        : 0
                    );

                    this.pumps = response.data;
                    this.pumpCount = response.data.length;
                    this.showLoader = false
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
        convertThousand(request) {
            if (!isFinite(request) || request == undefined || request == null) {
                return "0.00";
            }
            return request
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    }
}
</script>