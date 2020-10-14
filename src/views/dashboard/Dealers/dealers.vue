<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="row make-row-hundred-percent align-items-center justify-content-center" >
                            <div class="col-md-3">
                                 <div class="icon_wrapper yellow centralize icon_div_big">
                                    <img src="@/assets/img/company_icon.png"  width="40" />
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of Dealers</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">{{dealersCount}}</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Registered Dealers.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <router-link :to="{name: 'createDealer', query: {companyId: this.$route.query.companyId}}" class="create_btn btn btn_theme">Create New Dealer</router-link>
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
                    <e-column width="300" field="name" headerText="Dealer Name"></e-column>
                    <e-column width="200" field="city" headerText="City"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column :template="dealersTemplate" headerText="Action" width="100"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
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
                    console.log(res.data)
                    let index = 0
                    res.data.forEach(el => {
                        el.index = ++index;
                    })
                    this.dealersCount = res.data.length
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