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
                                    <div class="col-md-4">
                                         <div class="small__card_content_wrapper align-items-center " >
                                            <p class="dashboard__card__header text-white">PUMP VARIANCE</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 tanksales">
                                         <vue-ctk-date-time-picker
                                            v-model="dateRange"
                                            :max-date="maxDate"
                                            :onlyDate="true"
                                            :autoClose="true"
                                            color="#370F70"
                                            format="DDMMYYYY"
                                            formatted="DD/MM/YYYY"
                                            label="Pick a date"
                                        />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <span class="pl-3 ">Pump Variance Report on <strong>{{startDate}}</strong> for <strong>{{companyName}}</strong></span>
                </div>
                <div class="col-md-4 text-right">
                   
                </div>
            </div>
        </section>
        <div class="new_row_section mt-3 pb-4">
             <ejs-grid
                v-show="!showLoader"
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
                :rowDataBound='rowDataBound'
                >
                <e-columns>
                    <e-column width="60" field="index" headerText="#"></e-column>
                    <e-column width="200" field="date" headerText="Date"></e-column>
                    <e-column width="200" field="branchName" headerText="Branch"></e-column>
                    <e-column width="200" field="pumpPMS" headerText="Pump PMS (Ltrs)"></e-column>
                    <e-column width="200" field="tankPMS" headerText="Tank PMS (Ltrs)"></e-column>
                    <e-column width="200" field="pmsVariance" headerText="PMS Variance (%)"></e-column>
                    <e-column width="200" field="pumpAGO" headerText="Pump AGO (Ltrs)"></e-column>
                    <e-column width="200" field="tankAGO" headerText="Tank AGO (Ltrs)"></e-column>
                    <e-column width="200" field="agoVariance" headerText="AGO Variance (%)"></e-column>
                    <e-column :template="AuditSalesTemplate" headerText="Action" width="200"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
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
import AuditSalesTemplate from '@/components/Templates/Audit_sales_template.vue';


import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        masterLayout,
        TableLoader,
        Paginator,
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
            maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
            dateRange: this.startDate,
            pluginStartDate: this.$moment().format("D-M-YYYY"),
            startDate: this.$moment().format("MMMM D, YYYY"),
            details: {
                queryStrings: { branchId: '' },
                id: '',
                info: [{ name: 'Details', link: 'sales_rep' }], 
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
            companyName: '' 
        }
    },
    watch: {
         dateRange: function(newDate) {
            if (newDate) {
                this.startDate = this.$moment(newDate, "DD-MM-YYYY").format(
                "MMMM D, YYYY"
                );

                this.getPumpTankSale();
            }
        },
    },
    mounted() {
        this.dateRange = this.pluginStartDate;
        this.getPumpTankSale()

        this.companyId = this.$route.query.companyId
        let ml = sessionStorage.getItem(this.companyId)
        if (!ml){
            let allData = localStorage.getItem("companiesList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === this.companyId){
                    ml = JSON.stringify(my)
                    sessionStorage.setItem(this.companyId, ml)
                }
            })
        }

        let companyDetails = JSON.parse(ml)
        this.companyName = companyDetails.name

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
        rowDataBound: function(arging) {
            arging.row.addEventListener("mouseover", args => {
                arging.row.children[5].innerHTML = `${arging.data.pmsVarianceActual} ltrs`
                arging.row.children[8].innerHTML = `${arging.data.agoVarianceActual} ltrs`
            });
            
            arging.row.addEventListener("mouseleave", args => {
                arging.row.children[5].innerHTML = arging.data.pmsVariance
                arging.row.children[8].innerHTML = arging.data.agoVariance
            });
        },
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getPumpTankSale() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Audit/PumpTankSale/${this.$route.query.companyId}?date=${this.startDate}`, configObject.authConfig())
                .then(res => {
                    let index = 0;
                    res.data.sort((a, b) => {
                        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
                    });
                    res.data.forEach(el => {
                        el.index = ++index;

                        el.pmsVarianceActual = this.convertThousand((parseFloat(el.pumpPMS) - (parseFloat(el.tankPMS))))
                        el.agoVarianceActual = this.convertThousand((parseFloat(el.pumpAGO) - (parseFloat(el.tankAGO))))
                        let pumpSales = parseFloat(el.pumpPMS)  + parseFloat(el.pumpAGO)
                        let pmsVariance = (((parseFloat(el.pumpPMS) - (parseFloat(el.tankPMS)))) / pumpSales) * 100
                        // el.pmsVariance = this.convertThousand(pmsVariance) + ' ' + '%'
                        el.pmsVariance = parseFloat(pmsVariance.toFixed(2))

                        let agoVariance = (((parseFloat(el.pumpAGO) - (parseFloat(el.tankAGO)))) / pumpSales) * 100
                        // el.agoVariance = this.convertThousand(agoVariance) + ' ' + '%'
                        el.agoVariance = parseFloat(agoVariance.toFixed(2)) 
                        el.pumpPMS =  this.convertThousand(el.pumpPMS)
                        el.tankPMS =  this.convertThousand(el.tankPMS)
                        el.pumpAGO =  this.convertThousand(el.pumpAGO)
                        el.tankAGO =  this.convertThousand(el.tankAGO)

                        el.date = this.$moment(el.date).format(
                        "MM-DD-YYYY"
                        );
                    })
                    sessionStorage.clear()
                    localStorage.setItem("pumpsVarianceList", JSON.stringify(res.data))
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data
                    });
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
      
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        refreshTankSalesGrid() {
            this.$refs.tankSalesdataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "salesAudit"
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