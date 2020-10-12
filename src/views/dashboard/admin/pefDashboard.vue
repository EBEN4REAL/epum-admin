<template>
    <masterLayout>
        <div class="new_row_section">
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
import masterLayout from '@/views/dashboard/masterLayout';
import EjsTable from '@/components/ejsTable.vue';
import ProductDistTemplate from '@/components/ProductDistTemplate.vue';



export default {
    components: {
        masterLayout,
        EjsTable
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
                        state: "Lagos",
                        pms: 23000,
                        ago: 20000,
                        dpk: 10000,
                        total: 73000
                    },
                    {
                        index: 2,
                        state: "Oyo",
                        pms: 23000,
                        ago: 20000,
                        dpk: 10000,
                        total: 73000
                    },
                    {
                        index: 3,
                        state: "Ondo",
                        pms: 23000,
                        ago: 20000,
                        dpk: 10000,
                        total: 73000
                    },
                     {
                        index: 4,
                        state: "Abuja",
                        pms: 23000,
                        ago: 20000,
                        dpk: 10000,
                        total: 73000
                    },
                    {
                        index: 5,
                        state: "Kano",
                        pms: 23000,
                        ago: 20000,
                        dpk: 10000,
                        total: 73000
                    },
                    {
                        index: 6,
                        state: "Benue",
                        pms: 23000,
                        ago: 20000,
                        dpk: 10000,
                        total: 73000
                        
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
                        field: "state", 
                        headerText: "State", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "pms", 
                        headerText: "PMS(Naira)", 
                        width: 200, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "dpk", 
                        headerText: "DPK(Naira)", 
                        width: 200, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "ago", 
                        headerText: "AGO(Naira)", 
                        width: 200, 
                        textAlign: "center"
                    },
                    { 
                        field: "total", 
                        headerText: "Total(Naira)", 
                        width: 200, 
                        textAlign: "center"
                    }, 
                ] ,
                fileName: 'list_of_companies'
            },
        }
    }
}
</script>
