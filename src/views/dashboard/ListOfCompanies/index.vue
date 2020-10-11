<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card" :style="[
                        {
                            background: '#370F70',
                        }
                        ]">
                        <div class="row make-row-hundred-percent align-items-center justify-content-center" >
                            <div class="col-md-3">
                                 <div class="icon_wrapper yellow centralize icon_div_big">
                                    <img src="@/assets/img/company_icon.png"  width="40" />
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of Companies</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">{{companiesCount}}</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Registered Companies.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <router-link :to="{name: 'create_companies'}" class="create_btn btn btn_theme">Create Company</router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-3">
             <ejs-grid
                ref="dataGrid"
                :created="refreshGrid"
                :allowPaging="false"
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
                    <e-column width="200" field="name" headerText="Company Name"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column width="200" field="street" headerText="Street"></e-column>
                    <e-column width="200" field="city" headerText="city"></e-column>
                    <e-column :template="list_of_companies_templates" headerText="Action" width="350"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
            <div class="mt-3" style="margin:  0 auto">
                <Paginator 
                    v-show="!showLoader"
                    :total-pages="totalPages"
                    :per-page="pageSize"
                    :current-page="currentPage"
                    @pagechanged="onPageChange"
                    @getPageSize="getPageSize"
                    :pageSize="pageSize"
                />
            </div>  
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/list_of_companies_template.vue';
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TableLoader from "@/components/tableLoader/index";
import Paginator from '@/components/Paginator.vue';
import configObject from "@/config";

import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader,
        Paginator,

    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    data() {
        return {
            companiesCount: 0,
            searchLoader: false,
            sortingTable: false,
            sortType: '',
            sortColumn: '',
            searchValue: '',
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            searchTotalPages: 1,
            showLoader: true,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
               
            },
            list_of_companies_templates: function() {
                return {
                    template: Temp
                };
            }
        }
    },
    mounted() {
        this.getCompanies();
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
         this.$eventHub.$on("refreshCompaniesList", () => {
            this.getCompanies()
        });
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
                    fileName: "List_of_companies"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getPageSize(pageSize) {
            this.pageSize = pageSize;
            this.currentPage = 1
            this.totalPages = Math.ceil(this.getCompanies.totalNumber / pageSize)
            this.getCompanies();
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getCompanies();
        },
        getCompanies() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company?PageNumber=${this.currentPage}&PageSize=${this.pageSize}`, configObject.authConfig)
                .then(res => {
                console.log(res.data);
                let index = 0 + ((this.currentPage - 1) * this.pageSize);
                res.data.data.forEach(el => {
                    el.index = ++index;
                })
                localStorage.setItem("companiesList", JSON.stringify(res.data.data))
                this.companiesCount = res.data.data.length
                this.$refs.dataGrid.ej2Instances.setProperties({
                    dataSource: res.data.data
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