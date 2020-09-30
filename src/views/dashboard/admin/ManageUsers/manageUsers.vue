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
                                    <h5 class="text-white font-weight">Number of Users</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">50</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Registered Users.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <!-- <router-link :to="{name: 'create_companies'}" class="create_btn btn btn_theme">Create Companies</router-link> -->
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
import Temp from '@/components/manageUsersTemplate.vue';

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
                        userName: "eben@g.com",
                        firstName: "Ebenezer",
                        lastName: "Igbinoba",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 2,
                        userName: "josh@g.com",
                        firstName: "Josh",
                        lastName: "Igbinoba",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 3,
                        userName: "john@die.com",
                        firstName: "John",
                        lastName: "Doe",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 4,
                        userName: "sarah@g.com",
                        firstName: "Sarah",
                        lastName: "Doe",
                        phoneNumber: "080748464838"
                    },
                    {
                        index: 5,
                        userName: "eben@g.com",
                        firstName: "Ebenezer",
                        lastName: "Igbinoba",
                        phoneNumber: "080748464838"
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
                        field: "userName", 
                        headerText: "User Name", 
                        width: 300, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "firstName", 
                        headerText: "First Name", 
                        width: 300, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "lastName", 
                        headerText: "Last Name", 
                        width: 300, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "phoneNumber", 
                        headerText: "phoneNumber", 
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