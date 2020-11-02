<template>
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
                :allowTextWrap='false'
                >
                <e-columns>
                    <e-column width="80" field="index" headerText="#"></e-column>
                    <e-column width="150" :template="device_id" headerText="Device"></e-column>
                    <e-column width="300" field="name" headerText="name"></e-column>
                    <e-column width="200" field="lastDate" headerText="Last Update"></e-column>
                    <e-column width="200" field="firmWareVersion" headerText="FW Version"></e-column>
                    <e-column width="200" field="memoryUsage" headerText="Memory Usage"></e-column>
                    <e-column width="200" field="state" headerText="State"></e-column>
                    <e-column width="200" field="firmwareUpdate" headerText="Firmware Update"></e-column>
                    <e-column :template="list_of_device" headerText="Action" width="300"></e-column>
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
import Temp from '@/components/list_of_device.vue';
import DeviceId from '@/components/device_id.vue';
import DropDown from '@/components/Templates/Dropdown/dropdown.vue';
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import TableLoader from "@/components/tableLoader/index";
import configObject from "@/config";

import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        masterLayout,
        TableLoader,
        DropDown
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    data() {
        return {
            devicesCount: 0,
            searchLoader: false,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            showLoader: false,
            tableCount: 0, 
            details: {
                queryStrings: { id: '' }, 
                info: [{ name: 'Edit', link: 'editDevices' }], 
                delete: { hasDelete: true, deleteName: 'shutDown', name: 'Shut Down', query: 'id' }
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
            this.details.queryStrings.id = data.deviceId
            const drop = that.$parent.ej2Instances.pageSettings.pageSize
            const indent = data.index - (Math.floor((data.index - 1) / drop) * drop)
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            if ((data.index == this.tableCount && this.tableCount > 1) || (data.index == (this.tableCount - 1) && this.tableCount > 1)) {
                const num = this.details.delete.hasDelete ? 1 : 0
                option.style.top = `${(((52 * (indent - 1))) + 108 - (32 * (num + this.details.info.length))).toString()}px`
            } else {
                option.style.top = `${((62 * indent) + (100 - (indent * 2))).toString()}px`
            }
            
        })
        this.$eventHub.$on(this.details.delete.deleteName, (id) => { 
            this.shutDown(id)
        })
    },
    beforeDestroy() { 
        this.$eventHub.$off('showExtraDeviceButtons');
        this.$eventHub.$off(this.details.delete.deleteName);
    },
    mounted() {
        this.refreshGrid();
        this.getDevices()
        $(".e-input").keyup(function (e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
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
        shutDown(id) {
            let resp = confirm("Are you sure want to shut down this device?");
            if (resp) {
                return
                this.axios
                .delete(
                    `${configObject.apiBaseUrl}/Devices/ShutDownDevice/${id}`,
                    configObject.authConfig
                )
                .then((res) => {
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
        getDevices() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Devices`, configObject.authConfig)
                .then(res => {
                    console.log(res.data)
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
                        el.lastDate = this.$moment(el.lastDate).format("MM/DD/YYYY hh:mm A");
                        el.index = ++index;
                        el.name = `${el.companyName} (${el.branchName} - ${el.phone ? el.phone : ''}): ${el.city}`
                    })
                    sessionStorage.clear()
                    localStorage.setItem("devicesList", JSON.stringify(res.data))
                    this.devicesCount = res.data.length
                    this.tableCount = res.data.length
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
    }
}
</script>