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
                            <p>Get started with epump company admin platform by creating and managing your dealer retail outlets here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                           <router-link :to="{name: 'create_dealer_branch', query: {dealerId: this.$route.query.dealerId, companyId: this.$route.query.companyId }}" class="btn create_btn primary_btn">Create New Outlet</router-link>
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Dealer Retail Outlets</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{branchesCount}}</small>
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
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <!-- <e-column width="200" field="companyName" headerText="Company Name"></e-column> -->
                    <e-column width="200" field="dealerName" headerText="Dealer Name"></e-column>
                    <e-column width="200" field="name" headerText="Name"></e-column>
                    <e-column width="200" field="city" headerText="City"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column :template="branchesTemplate" headerText="Action" width="350"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
            <DropDown :details="details"/>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/list_of_branches_template.vue';
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';



import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader,
        DropDown
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    created() {
        this.$eventHub.$on('showExtraBranchesButtons', (data, that) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            const currentGrid = this.searchValue ? grid.currentViewData : []
            
            this.details.queryStrings.companyBranchId = data.id
            const drop = that.$parent.ej2Instances.pageSettings.pageSize
            let index 
            if (currentGrid.length && (currentGrid.length !== this.branchesCount)) {
                index = currentGrid.findIndex((cur) => cur.index == data.index) + 1
            } else {
                index = data.index 
            }
            const indent = index - (Math.floor((index - 1) / drop) * drop)
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            if ((index == this.branchesCount && this.branchesCount > 1) || (index == (this.branchesCount - 1) && this.branchesCount > 1)) {
                const num = this.details.delete.hasDelete ? 1 : 0
                option.style.top = `${(((62 * (indent - 1))) + 108 - (32 * (num + this.details.info.length))).toString()}px`
            } else {
                option.style.top = `${((62 * indent) + (100 - (indent * 2))).toString()}px`
            }
        })
    },
    beforeDestroy() { 
        this.$eventHub.$off('showExtraBranchesButtons');
    },
    mounted() {
        this.getBranches();
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        
        const searchFun = (event) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            this.searchValue = value
            grid.search(value);
        }
    },
    data() {
        return {
            searchValue: '',
            showLoader: false,
            branchesCount: 0,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            details: {
                queryStrings: { companyBranchId: '', companyId: this.$route.query.companyId }, 
                info: [{ name: 'Mail Receipient', link: 'branchMail_recipent' }, { name: 'POS Terminal', link: 'pos_terminals' }], 
                delete: { hasDelete: false, deleteName: ''}
            },
            branchesTemplate: function() {
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
                        fileName: "branches.pdf"
                    }
                    this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getBranches() {
            this.showLoader = true;
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/DealerBranches/${this.$route.query.dealerId}`, configObject.authConfig())
                .then(res => {
                    let index = 0
                    res.data.sort((a, b) => {
                        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                    });
                    res.data.forEach(el => {
                        el.index = ++index;
                    })
                    sessionStorage.clear()
                    localStorage.setItem("branchesList", JSON.stringify(res.data))
                    this.branchesCount = res.data.length
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