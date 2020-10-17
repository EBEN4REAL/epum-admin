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
                            <p>Get started with epump company admin platform by creating and managing your company here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                           <router-link :to="{name: 'create_companies'}" class="btn create_btn primary_btn">Create Company</router-link>
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of companies</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{companiesCount}}</small>
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
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                >
                <e-columns>
                    <e-column :template="companies_image" width="100" headerText="Logo"></e-column>
                    <e-column width="200" field="name" headerText="Company Name"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column width="200" field="city" headerText="City"></e-column>
                    <e-column :template="list_of_companies_templates" headerText="Action" width="500"></e-column>
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
import Temp from '@/components/list_of_companies_template.vue';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
import Templates from '@/components/Templates/imageTemplates/companies_image.vue';
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
            showLoader: true,
            tableCount: 0, // this is needed for the blahblah
            details: {
                queryStrings: { companyId: '' }, 
                info: [{ name: 'Edit', link: 'edit_companies' }, { name: 'Mail Receipient', link: 'mail_recipient' }], 
                delete: { hasDelete: true, deleteName: 'deleteCompany' }
                // delete: { hasDelete: true, deleteName: 'deleteCompany', arg: 'companyId'}
            }, // this is needed for the blahblah
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
               
            },
            list_of_companies_templates: function() {
                return {
                    template: Temp
                };
            },
            companies_image: function() {
                return {
                    template: Templates
                };
            }
        }
    },
    created() {
        this.$eventHub.$on('showExtra', (data) => { 
            this.details.queryStrings.companyId = data.id
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            if ((data.index == this.tableCount && this.tableCount > 1) || (data.index == (this.tableCount - 1) && this.tableCount > 1)) {
                const num = this.details.delete.hasDelete ? 1 : 0
                option.style.top = `${(((62 * (data.index - 1))) + 108 - (32 * (num + this.details.info.length))).toString()}px`
            } else {
                option.style.top = `${((62 * data.index) + (100 - (data.index * 2))).toString()}px`
            }
        })
        this.$eventHub.$on(this.details.delete.deleteName, (id) => { 
            this._deleteCompany(id)
        })
    },
    beforeDestroy() { 
        this.$eventHub.$off(this.details.delete.deleteName);
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
            this.currentPage = 1
            this.getCompanies()
        });
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
    methods: {
        _deleteCompany(id) {
        let resp = confirm("Are you sure want to delete this company?");
        if (resp) {
            $(".loader").show();
            this.axios
            .delete(
                `${configObject.apiBaseUrl}/Company/DeleteCompany/${id}`,
                configObject.authConfig
            )
            .then((res) => {
                this.$toast("Company Deleted Successfully", {
                type: "success",
                timeout: 3000,
                });
                $(".loader").hide();
                this.$eventHub.$emit("refreshCompaniesList");
            })
            .catch((error) => {
                $(".loader").hide();
                this.$toast(error.response.data.message, {
                type: "error",
                timeout: 3000,
                });
            });
        }
        },
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
                    // let index = 0 + ((this.currentPage - 1) * this.pageSize);
                    let index = 0;
                    res.data.data.forEach(el => {
                        el.index = ++index;
                    })
                    sessionStorage.clear()
                    localStorage.setItem("companiesList", JSON.stringify(res.data.data))
                    // this.companiesCount = res.data.data.length
                    this.companiesCount = res.data.totalNumber
                    this.totalPages = Math.ceil(res.data.totalNumber / this.pageSize)
                    this.tableCount = res.data.totalNumber 
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