<template>
    <div>
        <EditTaxes :tax="tax" />
        <AddTax  />
        <MasterLayout>
            <div class="p-4">
                <div class="row">
                    <div class="col-md-8">
                        <h5 class="primary-color">Taxes</h5>
                    </div>
                    <div class="col-md-4 text-right">
                        <button  class="rounded-button primary-color" @click="addTaxModal">
                            Add Tax <i class="fa fa-plus-circle ml-2 primary-color" style="font-size: 17px" aria-hidden="true"></i>
                        </button>
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
                        :dataSource="taxes"
                        >
                        <e-columns>
                            <e-column width="300" field="taxName" headerText="Tax Name"></e-column>
                            <e-column width="200" field="taxAbbrevation" headerText="Tax Abbreviation"></e-column>
                            <e-column width="200" field="description" headerText="Description"> </e-column>
                            <e-column width="200" field="rate" headerText="Rate(%)" ></e-column>
                            <e-column width="100" :template="taxesTemplate" headerText="Action" ></e-column>
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
import Temp from '@/components/Templates/taxes';
import EditTaxes from "@/components/modals/Products/edittaxes"
import AddTax from "@/components/modals/Products/addTax"

import Jquery from 'jquery';
let $ = Jquery;

import {Page,Sort,Toolbar,Search, groupAggregates} from "@syncfusion/ej2-vue-grids";

export default {
    components: {
        MasterLayout,
        TableLoader,
        EditTaxes,
        AddTax
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
            taxes:[],
            tax:{},
            taxesTemplate: () => {
                return {
                    template: Temp
                };
            },
        }
    },
    created() {
        this.$eventHub.$on("refreshTaxes", () => {
            this.getTaxes()
        });
        this.$eventHub.$on('showEditTaxesModal', (tax) => {
            this.tax = tax
        })

    },
    mounted() {
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        this.getTaxes()
    },
    methods: {
        addTaxModal(e) {
            e.preventDefault();
            this.$modal.show('addTax')
        },
        getTaxes() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Invoices/taxes`, configObject.authConfig())
                .then(res => {
                    let index = 0
                    res.data.forEach(el => {
                        ++index
                    })
                    this.taxes = res.data
                    this.refreshGrid();
                    this.showLoader = false
            })
            .catch(error => {
                this.showLoader = false
            });
        },
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
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