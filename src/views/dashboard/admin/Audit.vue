<template>
    <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="dashboard__card large_card"  :style="[
                                    {
                                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }
                                ]">
                                <div class="row align-items-center justify-content-center hundred-percent-height">
                                    <div class="col-md-12">
                                         <div class="small__card_content_wrapper align-items-center " >
                                            <p class="dashboard__card__header text-white">AUDIT SALES</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class=" mt-3 full__row_section">
             <div class="row">
                <div class="col-md-4 remove-right-padding">
                    <div class="header-three-text">Product Tank sales</div>
                    <div class="small_card product_details_card mt-3">
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">

                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volmne  Sold</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volume Refilled</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" epump-color">PMS</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" epump-color">AGO</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class="epump-color">DPK</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 ">
                    <div class="header-three-text">Product Pump sales</div>
                    <div class="small_card product_details_card mt-3">
                        <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">

                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volume </div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Amount</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Price</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">RTT</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">RTT AMount</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class="">PMS</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" ">AGO</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" ">DPK</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="row top_section_row" style="border-radius: 8px">
            <div class="col-md-8">
              <span>Pump Sales</span>
            </div>
            <div class="col-md-4 text-right">
                
            </div>
        </div>
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
                    <e-column width="200" field="date" headerText="Date"></e-column>
                    <e-column width="300" field="openingReading" headerText="Opening Reading"></e-column>
                    <e-column width="200" field="lastReading" headerText="Last Reading "></e-column>
                    <e-column width="200" field="volumeSold" headerText="Volume Sold"></e-column>
                    <e-column width="200" field="amountSold" headerText="Amount Sold"></e-column>
                    <e-column width="200" field="productName" headerText="Product Name"></e-column>
                    <e-column width="200" field="rtt" headerText="RTT"></e-column>
                    <e-column width="200" field="rttAmount" headerText="RTT Amount"></e-column>
                    <e-column :template="AuditSalesTemplate" headerText="Action" width="250"></e-column>
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
import configObject from "@/config";
import backgroundUrl from "@/assets/img/Tankimage.png";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TableLoader from "@/components/tableLoader/index";
import Paginator from '@/components/Paginator.vue';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
import AuditSalesTemplate from '@/components/Templates/Audit_sales_template.vue';


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
            showLoader: false,
            stationsCount: 0,
            backgroundUrl,
            details: {
                id: '',
                info: [{ name: 'Edit', link: 'sales_rep' }], 
                delete: { hasDelete: false, deleteName: 'deleteCompany'}
            },
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            AuditSalesTemplate: () => {
                return {
                    template: AuditSalesTemplate
                };
            },
        }
    },
    mounted() {
        // this.getAudits()
        this.pumpDaySales()
    },  
    methods: {
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        pumpDaySales() {
            this.showLoader = true
            this.axios
            .get(
                `https://oh.epump.com.ng/Audit/DaySale/8f59a87d-e0e4-4ffd-917c-1d38b2e3e63e`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
                    let index = 0
                    res.data.pumpDaySales.forEach(el => {
                        el.index = ++index;
                        el.amountSold = this.convertThousand(this.amountSold)
                        el.volumeSold = this.convertThousand(this.volumeSold);
                    })
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data.pumpDaySales
                    });
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
        getAudits() {
            let data = [
                {
                    date: '27-10-2020',
                    openingReading: '15,000',
                    lastReading: '15,000',
                    volumeSold: "15,000",
                    amountSold: "15,000",
                    productName: 'AGO',
                    rtt: '15,000',
                    rttAmount: '15,000'
                },
                {
                    date: '27-10-2020',
                    openingReading: '15,000',
                    lastReading: '15,000',
                    volumeSold: "15,000",
                    amountSold: "15,000",
                    productName: 'DPK',
                    rtt: '15,000',
                    rttAmount: '15,000'
                },
                {
                    date: '27-10-2020',
                    openingReading: '15,000',
                    lastReading: '15,000',
                    volumeSold: "15,000",
                    amountSold: "15,000",
                    productName: 'PMS',
                    rtt: '15,000',
                    rttAmount: '15,000'
                }
            ]
            this.$refs.dataGrid.ej2Instances.setProperties({
                dataSource: data
            });
            this.refreshGrid();
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

    }
}
</script>