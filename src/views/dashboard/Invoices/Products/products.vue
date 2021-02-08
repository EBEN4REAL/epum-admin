<template>
    <MasterLayout>
        <div class="p-4">
            <div class="row">
                <div class="col-md-8">
                    <h5 class="primary-color">Products & Services(Sales)</h5>
                </div>
                <div class="col-md-4 text-right">
                    <router-link :to="{name:'add_product'}" class="rounded-button primary-color">
                        Add Product or service <i class="fa fa-plus-circle ml-2 primary-color" style="font-size: 17px" aria-hidden="true"></i>
                    </router-link>
                </div>
            </div>
           
            <div class="mt-3">
                <ejs-grid
                    v-show="!showLoader"
                    ref="dataGrid"
                    :created="refreshGrid"
                    :allowPaging="true"
                    :allowSorting="true"
                    :pageSettings="tableProps.pageSettings"
                    :toolbar="tableProps.toolbar"
                    :searchSettings="tableProps.search"
                    :allowExcelExport="false"
                    :allowPdfExport="false"
                    :toolbarClick="toolbarClick"
                    :allowTextWrap='true'
                    :dataSource="data"
                    >
                    <e-columns>
                        <e-column width="300" field="name" headerText="Name"></e-column>
                        <e-column width="200" field="price" headerText="Price(Naira)" textAlign="right"></e-column>
                        <e-column width="100" :template="productsTemplate" headerText="Action" textAlign="center"></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
            <TableLoader :showLoader="showLoader"/>
        </div>
    </MasterLayout>
</template>
<script>
import MasterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import Temp from '@/components/Templates/products';
import Jquery from 'jquery';
let $ = Jquery;

import {Page,Sort,Toolbar,Search, groupAggregates} from "@syncfusion/ej2-vue-grids";

export default {
    components: {
        MasterLayout,
        TableLoader
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            isButtonDisabled: false,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            showLoader: false,
            data: [
                {
                    name: 'Eben Oluwasegun',
                    price: '50.00'
                },
                 {
                    name: 'Omoruyi Isaac',
                    price: '100.00'
                },
                {
                    name: 'Olaitan Akinromade',
                    price: '500.00'
                },
                {
                    name: 'Favour chi',
                    price: '1,000.00'
                },
                {
                    name: 'Tunde Ednut',
                    price: '2,500.00'
                },
                {
                    name: 'Ismail Danfodio',
                    price: '4,500.00'
                }
            ],
            productsTemplate: () => {
                return {
                    template: Temp
                };
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
                    fileName: "branches.pdf"
                }
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
    },
}
</script>