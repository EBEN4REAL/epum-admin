<template>
    <masterLayout>
        <div class="new_row_section">
            <div class="page_title">
                <p>PEF DASHBOARD</p>
            </div>
            <div class="row mt-3">
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           Outlets
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           PMS Available
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           AGO Available
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           DPK Available
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="new_row_section mt-3">
            <EjsTable :tableProps="tableProps"  />
        </div>
    </masterLayout>
</template>

<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import EjsTable from '@/components/ejsTable.vue';
import Temp from '@/components/template.vue';

export default {
    components: {
        masterLayout,
        EjsTable,
    },
    mounted(){
       
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
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 2,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 3,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 4,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 1,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 2,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 3,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 4,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 1,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 2,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 3,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 4,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 1,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 2,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 3,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 4,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 1,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 2,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    },
                    {
                        index: 3,
                        amount: "1",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "91458479",
                        recipient: "08145191307",
                    },
                    {
                        index: 4,
                        amount: "2",
                        channel: "Channel",
                        extraMessage: "Great",
                        pin: "41458478",
                        recipient: "08145191307",
                    }
                ],
                columns: [ 
                    { 
                        field: "index", 
                        headerText: "#", 
                        width: 120, 
                    }, 

                    { 
                        field: "amount", 
                        headerText: "Amount", 
                        width: 120, 
                    }, 
                    { 
                        field: "pin", 
                        headerText: "PIN", 
                        width: 200, 
                    }, 
                    { 
                        field: "recipient", 
                        headerText: "Recipient", 
                        width: 200, 
                    }, 
                    { 
                        field: "extraMessage", 
                        headerText: "Extra Message", 
                        width: 200, 
                    }, 
                    { 
                        field: "channel", 
                        headerText: "Channel", 
                        width: 200, 
                    },
                     { 
                        headerText: "Action", 
                        width: 200, 
                        template:   function(e) {
                            return {
                                template: Temp
                            }
                        }
                    }, 
                ] ,
              
            },
        }
    }
}
</script>
