<template>
    <div>
        <EditDeviceModal :deviceObj="deviceObj" />
        <UpdateFTModal :fTDeviceId="fTDeviceId" />
        <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-8 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by managing your devices here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Devices</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{devicesCount}}</small>
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
                    :allowTextWrap='true'
                    :dataSource="devicesData"
                    :rowDataBound="rowDataBound"
                    >
                    <e-columns>
                        <e-column width="80" field="index" headerText="#"></e-column>
                        <e-column width="150" :template="device_id" headerText="Device"></e-column>
                        <e-column field="deviceId" :visible="false"></e-column>
                        <e-column width="300" field="name" headerText="name"></e-column>
                        <e-column width="200" field="lastDate" headerText="Last Update"></e-column>
                        <e-column width="100" field="firmWareVersion" headerText="FW Version"></e-column>
                        <e-column width="200" field="memoryUsage" headerText="Memory Usage"></e-column>
                        <e-column width="150" field="state" headerText="State"></e-column>
                        <e-column width="200" field="firmwareUpdate" headerText="Firmware Update"></e-column>
                        <e-column :template="list_of_device" headerText="Action" width="300"></e-column>
                    </e-columns>
                </ejs-grid>
            <TableLoader :showLoader="showLoader"/>
            <DropDown :details="details"/>
        </div>
    </masterLayout>
    </div>
    
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import Temp from '@/components/list_of_device.vue';
import DeviceId from '@/components/device_id.vue';
import DropDown from '@/components/Templates/Dropdown/devicesDropdown.vue';
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport, groupAggregates} from "@syncfusion/ej2-vue-grids";
import TableLoader from "@/components/tableLoader/index";
import configObject from "@/config";
import EditDeviceModal from '@/components/modals/Devices/editDevice.vue';
import UpdateFTModal from '@/components/modals/Devices/updateFt.vue';


import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        masterLayout,
        TableLoader,
        DropDown,
        EditDeviceModal,
        UpdateFTModal
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    data() {
        return {
            searchValue: '',
            devicesData: [],
            devicesCount: 0,
            deviceObj: {},
            fTDeviceId: '',
            searchLoader: false,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            showLoader: false,
            tableCount: 0, 
            details: {
                data: {},
                queryStrings: { id: '' }, 
                // info: [{ name: 'Edit', link: 'editDevices' }, { name: 'Update FT', link: 'updateFT' }], 
            }, 
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            device_id: function() {
                return {
                    template: DeviceId
                };
            },
            list_of_device: function() {
                return {
                    template: Temp
                };
            },
        }
    },
      created() {
        this.$eventHub.$on('showExtraDeviceButtons', (data, that) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            const currentGrid = this.searchValue ? grid.currentViewData : []
            
            this.details.queryStrings.id = data.deviceId
            this.details.data = data
            const drop = that.$parent.ej2Instances.pageSettings.pageSize
            let index 
            if (currentGrid.length && (currentGrid.length !== this.tableCount)) {
                index = currentGrid.findIndex((cur) => cur.index == data.index) + 1
            } else {
                index = data.index 
            }
            const indent = index - (Math.floor((index - 1) / drop) * drop)
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            option.style.top = `${((62 * indent) + (100 - (indent * 2))).toString()}px`
        })

        this.$eventHub.$on('shutDown', (id) => { 
            this.shutDown(id)
        })
        this.$eventHub.$on('restart', (id) => { 
            this.restart(id)
        })
        this.$eventHub.$on('editDevice', (deviceObj) => { 
            this.editDevice(deviceObj)
        })
        this.$eventHub.$on('updateFT', (fTDeviceId) => { 
            this.updateFt(fTDeviceId)
        })
        this.$eventHub.$on('refreshDevicesList', () => { 
            this.getDevices()
        })
    },
    beforeDestroy() { 
        this.$eventHub.$off('showExtraDeviceButtons');
        this.$eventHub.$off('shutDown');
        this.$eventHub.$off('restart');
        this.$eventHub.$off('editDevice');
        this.$eventHub.$off('updateFT');
    },
    mounted() {
        this.refreshGrid();
        this.getDevices()
        $(".e-input").keyup(function (e) {
            searchFun(e);
        });

        const searchFun = (event) => {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            this.searchValue = value
            grid.search(value);
        }
    },
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
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
        editDevice(deviceObj) {
            this.deviceObj = deviceObj
            this.$modal.show('editDevicesModal')
        },
        updateFt(fTDeviceId) {
            this.fTDeviceId = fTDeviceId
            this.$modal.show('updateFTModal')
        },
        shutDown(id) {
            let resp = confirm("Are you sure want to shut down this device?");
            if (resp) {
                this.axios
                .get(
                    `${configObject.apiBaseUrl}/Devices/ShutDownDevice/${id}`,
                    configObject.authConfig
                )
                .then((res) => {
                    this.getDevices()
                    this.$toast("Successfully shut down device", {
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
            }
        },
        restart(id) {
            let resp = confirm("Are you sure want to restart this device?");
            if (resp) {
                this.axios
                .get(
                    `${configObject.apiBaseUrl}/Devices/ReleaseDevice/${id}`,
                    configObject.authConfig
                )
                .then((res) => {
                    this.getDevices()
                    this.$toast("Successfully restarted device", {
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
            }
        },
        rowDataBound: function(arging) {
            arging.row.addEventListener("mouseover", args => {
                if(arging.data.nozzles) {
                    arging.row.children[1].children[0].children[0].innerHTML = arging.data.nozzles
                }
            });
            
            arging.row.addEventListener("mouseleave", args => {
                if(arging.data.nozzles) {
                    arging.row.children[1].children[0].children[0].innerHTML = arging.data.deviceId
                }
              
            });
        },
        getDevices() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Devices`, configObject.authConfig)
                .then(res => {
                    let index = 0;
                    res.data.sort((a, b) => {
                        if (a.companyName && b.companyName) {
                            return a.companyName.toLowerCase() > b.companyName.toLowerCase() ? 1 : b.companyName.toLowerCase() > a.companyName.toLowerCase() ? -1 : 0;
                        } else if (a.companyName && !b.companyName) {
                            return -1
                        } else { 
                            return 1
                        }
                    });
                    res.data.forEach(el => {
                        el.index = ++index;
                        el.name = `${el.companyName} (${el.branchName} - ${el.phone ? el.phone : ''}): ${el.city}`
                        el.lastDate = this.timeSince(new Date(el.lastDate))
                    })
                    sessionStorage.clear()
                    localStorage.setItem("devicesList", JSON.stringify(res.data))
                    this.devicesCount = res.data.length
                    this.tableCount = res.data.length
                    this.devicesData = res.data;
                    this.showLoader = false;
                })
                .catch(error => {
                    this.showLoader = false
                });
        },

        timeSince(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " year ago" : " years ago");
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " month ago" : " months ago");
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " day ago" : " days ago");
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " hour ago" : " hours ago");
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " minute ago" : " minutes ago");
            }
            return Math.floor(seconds) + (Math.floor(interval) == 1 ? " second ago" : " seconds ago");
        }
    }
}
</script>