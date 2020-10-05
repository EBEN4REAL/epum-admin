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
                                    <img src="@/assets/img/company_icon.png"  width="40" />
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight">Number of Branches</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">66</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Registered Branches.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <router-link :to="{name: 'create_branch'}" class="create_btn btn btn_theme">Create New Branch</router-link>
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
import Temp from '@/components/list_of_branches_template.vue';

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
                        companyName: "Jidsma oil & Gas",
                        dealerName: "Jidsma",
                        name: "Mushin",
                        city: "Mushin",		
                        state: "Lagos",
                        country: "Nigeria",
                     },
                    {
                        index: 2,
                        companyName: "Al-Istijabah Oil & Gas",
                        dealerName: "Jidsma",
                        name: "Mushin",
                        city: "Mushin",		
                        state: "Lagos",
                        country: "Nigeria",
                    },
                    {
                        index: 3,
                        companyName: "Dalsis Oil & Gas Limited",
                        dealerName: "Jidsma",
                        name: "Mushin",
                        city: "Mushin",		
                        state: "Lagos",
                        country: "Nigeria",
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
                        field: "companyName", 
                        headerText: "Branch Name", 
                        width: 300, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "dealerName", 
                        headerText: "Dealer Name", 
                        width: 200, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "name", 
                        headerText: "Name", 
                        width: 200, 
                        textAlign: "center"
                    },
                    { 
                        field: "city", 
                        headerText: "City", 
                        width: 100, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "state", 
                        headerText: "State", 
                        width: 80, 
                        textAlign: "center"
                    },
                    { 
                        field: "country", 
                        headerText: "Country", 
                        width: 150, 
                        textAlign: "center"
                    }, 
                    { 
                        headerText: "Action", 
                        width: 580, 
                        textAlign: "center",
                        template:   () => {
                            return {
                                template: Temp
                            }
                        }
                    }, 
                ] ,
                fileName: 'list_of_branches'
            },
        }
    }
}
</script>