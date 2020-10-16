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
            <h5 class="title">Transactions</h5>
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
                    <e-column width="200" field="transactionDate" headerText="Transaction Date"></e-column>
                    <e-column width="200" field="branchName" headerText="Branch Name"></e-column>
                    <e-column width="200" field="tankName" headerText="Tank Name"></e-column>
                    <e-column width="200" field="status" headerText="Status"></e-column>
                    <e-column width="200" field="volume" headerText="Volume"></e-column>
                    <e-column width="200" field="costPrice" headerText="Cost Price"></e-column>
                    <e-column width="200" field="pumpName" headerText="Pump Name"></e-column>
                    <e-column width="200" field="volumeIn" headerText="Volume In"></e-column>
                    <e-column width="200" field="volumeOut" headerText="Volume Out"></e-column>
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
            var grid = document.getElementsByClasstankName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        
    },
    data() {
        return {
              backgroundUrl,
              tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        transactionDate: "Jidsma oil & Gas",
                        branchName: "Jidsma",
                        tankName: "Mushin",		
                        status: "Lagos",
                        volume: "",
                        costPrice: "",
                        pumpName: "",
                        volumeIn: "",
                        volumeOut: "",
                     },
                    {
                        index: 2,
                        transactionDate: "Al-Istijabah Oil & Gas",
                        branchName: "Jidsma",
                        tankName: "Mushin",		
                        status: "Lagos",
                        volume: "",
                        costPrice: "",
                        pumpName: "",
                        volumeIn: "",
                        volumeOut: "",
                    },
                    {
                        index: 3,
                        transactionDate: "Dalsis Oil & Gas Limited",
                        branchName: "Jidsma",
                        tankName: "Mushin",		
                        status: "Lagos",
                        volume: "",
                        costPrice: "",
                        pumpName: "",
                        volumeIn: "",
                        volumeOut: "",
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
                    filetankName: "branches.pdf"
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