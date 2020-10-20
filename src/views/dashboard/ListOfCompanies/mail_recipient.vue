<template>
    <masterLayout>
        <section class="mt-3 full__row_section banner-gradient"  :style="[
                {
                backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
                }
            ]">
        <div class="row align-items-center justify-content-center hundred-percent-height">
            <div class="col-md-12 ">
            <div class="text-center ">
                <h5 class="title">MAIL RECIPIENTS</h5>
            </div>
            </div>
        </div>
        </section>
        <div  class="full__row_section ml-4 mt-3">
            <div class="row">
                <div class="col-lg-5 col-md-4 div ep_card card_height mail_card mb-5">
                    <div class="pad_div">
                        <div class="mb-3 tabs__lists">
                            <h5>Add to Mail Recipients</h5>
                        <form>
                    <div class="text-center">
                        <div class="align-items-center mt-3">
                           <div class="text-left">
                                <label for="">Email</label>
                            </div>
                            <div class="input__block">
                            <input type="email" placeholder="Email" class="" v-model="email"/>
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
                
                <div class="col-lg-7">
                    <div class="new_row_section mt-3">
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
                                <e-column width="40" field="index" headerText="#"></e-column>
                                <e-column width="200" field="email" headerText="Email"></e-column>
                                <e-column width="10" ></e-column>
                            </e-columns>
                        </ejs-grid>
                        <TableLoader :showLoader="showLoader"/>
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
import TableLoader from "@/components/tableLoader/index";
import configObject from "@/config";
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

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
            backgroundUrl,
            isButtonDisabled: false,
            showLoader: false,
            email: '',
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
            },
        }
    },
    mounted() {
        this.getMailRecipients()
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
                        fileName: "mail-recipients.pdf"
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
        getMailRecipients() {
            this.showLoader = true;
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/${this.$route.query.companyId}`, configObject.authConfig)
                .then(res => {
                    let index = 0
                    res.data.companyMailRecipients.sort((a, b) => {
                        return a.email.toLowerCase() > b.email.toLowerCase() ? 1 : b.email.toLowerCase() > a.email.toLowerCase() ? -1 : 0;
                    });
                    res.data.companyMailRecipients.forEach(el => {
                        el.index = ++index;
                    })
                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data.companyMailRecipients
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
            
            const data = {
                email: this.email,
                companyId: this.$route.query.companyId
            }
            this.isButtonDisabled = true;

            $('.loader').show();
            this.axios.post(`${configObject.apiBaseUrl}/Company/AddMailRecipient`,data, configObject.authConfig)
                .then(res => {
                    this.$toast("Mail Recipient created successfully", {
                        type: "success",
                        timeout: 3000
                    });
                    this.isButtonDisabled = false;
                    this.email = null
                    this.getMailRecipients()
                    $('.loader').hide();
                })
                .catch(error => {
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