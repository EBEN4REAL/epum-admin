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
                            <p>Get started with epump company admin platform by creating and managing your dealer here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                           <router-link :to="{name: 'createDealer', query: {companyId: this.$route.query.companyId}}" class="btn create_btn primary_btn">Create Dealer</router-link>
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Dealers</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{dealersCount}}</small>
                                </div>
                            </div>
                        </div>
              </div>
            </div>
        </div>
        </section>
        <div class="new_row_section mt-3">
            <ejs-grid
                v-show="!showLoader"
                ref="dataGrid"
                :created="refreshGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                >
                <e-columns>
                    <e-column width="40" field="index" headerText="#"></e-column>
                    <e-column width="200" field="name" headerText="Dealer Name"></e-column>
                    <e-column width="200" field="city" headerText="City"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column :template="dealersTemplate" headerText="Action" width="500"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout';
import Temp from '@/components/list_of_dealers_template.vue';
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import configObject from "@/config";

import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    mounted() {
        this.getDealers()
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        this.$eventHub.$on("refreshDealersTable", () => {
            this.getDealers()
        });
    },
    data() {
        return {
            showLoader: false,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            dealersCount: 0, 
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                
            },
            dealersTemplate: function() {
                return {
                    template: Temp
                };
            }
        }
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
    methods: {
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "dealers.pdf"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getDealers() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/Dealers/${this.$route.query.companyId}`, configObject.authConfig)
                .then(res => {
                    let index = 0
                    res.data.forEach(el => {
                        el.index = ++index;
                    })
                    this.dealersCount = res.data.length
                    sessionStorage.clear()
                    localStorage.setItem("dealersList", JSON.stringify(res.data))
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data
                    });
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
    }
}
</script>