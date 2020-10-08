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
                                    <h5 class="text-white font-weight">Number of Dealers</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">66</h5>
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
                           <router-link :to="{name: 'createDealer'}" class="create_btn btn btn_theme">Create New Dealer</router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-3">
            <!-- <EjsTable :tableProps="tableProps"  /> -->
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
                :dataBound='dataBound'
                :columns="tableProps.columns"
                >
                <e-columns>
                    <e-column width="40" field="index" headerText="#"></e-column>
                    <e-column width="200" field="dealerName" headerText="Dealer Name"></e-column>
                    <e-column width="200" field="name" headerText="Name"></e-column>
                    <e-column width="200" field="city" headerText="City"></e-column>
                    <e-column width="200" field="country" headerText="Country"></e-column>
                    <e-column :template="dealersTemplate" headerText="Action" width="100"></e-column>
                </e-columns>
            </ejs-grid>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import EjsTable from '@/components/ejsTable.vue';
import Temp from '@/components/list_of_dealers_template.vue';

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
        this.getBranches();
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
                        dealerName: "Jidsma",
                        name: "Mushin",
                        city: "Mushin",		
                        state: "Lagos",
                        country: "Nigeria",
                     },
                    {
                        index: 2,
                        dealerName: "Jidsma",
                        name: "Mushin",
                        city: "Mushin",		
                        state: "Lagos",
                        country: "Nigeria",
                    },
                    {
                        index: 3,
                        dealerName: "Jidsma",
                        name: "Mushin",
                        city: "Mushin",		
                        state: "Lagos",
                        country: "Nigeria",
                    },                   
                ],
                columns: [ 
                    { 
                        field: "index", 
                        headerText: "#", 
                        width: 40, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "dealerName", 
                        headerText: "Dealer Name", 
                        width: 200, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "name", 
                        headerText: "Name", 
                        width: 200, 
                        textAlign: "center"
                    },
                    { 
                        field: "city", 
                        headerText: "City", 
                        width: 100, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "state", 
                        headerText: "State", 
                        width: 80, 
                        textAlign: "center"
                    },
                    { 
                        field: "country", 
                        headerText: "Country", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        headerText: "Action", 
                        width: 580, 
                        textAlign: "center",
                        template:   () => {
                            return {
                                template: Temp
                            }
                        }
                    }, 
                ] ,
                fileName: 'list_of_branches'
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
        getBranches() {
            this.$refs.dataGrid.ej2Instances.setProperties({
                dataSource: this.tableProps.tableData
            });
            this.refreshGrid();
        }
    }
}
</script>