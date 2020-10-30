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
                            <p>Get started with epump company admin platform by managing your devices here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Devices</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >50</small>
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
                :allowPaging="false"
                :actionBegin='actionHandler'
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                >
                <e-columns>
                    <e-column width="200" field="devices" headerText="Devices"></e-column>
                    <e-column width="200" field="lastUpdate" headerText="Last Update"></e-column>
                    <e-column width="200" field="fwVersion" headerText="FW Version"></e-column>
                    <e-column width="200" field="memoryUsage" headerText="Memory Usage"></e-column>
                    <e-column width="200" field="name" headerText="Name"></e-column>
                    <e-column width="200" field="state" headerText="State"></e-column>
                    <e-column width="200" field="firmwareUpdate" headerText="Firmware Update"></e-column>
                    <e-column :template="list_of_device" headerText="Action" width="500"></e-column>
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
            <DropDown :details="details"/>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/list_of_device.vue';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
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
        DropDown
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    data() {
        return {
            companiesCount: 0,
            searchLoader: false,
            sortingTable: false,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            sortType: '',
            sortColumn: '',
            searchValue: '',
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            searchTotalPages: 1,
            showLoader: false,
            tableCount: 0, 
            details: {
                queryStrings: { companyId: '' }, 
                info: [{ name: 'Edit', link: '' }, { name: 'Shut Down', link: 'mail_recipient' }], 
                delete: { hasDelete: false, deleteName: 'deleteCompany' }
                // delete: { hasDelete: true, deleteName: 'deleteCompany', arg: 'companyId'}
            }, 
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        state: "",
                        firmwareUpdate: "",
                    }
            ],
            },
            list_of_device: function() {
                return {
                    template: Temp
                };
            }
        }
    },
    mounted() {
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
    methods: {
        
    }
}
</script>