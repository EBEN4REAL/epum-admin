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
                                    <h5 class="text-white font-weight">Number of Companies</h5>
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
                            <h3>List of Registered Companies.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <router-link :to="{name: 'create_companies'}" class="create_btn btn btn_theme">Create Companies</router-link>
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
import Temp from '@/components/list_of_companies_template.vue';

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
                    },
                    {
                        index: 2,
                        companyName: "Al-Istijabah Oil & Gas",
                    },
                    {
                        index: 3,
                        companyName: "Dalsis Oil & Gas Limited",
                    },
                    {
                        index: 4,
                        companyName: "LADO OIL",
                    },
                    {
                        index: 5,
                        companyName: "Eshcol Petroleum",
                    },
                    {
                        index: 6,
                        companyName: "Eterna",
                    },
                    {
                        index: 7,
                        companyName: "Rainoil",
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
                        headerText: "Company Name", 
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
                fileName: 'list_of_companies'
            },
        }
    }
}
</script>