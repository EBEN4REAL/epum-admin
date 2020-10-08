<template>
    <masterLayout>
       <section class="mt-3 full__row_section banner-gradient"  :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }
          ]">
      <div class="row align-items-center justify-content-center hundred-percent-height">
        <div class="col-md-12 ">
          <div class="text-center ">
            <h5 class="title">Create New Dealer</h5>
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
                >
                <e-columns>
                    <e-column width="40" field="index" headerText="#"></e-column>
                    <e-column width="200" field="date" headerText="Date"></e-column>
                    <e-column width="200" field="transactionAmount" headerText="transactionAmount"></e-column>
                    <e-column width="200" field="walletBalance" headerText="Wallet Balance"></e-column>
                    <e-column width="200" field="source" headerText="Source"></e-column>
                    <e-column width="200" field="status" headerText="Status"></e-column>
                </e-columns>
            </ejs-grid>
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout';
import backgroundUrl from "@/assets/img/bg__card.png";
import EjsTable from '@/components/ejsTable.vue';

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
            var grid = document.getElementsByClasswalletBalance("e-grid")[0].ej2_instances[0];
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
                        date: "Jidsma oil & Gas",
                        transactionAmount: "Jidsma",
                        walletBalance: "Mushin",
                        source: "Mushin",		
                        status: "Lagos",
                     },
                    {
                        index: 2,
                        date: "Al-Istijabah Oil & Gas",
                        transactionAmount: "Jidsma",
                        walletBalance: "Mushin",
                        source: "Mushin",		
                        status: "Lagos",
                    },
                    {
                        index: 3,
                        date: "Dalsis Oil & Gas Limited",
                        transactionAmount: "Jidsma",
                        walletBalance: "Mushin",
                        source: "Mushin",		
                        status: "Lagos",
                    },                   
                ],
            },
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
                    filewalletBalance: "branches.pdf"
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