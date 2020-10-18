<template>
    <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                 <div class="col-lg-4">
                        <div class="dashboard__card large_card">
                        <div class="row make-row-hundred-percent align-items-center justify-content-center" >
                            <div class="col-md-3">
                                 <div class="icon_wrapper yellow centralize icon_div_big">
                                    <img src="@/assets/img/company_icon.png"  width="40" />
                                </div>
                            </div>
                            <div class="col-md-7 remove-padding-left">
                                <div class="text-center">
                                    <h5 class="text-white font-weight"> Mail Recipients</h5>
                                </div>
                             <div class="text-center mt-4">
                                    <h5 class="text-white mt-4 font-weight">{{mailRecpCount}}</h5>
                                </div>
                           </div>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-8 remove-padding-left padding_div">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-9 card_inner_wrapper">
                            <h3>List of Mail Recipients.</h3>
                        </div>
                        <div class="col-md-3 mt-4">
                           <!-- <router-link :to="{name: 'create_companies'}" class="create_btn btn btn_theme">Create Company</router-link> -->
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                </div>
        </section>
        <div  class="full__row_section mt-3">
            <div class="row">
                <div class="col-lg-8">
                    <div class="pad_div">
                        <div class="text-left tabs__lists">
                           <ejs-grid
                                v-show="!showLoader"
                                ref="dataGrid"
                                :created="refreshGrid"
                                :allowPaging="false"
                                :allowSorting="true"
                                :pageSettings="tableProps.pageSettings"
                                :toolbar="tableProps.toolbar"
                                :searchSettings="tableProps.search"
                                :allowExcelExport="true"
                                :allowPdfExport="true"
                                :toolbarClick="toolbarClick"
                                >
                                <e-columns>
                                    <e-column width="40" field="index" headerText="#"></e-column>
                                    <e-column width="300" field="email" headerText="Email"></e-column>
                                    <e-column width="250" field="phoneNumber" headerText="Phone Number"></e-column>
                                    <e-column width="10"></e-column>
                                </e-columns>
                            </ejs-grid>
                          <TableLoader :showLoader="showLoader"  />
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 div ep_card card_height mail_card mb-5">
                    <div class="pad_div">
                        <div class="mb-3 tabs__lists">
                            <h5>Add Mail Recipient to Branch</h5>
                            <form>
                                <div class="text-center">
                                    <div class="align-items-center mt-3">
                                        <div class="input__block">
                                        <input type="email" placeholder="Email" class="" v-model="email"/>
                                        </div>
                                    </div>
                                    <div class="align-items-center mt-3">
                                        <div class="input__block">
                                            <input type="number" placeholder="Phone" class="" v-model="phone" />
                                        </div>
                                    </div>
                                    <div class="text-center mt-3">
                                        <button class="btn btn_theme" @click="createMailRecp">Create
                                            <img
                                                src="@/assets/img/git_loader.gif"
                                                style="display:none"
                                                width="19"
                                                class="ml-3 loader"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import EjsTable from '@/components/ejsTable.vue';
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";


export default {
    components: {
        masterLayout,
        EjsTable,
        TableLoader
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    data() {
        return {
            phone: null,
            email: null,
            backgroundUrl,
            showLoader: false,
            mailRecpCount:0,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
        }
    },
    mounted() {
        this.getMailRecp()
        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
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
                    fileName: "branch_mail_recipient"
                }
                this.$refs.dataGrid.pdfExport();
                break;
                case "Excel Export":
                this.$refs.dataGrid.excelExport();
                break;
            }
        },
        validateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return true;
            }
            return false;
        },
        getMailRecp() {
            this.showLoader = true
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Branch/MailRecipients/${this.$route.query.companyBranchId}`, configObject.authConfig)
                .then(res => {
                    let index = 0;
                    res.data.sort((a, b) => {
                        return a.email.toLowerCase() > b.email.toLowerCase() ? 1 : b.email.toLowerCase() > a.email.toLowerCase() ? -1 : 0;
                    });
                    res.data.forEach(el => {
                        el.index = ++index;
                    })
                    this.mailRecpCount = res.data.length
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
        createMailRecp(event){
            event.preventDefault();
            if(!this.email) {
                this.$toast("Email  Field cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }else {
                if(!this.validateEmail(this.email)) {
                this.$toast("Invalid Email Format", {
                    type: "error", 
                    timeout: 3000
                });
                return;
                }
            }
            if(!this.phone) {
                this.$toast("Phone Field Cannot be blank", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }else {
                 if(this.phone.length < 10 || this.phone.length > 13) {
                    this.$toast("Phone Number Should be between 10 and 13 characters", {
                        type: "error", 
                        timeout: 3000
                    });
                    return;
                }
            }
            
            const data = {
                phoneNumber: this.phone,
                email: this.email,
                branchId: this.$route.query.companyBranchId
            }

            $('.loader').show();
            this.axios.post(`${configObject.apiBaseUrl}/Branch/CreateMailRecipient`,data, configObject.authConfig)
                .then(res => {
                    this.$toast("Mail Recipient created successfully", {
                        type: "success",
                        timeout: 3000
                    });
                    this.phone = null
                    this.email = null
                    this.getMailRecp()
                    $('.loader').hide();
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast("Unable to create mail recipient", {
                        type: "error",
                        timeout: 3000
                    });
                });
        }
    }
}
</script>