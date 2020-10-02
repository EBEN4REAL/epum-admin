<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card" :style="[
                        {
                            background: '#370F70',
                        }
                        ]">
                        <div class="row make-row-hundred-percent align-items-center justify-content-center" >
                            <div class="col-md-3">
                                 <div class="icon_wrapper yellow centralize icon_div_big">
                                    <i class="fa fa-users" aria-hidden="true" style="font-size: 35px"></i>
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of POS</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">28</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Registered POS</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <router-link :to="{name: ''}" class="create_btn btn btn_theme">Add Firmware</router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
        </section>
        <div class="new_row_section mt-3">
            <EjsTable :tableProps="tableProps"  />
        </div>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import EjsTable from '@/components/ejsTable.vue';
import Temp from '@/components/devicePosTemplate.vue';

export default {
    components: {
        masterLayout,
        EjsTable
    },
    data() {
        return {
              tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        state: "Lagos",
                        firmware: "Can Access Firmware Update: NO"
                    },
                    {
                        index: 2,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        state: "Lagos",
                        firmware: "Can Access Firmware Update: NO"
                    },
                    {
                        index: 3,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        state: "Lagos",
                        firmware: "Can Access Firmware Update: NO"
                    },
                    {
                        index: 4,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        state: "Lagos",
                        firmware: "Can Access Firmware Update: NO"
                    },
                    {
                        index: 5,
                        devices: 11111111111,
                        lastUpdate: "> 1 month ago",
                        fwVersion: 20403,
                        memoryUsage: 0.00,
                        name: "Eterna Sales (ETERNA SERVICE STATION ILARA MOKIN-08032704382) : AKURE",
                        state: "Lagos",
                        firmware: "Can Access Firmware Update: NO"
                    },
                ],
                columns: [ 
                    { 
                        field: "index", 
                        headerText: "#", 
                        width: 40, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "devices", 
                        headerText: "Devices", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "lastUpdate", 
                        headerText: "Last Update", 
                        width: 180, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "fwVersion", 
                        headerText: "FW Version", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "memoryUsage", 
                        headerText: "Memory Usage", 
                        width: 150, 
                        textAlign: "center"
                    },
                    { 
                        field: "name", 
                        headerText: "Name", 
                        width: 300, 
                        textAlign: "center"
                    },
                    { 
                        field: "state", 
                        headerText: "State", 
                        width: 100, 
                        textAlign: "center"
                    },
                    { 
                        field: "firmware", 
                        headerText: "Firmware Update", 
                        width: 300, 
                        textAlign: "center"
                    },
                    { 
                        headerText: "Action", 
                        width: 500, 
                        textAlign: "center",
                        template:   () => {
                            return {
                                template: Temp
                            }
                        }
                    },  
                ] ,
                fileName: 'pos'
            },
        }
    }
}
</script>