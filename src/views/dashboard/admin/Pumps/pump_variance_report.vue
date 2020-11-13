<template>
    <div>
        <UpdateTankStatusModal :tankObj="tankObj" />
        <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
                <div class="row hundred-percent-height align-items-center">
                    <div class="col-lg-12">
                        <div class="dashboard__card large_card"  :style="[
                                    {
                                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }
                                ]">
                                <div class="row  hundred-percent-height align-items-center">
                                    <div class="col-md-4 text-center">
                                        <router-link :to="{name:'audit_sales', query: {companyId: this.$route.query.companyId}}">
                                             <i class="fa fa-chevron-circle-left" aria-hidden="true" style="color: white; font-size: 28px"></i>
                                        </router-link>
                                    </div>
                                    <div class="col-md-3">
                                         <div class="small__card_content_wrapper  " >
                                            <h4 class="yellow_text">{{varianceObj.branchName}}</h4>
                                            <h6 class="grey_text">{{varianceObj.date}}</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-3 tanksales">
                                        <vue-ctk-date-time-picker
                                            v-model="dateRange"
                                            :max-date="maxDate"
                                            :range="true"
                                            :autoClose="true"
                                            :custom-shortcuts="customShortcuts"
                                            color="#290C53"
                                            format="DDMMYYYY"
                                            formatted="DD/MM/YYYY"
                                            label="Select a date range"
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
                    <span class="pl-3 ">Pump Sales between <strong>{{startDate}}</strong> and <strong>{{endDate}}</strong></span>
                </div>
                <div class="col-md-4 text-right">
                   
                </div>
            </div>
        </section>
        <section class=" mt-3 full__row_section">
             <div class="row ">
                <div class="col-md-4" v-for="(x,i) in 3" :key="i + 'A'" v-show="showLoader">
                    <TableLoader :showLoader="showLoader"/>
                </div>
                <div class="col-md-5 remove-right-padding" v-for="(pmpSale,index) in totalPumpSales" :key="index + 'C'" v-show="!showLoader">
                    <div class="header-three-text"></div>
                    <div class="small_card product_details_card mt-3">
                        <div class="product_sales_flex_card_pump_sales first">
                            <div class="product_sales_flex_card_item">
                                <div class="total_text">{{pmpSale.tankName}}</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">{{pmpSale.tankVolumeSold}}  {{!pmpSale.tankVolumeSold ? null : 'Ltrs'}}</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card_pump_sales" v-for="(pmp,x) in pmpSale.pumpSalesArr" :key="x + 'B'">
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">
                                    {{pmp['sale'][0].pumpName}}
                                </div>
                            </div>
                            <div class="product_sales_flex_card_item">
                              <div class="text-black ">
                                    {{convertThousand(pmp['volumeSold'])}} Ltrs</div>
                                </div>
                        </div>
                        <div class="product_sales_flex_card_pump_sales last">
                            <div class="product_sales_flex_card_item">
                                <div class="total_text">TOTAL PUMP SALES</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black total_text ">{{convertThousand(pmpSale.totalVolumeSold)}} Ltrs</div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </section>
         <section class="top_section_row mt-3 ">
            <div class="row  mt-3 align-items-center py-3 ">
                <div class="col-md-8">
                    <span class="pl-3 ">Tank Sales between <strong>{{startDate}}</strong> and <strong>{{endDate}}</strong></span>
                </div>
                <div class="col-md-4 text-right">
                    
                </div>
            </div>
        </section>
        <div class="new_row_section mt-3 pb-4">
             <ejs-grid
                v-show="!showLoader"
                ref="tankSalesdataGrid"
                :created="refreshTankSalesGrid"
                :allowPaging="true"
                :allowSorting="true"
                :pageSettings="tableProps.pageSettings"
                :toolbar="tableProps.toolbar"
                :searchSettings="tableProps.search"
                :allowExcelExport="true"
                :allowPdfExport="true"
                :toolbarClick="toolbarClick"
                >
                 <e-columns>
                    <e-column width="60" field="index" headerText="#"></e-column>
                    <e-column width="200" field="tankName" headerText="Tank  Name" textAlign="center"></e-column>
                     <e-column width="200" field="productName" headerText="Product  Name" textAlign="center"></e-column>
                    <e-column width="200" field="volumeSold" headerText="Volume Sold (Ltrs)"></e-column>
                    <e-column width="200" field="volumeFilled" headerText="Volume Filled (Ltrs)" ></e-column>
                    <e-column width="200" field="openingDip" headerText="Opening  Dip" textAlign="center"></e-column>
                    <e-column width="200" field="closingDip" headerText="Closing  Dip" textAlign="center"></e-column>
                    <e-column :template="TankSalesTemp" headerText="Action" width="250"></e-column>
                </e-columns>
            </ejs-grid>
            <DropDown :details="details"/>
            <TableLoader :showLoader="showLoader"/> 
        </div>
    </masterLayout>
    </div>
</template>
<script>

import Vue from 'vue';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
import masterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
import backgroundUrl from "@/assets/img/Tankimage.png";
import Jquery from 'jquery';
let $ = Jquery;
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TankSalesTemplate from '@/components/Templates/tankSalesTemplate.vue';
import UpdateTankStatusModal from '@/components/modals/pumpSales/updateTankStatus.vue';


export default {
    components: {
        masterLayout,
        TableLoader,
        DropDown,
        UpdateTankStatusModal
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    }, 
    data() {
        return {
            searchValue: '',
            showLoader: false,
            varianceObj: {},
            companiesCount: 0,
            stationsCount: 0,
            backgroundUrl,
            totalPumpSales: [],
            tankSales: [],
            tankObj: {},
            details: {
                queryStrings: { tankId: '', branchId: this.$route.query.branchId }, 
                info: [ { name: 'Check Calibration', link: 'tank_calibration' }, { name: 'Calibration Volume', link: 'calibrationVolume' }, { name: 'Probe Transactions', link: 'tankTransaction' }, { name: 'Tanks Filled', link: 'tanksFilled' } ], 
                delete: { hasDelete: true, deleteName: 'removeTankCalibration', name: 'Remove Calibration', query: 'tankId' }
            }, 
            maxDate: this.$moment(new Date()).format("YYYY-MM-DD"),
                customShortcuts: [
                { key: "Today", label: "Today", value: "day" },
                { key: "yesterday", label: "Yesterday", value: "-day" },
                { key: "last7Days", label: "Last 7 Days", value: 7 },
                { key: "lastWeek", label: "Last Week", value: "-isoWeek" },
                { key: "last30Days", label: "Last 30 Days", value: 30 },
                { key: "lastMonth", label: "Last Month", value: "-month" }
            ],
            startDate: this.$moment().format("MMMM D, YYYY"),
            endDate: this.$moment().format("MMMM D, YYYY"),
            pluginStartDate: this.$moment().format("D-M-YYYY"),
            pluginEndDate: this.$moment().format("D-M-YYYY"),
            dateRange: { "start": this.pluginStartDate, "end":this.pluginEndDate },
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            TankSalesTemp: () => {
                return {
                    template: TankSalesTemplate
                };
            },
        }
    },
    created() {
        this.$eventHub.$on('showExtraPumpVarianceButtons', (data, that) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            const currentGrid = this.searchValue ? grid.currentViewData : []

            this.details.queryStrings.tankId = data.tankId
            const drop = that.$parent.ej2Instances.pageSettings.pageSize
            let index 
            if (currentGrid.length && (currentGrid.length !== this.branchesCount)) {
                index = currentGrid.findIndex((cur) => cur.index == data.index) + 1
            } else {
                index = data.index 
            }
            const indent = index - (Math.floor((index - 1) / drop) * drop)
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            option.style.top = `${((62 * indent) + (100 - (indent * 2))).toString()}px`
        })
        this.$eventHub.$on('updateTankStatusModal', (tankObj) => { 
            this.updateTankStatusModal(tankObj)
        })
        this.$eventHub.$on(this.details.delete.deleteName, (id) => { 
            this.removeTankCalibration(id)
        })
       
    },
    beforeDestroy() { 
        this.$eventHub.$off(this.details.delete.deleteName);
        this.$eventHub.$off('updateTankStatusModal');
        this.$eventHub.$off('showExtraPumpVarianceButtons');
    },
    watch: {
        dateRange: function (newRange, oldRange) {
            if ( newRange.start!== null && newRange.end !== null) {
                this.startDate = this.$moment(newRange.start, "DD-MM-YYYY").format("MMMM D, YYYY")
                this.endDate = this.$moment(newRange.end, "DD-MM-YYYY").format("MMMM D, YYYY");

                this.getSales();
            }
        },
        varianceObj(obj) {
            this.startDate = this.$moment(new Date(obj.date)).format("MMMM D, YYYY")
        }
    },
    mounted() {
        this.getSales()
        this.varianceId = this.$route.query.varianceId;
        let ml = sessionStorage.getItem(this.varianceId);
        if (!ml) {
        let allData = localStorage.getItem("pumpsVarianceList");
        let dt = JSON.parse(allData);
        dt.forEach((my, index) => {
            if (my.index == this.varianceId) {
                ml = JSON.stringify(my);
                sessionStorage.setItem(this.varianceId, ml);
            }
        });
        }
        let pumpVarianceDetailsObj = JSON.parse(ml);
        this.varianceObj = pumpVarianceDetailsObj;
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });

        const searchFun = (event) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            this.searchValue = value
            grid.search(value);
        }
    },
    methods: {
        updateTankStatusModal(tankObj) {
            this.tankObj = tankObj
            this.$modal.show('updateTankStatus')
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
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
       
        parseTankSales(data) {
            data.forEach(el => {
                el.branchName = this.varianceObj.branchName
            })
            sessionStorage.clear()
            localStorage.setItem("tankSalesList", JSON.stringify(data))
            this.tankSales = data
            let index = 0
            data.forEach(el => {
                el.index = ++index;
                el.volumeSold = this.convertThousand(el.volumeSold);
                el.volumeFilled = this.convertThousand(el.volumeFilled);
                el.openingDip = this.convertThousand(el.openingDip);
                el.closingDip = this.convertThousand(el.closingDip);
            })
            
            this.$refs.tankSalesdataGrid.ej2Instances.setProperties({
                dataSource: data
            });
            this.refreshTankSalesGrid();
        },
        getSales() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Audit/DaySale/${this.$route.query.branchId}?startDate=${this.startDate}&endDate=${this.endDate}`, configObject.authConfig)
                .then(res => {
                    const ids = new Set(res.data.pumpDaySales.map(cur => cur.tankName))
                    const _salesArr = []
                    res.data.pumpDaySales.forEach(cur => {
                        ids.forEach(current => {
                            const index = _salesArr.findIndex(el => el.tankName == current)
                            if (index == -1 && cur.tankName == current) {
                                _salesArr.push({
                                    tankName: current,
                                    data: [cur],
                                });
                            } 
                            if (index != -1 && cur.tankName == current) {
                                const value = _salesArr[index].data
                                _salesArr[index].data = [...value, cur]
                            }
                        })
                    });
                    let pumpTankSales = _salesArr.map((sale,i) =>  {
                        Array.prototype.groupBy = function(prop) {
                            return this.reduce(function(groups, item) {
                                const val = item[prop]
                                groups[val] = groups[val] || []
                                groups[val].push(item)
                                return groups
                            }, {})
                        };
                        const groupByPumpName = _salesArr[i].data.groupBy('pumpName');
                        const pumpSalesArr = Object.keys(groupByPumpName).map(cur => {
                            return {
                                sale: groupByPumpName[cur]
                            }
                        })
                        pumpSalesArr.forEach(x => {
                            const volumeSold = x.sale.reduce((acc,cur) => {
                                return acc += cur.volumeSold
                            },0);
                            x.volumeSold = volumeSold
                        })
                        return {
                            tankName: sale.tankName,
                            pumpSalesArr,
                            totalVolumeSold: pumpSalesArr.reduce((acc,cur) => {
                                return acc += cur.volumeSold
                            },0)
                        }
                    }) 
                    this.parseTankSales(res.data.tankSales)
                    pumpTankSales.forEach(el => {
                        let sale = res.data.tankSales.filter(x => x.tankName === el.tankName)
                        if(sale.length > 0) {
                            el.tankVolumeSold = this.convertThousand(sale.reduce((acc,cur) => {
                                return acc += parseFloat(cur.volumeSold.replace(/,/g, ''))  
                            }, 0))
                        }
                    })
                    this.totalPumpSales = pumpTankSales
                    this.showLoader = false
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
        removeTankCalibration(tankId) {
            let resp = confirm("Are you sure want to remove this tank calibration?");
            if (!resp) {
                return
            }
            this.axios
                .delete(
                    `${configObject.apiBaseUrl}/Calibration/RemoveTankCalibration/${tankId}`,
                    configObject.authConfig
                )
                .then((res) => {
                    this.$toast("Successfully Removed Tank Calibration", {
                        type: "success",
                        timeout: 3000,
                    });
                })
                .catch((error) => {
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000,
                    });
                });
        },
    }
}
</script>