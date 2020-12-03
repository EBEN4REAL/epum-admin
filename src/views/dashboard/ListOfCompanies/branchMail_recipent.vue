<template>
    <masterLayout :branchName="branchName">
         <section class=" mt-3 full__row_section">
            <div class="banner">
            <div class="row">
                <div class="col-lg-8 remove-padding-left padding_div pr-0">
                    <div class="dashboard__card small_card align-center">
                        <div class="row">
                        <div class="col-md-8 card_inner_wrapper">
                            <h3>Hi, {{userName}}</h3>
                            <p>Get started with epump company admin platform by managing your branch mail recipients</p>
                        </div>
                        <div class="col-md-4 mt-4 text-center">
                        </div>
                    </div>
                </div>
             </div>
                 <div class="col-lg-4">
                    <div class="dashboard__card large_card">
                        <div class="small__card_content_wrapper align-items-center justify-content-center" >
                            <p class="dashboard__card__header text-white">Total number of Mail Recipient</p>
                                <div class="icon_wrapper centralize text-center" style="margin-top: -12px;">
                                <img src="@/assets/img/company.png" width="40px" />
                                </div>
                                <div class="">
                                <small class="dashboard__card__header_bottom text-white font-weight-bold"
                                >{{mailRecpCount}}</small>
                                </div>
                        </div>
                    </div>
              </div>
            </div>
         </div>
        </section>
        <div  class="full__row_section ml-4 mt-3">
            <div class="row">
                <div class="col-lg-8">
                    <div class="pad_div">
                        <div class="text-left tabs__lists">
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
                                >
                                <e-columns>
                                    <e-column width="80" field="index" headerText="#"></e-column>
                                    <e-column width="300" field="email" headerText="Email"></e-column>
                                    <e-column width="250" field="phoneNumber" headerText="Phone Number"></e-column>
                                   <e-column :template="BranchMailRecp" headerText="Action" width="200"></e-column>
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
                                        <div class="text-left">
                                            <!-- <label for="">Email</label> -->
                                        </div>
                                        <div class="input__block">
                                        <input type="email" placeholder="Enter your Email" class="" v-model="email"/>
                                        </div>
                                    </div>
                                    <div class="align-items-center mt-3">
                                        <div class="text-left">
                                            <!-- <label for="">Phone Number</label> -->
                                        </div>
                                        <div class="input__block">
                                            <input type="number" placeholder="Enter Your Phone Number" class="" v-model="phone" />
                                        </div>
                                    </div>
                                    <div class="text-center mt-3">
                                        <button class="btn btn_theme" @click="createMailRecp"
                                            :disabled="isButtonDisabled ? true : null"
                                            :style="[
                                                isButtonDisabled
                                                ? { cursor: 'not-allowed' }
                                                : { cursor: 'pointer' }
                                            ]"
                                            >Create
                                            <img
                                                src="@/assets/img/git_loader.gif"
                                                style="display:none"
                                                width="35px"
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
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;
import TableLoader from "@/components/tableLoader/index";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import BranchMailRecp from '@/components/Templates/branch_mail_recp_template'



export default {
    components: {
        masterLayout,
        TableLoader
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
    },
    data() {
        return {
            branchName: '',
            phone: null,
            email: null,
            backgroundUrl,
            showLoader: false,
            isButtonDisabled: false,
            mailRecpCount:0,
            userDetails: localStorage.getItem("adminUserDetails") ? JSON.parse(localStorage.getItem("adminUserDetails")) : null,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
            BranchMailRecp: () => {
                return {
                    template:   BranchMailRecp
                }
            }
        }
    },
    mounted() {
        this.getMailRecp()

        const companyBranchId = this.$route.query.companyBranchId
        let ml = sessionStorage.getItem(companyBranchId)
        if (!ml){
            let allData = localStorage.getItem("branchesList")
            let dt = JSON.parse(allData)
            dt.forEach((my, index) =>{
                if(my.id === companyBranchId){
                    ml = JSON.stringify(my)
                    sessionStorage.setItem(companyBranchId, ml)
                }
            })
        }
        let companyBranchDetails = JSON.parse(ml)
        this.branchName = companyBranchDetails.name

        $(".e-input").keyup(function(e) {
            searchFun(e);
        });
        function searchFun(event) {
            var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
            var value = event.target.value;
            grid.search(value);
        }
    },
    created()  {
        this.$eventHub.$on('refreshBranchMailRecps', () => { 
            this.getMailRecp()
        })
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
                `${configObject.apiBaseUrl}/Branch/MailRecipients/${this.$route.query.companyBranchId}`, configObject.authConfig())
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

            this.isButtonDisabled = true;
            $('.loader').show();
            
            this.axios.post(`${configObject.apiBaseUrl}/Branch/CreateMailRecipient`,data, configObject.authConfig())
                .then(res => {
                    this.$toast("Mail Recipient created successfully", {
                        type: "success",
                        timeout: 3000
                    });
                    this.phone = null
                    this.email = null
                    this.isButtonDisabled = false;
                    this.getMailRecp()
                    $('.loader').hide();
                })
                .catch(error => {
                    this.refreshRoles = false;
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
        }
    }
}
</script>