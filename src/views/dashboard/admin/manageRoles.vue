<template>
  <masterLayout>
    <section class="mt-3 full__row_section">
      <div class="banner">
        <div class="row">
            <div class="col-lg-8 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by creating and managing your roles here</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                           <router-link :to="{name: 'create_roles'}" class="btn create_btn primary_btn">Create New</router-link>
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Roles</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                ></small>
                                </div>
                        </div>
                    </div>
              </div>

        </div>
      </div>
    </section>
    <div class="new_row_section mt-3">
      <EjsTable :tableProps="tableProps" />
    </div>
  </masterLayout>
</template>
<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import EjsTable from "@/components/ejsTable.vue";
import Temp from "@/components/list_of_roles_template.vue";

export default {
  components: {
    masterLayout,
    EjsTable,
  },
  data() {
    return {
      userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
      tableProps: {
        pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
        toolbar: ["ExcelExport", "PdfExport", "Search"],
        search: { operator: "contains", ignoreCase: true },
        tableData: [
          {
            index: 1,
            roles: "DPRAdmin",
          },
          {
            index: 2,
            roles: "Developer",
          },
          {
            index: 3,
            roles: "Dealers",
          },
          {
            index: 4,
            roles: "DPRControl",
          },
          {
            index: 5,
            roles: "WMAdmin",
          },
          {
            index: 6,
            roles: "DPR",
          },
          {
            index: 7,
            roles: "Branch Manager",
          },
        ],
        columns: [
          {
            field: "index",
            headerText: "#",
            width: 40,
            textAlign: "center",
          },
          {
            field: "roles",
            headerText: "Roles Name",
            width: 200,
            textAlign: "center",
          },
          {
            headerText: "Action",
            width: 300,
            textAlign: "center",
            template: () => {
              return {
                template: Temp,
              };
            },
          },
        ],
        fileName: "list_of_roles",
      },
    };
  },
  
    computed: {
        userName() {
            return `${this.userDetails.firstName} ${this.userDetails.lastName}`
        }
    },
};
</script>