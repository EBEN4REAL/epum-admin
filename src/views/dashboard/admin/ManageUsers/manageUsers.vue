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
                            <p>Get started with epump company admin platform by creating and managing your users here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                          
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total Number of Users</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{usersCount}}</small>
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
                :actionBegin='actionHandler'
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                :dataSource="tableProps.tableData"  v-cloak
                >
                <e-columns>
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="200" field="userName" headerText="Username"></e-column>
                    <e-column width="200" field="firstName" headerText="First Name"></e-column>
                    <e-column width="200" field="lastName" headerText="Last Name"></e-column>
                    <e-column width="200" field="phoneNumber" headerText="Phone"></e-column>
                    <e-column :template="manageUsersTemplate" headerText="Action" width="300"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"  />
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
import Paginator from '@/components/Paginator.vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/manageUsersTemplate.vue';
import TableLoader from "@/components/tableLoader/index";   
import configObject from "@/config";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader,
        Paginator
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    mounted() {
        this.getUsers();
         $(".e-input").keyup(function(e) {
            if (e.keyCode === 13) {
                searchFun(e, 13);
            } else {
                searchFun(e, 1)
            }
        });
        const searchFun = (event, number) => {
          var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
          var value = event.target.value;
          this.searchValue = value
          if ((number !== 13) && value.length > 3) {
            this.getUsers()
          }
          if (number == 13) {
            this.getUsers()
          }
          if (!value.length) {
            this.getUsers()
          }
        }
    },
    data() {
        return {
            searchLoader: false,
            sortingTable: false,
            sortType: '',
            sortColumn: '',
            searchValue: '',
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            showLoader: false,
            usersCount: 0,
            query: '',
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            manageUsersTemplate: function() {
                return {
                    template: Temp
                };
            }
        }
    },
    watch: {
         query: function(newQuery) {
            if (newQuery == '') {
                this.getUsers();
            }
        },
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
    methods: {
        getPageSize(pageSize) {
            this.pageSize = pageSize;
            this.currentPage = 1
            this.totalPages = Math.ceil(this.getUsers.totalNumber / pageSize)
            this.getUsers();
        },
        actionHandler: function(args) {
            if (args.requestType == 'sorting') {
                if (args.direction) {
                    this.sortType = args.direction
                    this.sortColumn = args.columnName
                } else {
                    this.sortType = ''
                    this.sortColumn = ''
                }
                this.getUsers()
            }
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getUsers();
        },
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "Users.pdf"
                }
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        search(e) {
            e.preventDefault()
            this.getUsers()
        },
        getUsers() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Admin/GetUsers?PageNumber=${this.currentPage}&PageSize=${this.pageSize}&Search=${this.searchValue}&Order=${this.sortType}&SortName=${this.sortColumn}`, configObject.authConfig)
                .then(res => {
                    // let index = 0;
                    let index = 0 + ((this.currentPage - 1) * this.pageSize);
                    res.data.data.sort((a, b) => {
                        return a.userName > b.userName ? 1 : b.userName > a.userName ? -1 : 0;
                        
                    });
                    res.data.data.forEach(el => {
                        el.date = this.$moment(el.date).format("MM/DD/YYYY hh:mm A");
                        el.index = ++index;
                        el.status = 'Offline'
                    })
                    sessionStorage.clear()
                    localStorage.setItem("usersList", JSON.stringify(res.data.data))
                    this.usersCount = res.data.totalNumber
                    this.totalPages = Math.ceil(res.data.totalNumber / this.pageSize)
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