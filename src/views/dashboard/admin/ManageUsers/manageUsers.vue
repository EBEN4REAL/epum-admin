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
                                    <i class="fa fa-users" aria-hidden="true" style="font-size: 35px"></i>
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of Users</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">50</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Registered Users.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <!-- <router-link :to="{name: 'create_companies'}" class="create_btn btn btn_theme">Create Companies</router-link> -->
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
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                :dataSource="tableProps.tableData"  v-cloak
                >
                <e-columns>
                    <e-column width="40" field="index" headerText="#"></e-column>
                    <e-column width="200" field="userName" headerText="Username"></e-column>
                    <e-column width="200" field="firstName" headerText="First Name"></e-column>
                    <e-column width="200" field="lastName" headerText="Last Name"></e-column>
                    <e-column width="200" field="phoneNumber" headerText="Phone"></e-column>
                    <e-column :template="manageUsersTemplate" headerText="Action" width="300"></e-column>
                </e-columns>
            </ejs-grid>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import EjsTable from '@/components/ejsTable.vue';
import Temp from '@/components/manageUsersTemplate.vue';

import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        EjsTable
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    mounted() {
        this.getUsers();
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        
    },
    data() {
        return {
              tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        userName: "eben@g.com",
                        firstName: "Ebenezer",
                        lastName: "Igbinoba",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 2,
                        userName: "josh@g.com",
                        firstName: "Josh",
                        lastName: "Igbinoba",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 3,
                        userName: "john@die.com",
                        firstName: "John",
                        lastName: "Doe",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 4,
                        userName: "sarah@g.com",
                        firstName: "Sarah",
                        lastName: "Doe",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 5,
                        userName: "eben@g.com",
                        firstName: "Ebenezer",
                        lastName: "Igbinoba",
                        phoneNumber: "080748464838"
                    },
                ],
                fileName: 'list_of_companies'
            },
            manageUsersTemplate: function() {
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
                    fileName: "branches.pdf"
                }
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        getUsers() {
            this.$refs.dataGrid.ej2Instances.setProperties({
                dataSource: this.tableProps.tableData
            });
            this.refreshGrid();
        }
    }
}
</script>