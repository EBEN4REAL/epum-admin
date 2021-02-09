<template>
    <div>
        <EditProduct :product="product" />
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
                        :dataSource="products"
                        >
                        <e-columns>
                            <e-column width="300" field="productName" headerText="Name"></e-column>
                            <e-column width="200" field="productDescription" headerText="Description"></e-column>
                            <e-column width="200" field="price" headerText="Price(Naira)" textAlign="right"></e-column>
                            <e-column width="100" :template="productsTemplate" headerText="Action" textAlign="center"></e-column>
                        </e-columns>
                    </ejs-grid>
                </div>
                <TableLoader :showLoader="showLoader"/>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import Temp from '@/components/Templates/products';
import EditProduct from "@/components/modals/Products/edit"


import Jquery from 'jquery';
let $ = Jquery;

import {Page,Sort,Toolbar,Search, groupAggregates} from "@syncfusion/ej2-vue-grids";

export default {
    components: {
        MasterLayout,
        TableLoader,
        EditProduct
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
            products: [],
            product: {},
            productsTemplate: () => {
                return {
                    template: Temp
                };
            },
        }
    },
    created() {
        this.$eventHub.$on("refreshInvoiceProducts", () => {
            this.getProducts()
        });
        this.$eventHub.$on('showEditProductModal', (product) => {
            this.product = product
        })

    },
    mounted() {
        this.getProducts()
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
    },
    methods: {
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        getProducts() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Invoices/products`, configObject.authConfig())
                .then(res => {
                    let index = 0
                    res.data.forEach(prod => {
                        ++index
                        prod.price = this.convertThousand(prod.productPrice)
                    })
                    this.products = res.data
                    this.refreshGrid();
                    console.log(res.data)
            })
            .catch(error => {

            });
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