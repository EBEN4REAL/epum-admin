<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div class="row">
                <div class="col-md-12">
                    <div class="banner" >
                        <h4>Companies</h4>
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