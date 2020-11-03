<template>
    <div>
        <EditPumpStatusModal :pumpStatusObj="pumpStatusObj" />
    <masterLayout>
        <section>
            <div class="row mt-3 ml-1">
                 <div class="col-lg-2 col-md-3 remove_padding-right">
                 <div class="new_row_section">
                <div
                  class="small__card_content_wrapper small_card pump-status "
                >
                  <p class="dashboard__card__header mb-0">Refresh In</p>
                  <div
                    class="icon_wrapper centralize icon_div_big empty_bg text-center"
                  >
                    <img src="@/assets/img/oil-tank-2.png" width="40px" />
                  </div>
                  <div class="mt-1">
                    <small id="countDown"
                      class="dashboard__card__header_bottom font-weight-bold"
                    >

                    </small>
                  </div>
                </div>
            </div>
            </div>
             <div class="col-lg-2 col-md-3 remove_padding-right">
                 <div class="new_row_section">
                <div
                  class="small__card_content_wrapper small_card pump-status" :class="selected === 'notOkay' ? 'active_pump_status' : null" @click="selected = 'notOkay'"
                >
                  <p class="dashboard__card__header mb-0"  :class="selected === 'notOkay' ? 'text-white' : null">Not Okay</p>
                  <div
                    class="icon_wrapper centralize icon_div_big text-center"
                  >
                    <img src="@/assets/img/oil-tank-2.png" width="40px" />
                  </div>
                  <div class="mt-1">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold"  :class="selected === 'notOkay' ? 'text-white' : null"
                    >
                      {{notOkPumps.length}}
                    </small>
                  </div>
                </div>
            </div>
            </div>
            <div class="col-lg-2 col-md-3 remove_padding-right">
                 <div class="new_row_section">
                <div
                  class="small__card_content_wrapper small_card pump-status" :class="selected === 'showAll' ? 'active_pump_status' : null" @click="selected = 'showAll'"
                >
                  <p class="dashboard__card__header mb-0" :class="selected === 'showAll' ? 'text-white' : null">All Pumps</p>
                  <div
                    class="icon_wrapper centralize icon_div_big text-center"
                  >
                    <img src="@/assets/img/oil-tank-2.png" width="40px" />
                  </div>
                  <div class="mt-1">
                    <small
                      class="dashboard__card__header_bottom font-weight-bold" :class="selected === 'showAll' ? 'text-white' : null"
                    >
                      {{allPumps.length}}
                    </small>
                  </div>
                </div>
            </div>
            </div>
            <div class="col-lg-6 col-md-3 remove_padding-right">
                 <div class="new_row_section installed_card small_card" :style="[
                    {
                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '135px'
                    }
               ]">
            <div class="text-center px-5 pt-4 text-white">
                <h4> Hi, Admin search for pumps here</h4>
                
                    <div class="text-center pt-3">
                        <div class="input__block">
                            <input type="text" class=""  @input="searchChange" placeholder="Search for pumps here..."/>
                        </div>
                    </div>
                </div>
        </div>       
    </div>
</div>
   </section>

        <div class="new_row_section mt-3">
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
                :dataSource="tableProps.tableData"  v-cloak
                :columns="tableProps.columns"
                >
                <e-columns>
                    <!-- <e-column width="80" field="index" headerText="#"></e-column> -->
                    <e-column width="200" field="station" headerText="Station Name"></e-column>
                    <e-column width="200" field="pumpName" headerText="Pump Name"></e-column>
                    <e-column width="200" field="deviceId" headerText="Device Id"></e-column>
                     <e-column width="200" field="yesterdayClosing" headerText="Yesterday Closing"></e-column>
                    <e-column width="200" field="todayOpening" headerText="Today Opening"></e-column>
                    <e-column width="200" field="todayClosing" headerText="Today Closing"></e-column>
                    <e-column width="200" field="difference" headerText="Difference"></e-column>
                     <e-column width="200" :template="pumpStatus" field="status" headerText="Status" ></e-column>
                      <e-column width="200" field="lastHit" headerText="Last Hit"></e-column>
                    <e-column width="200" field="lastTransaction" headerText="Last Transaction"></e-column>
                    <e-column width="200" field="totalVolumeToday" headerText="Volume Today"></e-column>
                    <e-column :template="pumpStatusTemplate" headerText="Action" width="200"></e-column>
                </e-columns>
            </ejs-grid>
            <TableLoader :showLoader="showLoader"  />
        </div>
    </masterLayout>
    </div>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/pump_status_template.vue';
import TableLoader from "@/components/tableLoader/index";
import configObject from "@/config";
import backgroundUrl from "@/assets/img/Tankimage.png";
import pumpTempStatus from '@/components/Templates/pump_status_template';
import EditPumpStatusModal from '@/components/modals/pumpStatus/editPumpStatus.vue';


import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader,
        EditPumpStatusModal
    },
     provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    mounted() {
        this.getPumpStatus('notOkay')
        this.$nextTick(function () {
            window.setInterval(() => {
                this.getPumpStatus('notOkay');
                this.selected = "notOkay"
            },60000);
        })
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
        const mins = 60 * 1,
        display = document.querySelector('#countDown');
        this.startTimer(mins, display);
       
    },
    created() {
        this.$eventHub.$on("pumpStatusObj", (data) => {
            this.pumpStatusObj = data
        });
    },
    data() {
        return {
            selected: 'notOkay',
            options: [
                { text: 'Not Okay', value: 'notOkay' },
                { text: 'show All', value: 'showAll' }
            ],
            searchText: '',
            showLoader: false,
            pumpStatusObj:{},
            backgroundUrl,
            pumpStatus: '',
            notOkPumps: [],
            allPumps:[],
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            pumpStatusTemplate: function() {
                return {
                    template: Temp
                };
            },
            pumpStatus: function() {
                return {
                    template: pumpTempStatus
                };
            }
            
        }
    },
    watch: {
        selected(status) {
            this.getPumpStatus(status)
        }
    },
    methods: {
        searchChange($e) {
            $e.target.value
            console.log($e.target.value)
            this.getPumpStatus(this.selected, $e.target.value)
        },
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
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        timeSince(date) {
            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            if(Math.floor(seconds)  < 0) {
                return "now";
            }
            return Math.floor(seconds) + " seconds";
        },
        startTimer(duration, display) {
            var start = Date.now(),diff, minutes,seconds;
            function timer() {
                /***** get the number of seconds that have elapsed since startTimer() was called ***/
                diff = duration - (((Date.now() - start) / 1000) | 0);
                /***** does the same job as parseInt truncates the float ***/
                minutes = (diff / 60) | 0;
                seconds = (diff % 60) | 0;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds; 

                if (diff <= 0) {
                     /***** add one second so that the count down starts at the full duration example 05:00 not 04:59 ***/
                    start = Date.now() + 1000;
                }
            };
            /***** we don't want to wait a full second before the timer starts ***/
            timer();
            setInterval(timer, 1000);
        },
        getPumpStatus(status, searchText ='') {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Admin/PumpStatus?query=${searchText}`, configObject.authConfig)
                .then(res => {
                    let index = 0;
                    res.data.sort((a, b) => {
                    if (a.branchName && b.branchName) {
                        return a.branchName.toLowerCase() > b.branchName.toLowerCase() ? 1 : b.branchName.toLowerCase() > a.branchName.toLowerCase() ? -1 : 0;
                    } else if (a.branchName && !b.branchName) {
                        return -1
                    } else { 
                        return 1
                    }
                    });
                    
                    res.data.forEach(el => {
                        el.lastTransaction = this.timeSince(new Date(el.lastTransaction))
                        el.lastHit = this.timeSince(new Date(el.lastHit))
                        if(el.lastEp2Date) {
                            el.lastEp2Date = this.$moment(el.lastEp2Date).format("MM/DD/YYYY hh:mm A");
                        }
                        if(el.todayOpening) {
                           el.todayOpening=  this.convertThousand(el.todayOpening)
                        }
                        if(el.yesterdayClosing) {
                           el.yesterdayClosing = this.convertThousand(el.yesterdayClosing)
                        }
                        if(el.todayClosing) {
                           el.todayClosing =  this.convertThousand(el.todayClosing)
                        }
                       
                    })
                    this.allPumps = res.data
                    this.okPumps = res.data.filter(el => el.status === "Ok")
                    this.notOkPumps = res.data.filter(el => el.status !== "Ok")
                    if(status === 'notOkay') {
                        this.$refs.dataGrid.ej2Instances.setProperties({
                            dataSource: this.notOkPumps
                        });
                    }else {
                        this.$refs.dataGrid.ej2Instances.setProperties({
                            dataSource: this.okPumps
                        });
                    }
                    this.refreshGrid();
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
    }
}
</script>