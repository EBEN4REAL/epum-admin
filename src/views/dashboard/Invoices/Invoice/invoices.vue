<template>
    <div>
        <SendInvoice :id="details.queryStrings.id"></SendInvoice>
        <MasterLayout>
            <div class="p-4">
                <div class="dialog-container">
                    <div class="row">
                        <div class="col-md-7">
                            <h4 class="primary-color"> Invoices</h4>
                        </div>
                        <div class="col-md-5 text-right create-invoice-dropdwon">
                            <b-dropdown id="dropdown-right" right text="Create an invoice" variant="primary" class="m-2">
                                <b-dropdown-item>
                                    <router-link :to="{name: 'invoice'}">
                                        Create an invoice
                                    </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item>
                                    <router-link :to="{name: 'auto_subscription'}">
                                        Generate auto subscription
                                    </router-link>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <div class="invoice-banner mt-3">
                        <div>
                            <div>
                                <span class="deep-grey bold-span invoice-header">Overdue</span>
                            </div>
                            <div class="">
                                <span><span class="currency">₦</span><span class="amount-figures">{{overDueAmount}}</span><span class="grey-text bold-span">NGN</span></span>
                            </div>
                            <div class="grey-text">
                                <span>Last updated 11 minutes ago.</span>
                            </div>
                        </div>
                         <div>
                            <div>
                                <span class="deep-grey bold-span invoice-header">Due within next 30 days</span>
                            </div>
                            <div>
                                 <span class="currency">₦</span><span class="amount-figures">{{dueInThirtyDays}}</span><span class="grey-text bold-span">NGN</span>
                            </div>
                        </div>
                         <div>
                             <div>
                                <span class="deep-grey bold-span invoice-header">Average time to get paid</span>
                            </div>
                            <div>
                                <span class="amount-figures">{{averageTimeToGetPaid}}</span><span class="grey-text bold-span">days</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <span class="counter mr-2">
                            0
                        </span>
                        <span class="bold-span">
                            Active filters
                        </span>
                    </div>
                    <div class="mt-3">
                        <form>
                            <div class="row ">
                                <div class="col-md-4 padding-right-none position-relative">
                                   <div class="dropdown-select-container cursor-pointer dropdown-parent" @click="toggleDropdown">
                                        <div class="row align-items-center  height-100 pl-3 pr-3">
                                            <div class="col-md-10">
                                                <span class="dropdown-value">{{selectedCompany.name}}</span>
                                            </div>
                                            <div class="col-md-2">
                                                <i class="fa fa-caret-down" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                   </div>
                                    <div class="dropdown__content" v-if="showDropdown">
                                        <div class=" m-2" >
                                            <div class="row align-items-center">
                                                <div class="col-md-1 text-right padding-right-none">
                                                    <i class="fa fa-search ml-2"  aria-hidden="true"></i>
                                                </div>
                                                <div class="col-md-11">
                                                    <input type="search" autofocus  class="form-control dropdown-search" placeholder="Type a customer name"  v-model="companySearch"   style="box-shadow: none !important"  />
                                                </div>
                                            </div>
                                        </div>
                                        <ul class="dropdown-menu-list">
                                            <li class="dropdown-list cursor-po" v-for="(cp,i) in filteredCompanies" :key='i'   @click="selectCompany(cp)">{{cp.name}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-2 padding-right-none">
                                     <vue-ctk-date-time-picker
                                            id="DateTimePicker1"
                                            v-model="fromDate"
                                            color="#370F70"
                                            format="YYYY-MM-DDTHH:mm:ss"
                                            formatted="DD/MM/YYYY"
                                            position="bottom"
                                            :onlyDate="true"
                                            :autoClose="true"
                                            :label="fromLabel"
                                            
                                        />  
                                       
                                </div>
                                <div class="col-md-4 padding-right-none">
                                    <div class="row">
                                        <div class="col-md-6 padding-right-none">
                                           <vue-ctk-date-time-picker
                                                id="DateTimePicker"
                                                v-model="toDate"
                                                color="#370F70"
                                                format="YYYY-MM-DDTHH:mm:ss"
                                                formatted="DD/MM/YYYY"
                                                position="bottom"
                                                :onlyDate="true"
                                                :autoClose="true"
                                                :label="toLabel"
                                            />  
                                        </div>
                                        <div class="col-md-6">
                                            <select class="form-control" v-model="status">
                                                <option selected value="allStatus">All status</option>
                                                <option value="0">Draft</option>
                                                <option value="1">Sent</option>
                                                <option value="2">Unsent</option>
                                                <option value="3">OverDue</option>
                                                <option value="4">Paid</option>
                                                <option value="5">PartPaid</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" autofocus  class="form-control" placeholder="Enter invoice #" v-model="invoiceNumber"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="mt-3">
                        <div class="filter-menu">
                            <div class="filter-item mr-3  text-center" @click="changeStatus('draft')" :class="[activeStatus === 'draft' ? 'activeFilter' : null]">
                                <span class="mr-2 " :class="[activeStatus === 'draft' ? 'activeFilter' : null]">Draft</span>
                                <span class="counter mr-2">{{draftCount}}</span>
                            </div>
                            <div class="filter-item mr-3  text-center" @click="changeStatus('sent')" :class="[activeStatus === 'sent' ? 'activeFilter' : null]">
                                <span class="mr-2 " :class="[activeStatus === 'sent' ? 'activeFilter' : null]">Sent</span>
                                <span class="counter mr-2">{{unpaidCount}}</span>
                            </div>
                            <div class="filter-item text-center" @click="changeStatus('all')" :class="[activeStatus === 'all' ? 'activeFilter' : null]">
                                <span class="mr-2" :class="[activeStatus === 'all' ? 'activeFilter' : null]">All invoices</span>
                                <span class="counter mr-2">{{tableCount}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="position-relative">
                    <ejs-grid
                        v-show="!showLoader"
                        ref="dataGrid"
                        :created="refreshGrid"
                        :allowPaging="false"
                        :actionBegin='actionHandler'
                        :allowSorting="true"
                        :allowExcelExport="false"
                        :allowPdfExport="false"
                        :toolbarClick="toolbarClick"
                        :allowTextWrap='true'
                        >
                        <e-columns>
                            <e-column width="100" :template="invoiceTemplate" headerText="Status"></e-column>
                            <e-column width="200" field="invoiceDueDateFormatted" headerText="Due Date" ></e-column>
                            <e-column width="200" field="customerName" headerText="Customer" ></e-column>
                            <e-column width="180" field="amountDue" headerText="Amount Due (₦)" textAlign="right"></e-column>
                            <e-column :template="list_of_invoices_templates" headerText="Action" width="200"></e-column>
                        </e-columns>
                    </ejs-grid>
                    <TableLoader :showLoader="showLoader"/>
                    <div class="mt-3" style="margin:  0 auto">
                        <Paginator 
                            v-show="!showLoader"
                            :total-pages="totalPages"
                            :per-page="pageSize"
                            :current-page="currentPage"
                            @pagechanged="onPageChange"
                            @getPageSize="getPageSize"
                            :pageSize="pageSize"
                        />
                    </div>
                    <DropDown :details="details"/>
                </div>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";
import TableLoader from "@/components/tableLoader/index";
import Datepicker from 'vuejs-datepicker';
import {Page,Sort,Toolbar,Search, groupAggregates} from "@syncfusion/ej2-vue-grids";
import Temp from '@/components/Templates/invoices';
import DropDown from '@/components/Templates/Dropdown/invoiceDropDown.vue';
import Paginator from '@/components/Paginator.vue';
import invoiceTemp from '@/components/Templates/list_of_invoices_template.vue';
import SendInvoice from "@/components/modals/Invoices/sendInvoice"


import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout,
        Datepicker,
        TableLoader,
        Paginator,
        DropDown,
        SendInvoice
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            from: '',
            to: '',
            pageSize: '10',
            tableCount: 0, 
            totalPages: 1,
            currentPage: 1,
            first: true,
            sortType: '',
            sortColumn: '',
            status: 'allStatus',
            activeStatus: 'all',
            companyName: '',
            unpaidCount: 0,
            draftCount: 0,
            allCount:0,
            options: [
                { name: 'Delhi', id: '1' },
                { name: 'Bhopal', id: '2' },
                { name: 'Patna', id: '3' },
                { name: 'Ranchi', id: '4' },
                { name: 'Noida', id: '5' }                         
            ],   
            fromLabel: 'From',
            invoiceTemplate: () => {
                return {
                    template: Temp
                };
            },
            toLabel: 'To',
            selectedCompany: {name: 'All Companies'},
            isButtonDisabled: false,
            scheduleDateTime: null,
            showLoader: false,
            fromDate: '',
            toDate: '',
            invoiceNumber: '',
            showCompanies: false,
            companySearch: '',
            companyId:"select company",
            showDropdown: false,
            overDueAmount: 0,
            dueInThirtyDays: 0,
            averageTimeToGetPaid: 0,
            companies: [],
            details: {
                queryStrings: { id: '' }, 
                info: [ { name: 'Send Invoice', emitName: 'sendInvoice' }, { name: 'Record Payment', emitName: 'recordPayment' }, { name: 'Edit', emitName: 'editInvoice' }], 
                delete: { hasDelete: true, deleteName: 'deleteInvoice', name: 'Delete', query: 'id' }
            }, 
            list_of_invoices_templates: function() {
                return {
                    template: invoiceTemp
                };
            },
        }
    },
    mounted() {
        if(localStorage.getItem('invoiceCustomers')) {
            this.companies = JSON.parse(localStorage.getItem('invoiceCustomers'))
        }else {
            this.getCompanies()
        }  
        document.addEventListener('click' , (e) => {
            if(e.target.contains(document.querySelector('.dropdown__content'))) {
                this.showDropdown = !this.showDropdown
            }
        })
        this.getCompanies()
        this.getInvoices()
        this.getInvoiceSummary()
        Array.from(document.getElementsByTagName('input')).forEach(input => {
            if(!Array.from(input.classList).includes('form-control')) {
                input.classList.add('form-control')
            }
        })
       
    },
    watch: {
        fromDate: function (newDate) {
            if (newDate) {
                this.getInvoices()
            }
        },

        toDate: function (newDate) {
            if (newDate) {
                this.getInvoices()
            }
        },
        invoiceNumber: function (newNumber) {
            this.getInvoices()
        },
        status: function (newStatus) {
            this.getInvoices()
        }
    },
    computed: {
        filteredCompanies() {
            let companies =  this.companies.filter(company => company.name.toLowerCase().includes(this.companySearch.toLowerCase()))
            companies.unshift({ name: 'All Companies' })
            return companies
        },
        totalAmount() {
            return this.invoiceItems.reduce((acc,cur) => {
                return acc += ((cur.quantity * cur.price))
            }, 0)
        }
    },
    created() {
        this.$eventHub.$on('showInvoicesDropdown', (data) => {
            this.details.queryStrings.id = data.id
            const option = document.getElementById('myDropdown')
            option.classList.add("show")
            option.style.top = `${((59 * data.index) + (85 - (data.index * 2))).toString()}px`
        })

        this.$eventHub.$on(this.details.info[0].emitName, (id) => { 
            this.sendInvoice(id)
        })

        this.$eventHub.$on(this.details.info[1].emitName, (id) => { 
            this.recordPayment(id)
        })

        this.$eventHub.$on(this.details.info[2].emitName, (id) => { 
            this.edit(id)
        })

        this.$eventHub.$on(this.details.delete.deleteName, (id) => { 
            this.deleteInvoice(id)
        })

        this.$eventHub.$on("refreshInvoicesList", () => {
            this.currentPage = 1
            this.getInvoices()
            this.getInvoiceSummary()
        });
    },
    methods: {
        actionHandler: function(args) {
            if (args.requestType == 'sorting') {
                if (args.direction) {
                    this.sortType = args.direction
                    this.sortColumn = args.columnName
                } else {
                    this.sortType = ''
                    this.sortColumn = ''
                }
                
                this.getInvoices()
            }
        },
        getPageSize(pageSize) {
            this.pageSize = pageSize;
            this.currentPage = 1
            this.totalPages = Math.ceil(this.getInvoices.totalNumber / pageSize)
            this.getInvoices();
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getInvoices();
        },
        getInvoiceSummary() {
            this.axios
                .get(
                    `${configObject.apiBaseUrl}/Invoices/invoices-summary`, configObject.authConfig())
                    .then(res => {
                        this.overDueAmount = this.convertThousand(res.data.overDue)
                        this.dueInThirtyDays = this.convertThousand(res.data.dueInThirtyDays)
                        this.averageTimeToGetPaid = res.data.averageTimeToGetPaid
                    })
                    .catch(error => {
                        this.showLoader = false
                    });
        },
        getInvoices() {
            this.first ? this.showLoader = true : this.showLoader = false
            this.first = false
            const status = this.status == 'allStatus' ? '' : parseInt(this.status)
            const companyName = this.selectedCompany.name == 'All Companies' ? '' : this.selectedCompany.name
            const applyPaging = true
            this.axios
            .get(
                // `${configObject.apiBaseUrl}/Invoices?PageIndex=${this.currentPage}&PageSize=${this.pageSize}&Sort=${this.sortColumn}&StartDate=${this.fromDate}&EndDate=${this.toDate}&Status=${status}&ApplyPaging=${applyPaging}&Customer=${companyName}&InvoiceNumber=${this.invoiceNumber}`,  configObject.authConfig())
                `${configObject.apiBaseUrl}/Invoices?PageIndex=${this.currentPage}&PageSize=${this.pageSize}&Sort=${this.sortColumn}&StartDate=${this.fromDate}&EndDate=${this.toDate}&Status=${status}&ApplyPaging=${applyPaging}`, configObject.authConfig())
                .then(res => {
                    this.totalPages = Math.ceil(res.data.count / this.pageSize)
                    this.tableCount = res.data.count
                    this.unpaidCount = res.data.unpaidCount
                    this.draftCount = res.data.draftCount

                    res.data.data.forEach((cur, index) => {
                        cur.amountDue = this.convertThousand(cur.amountDue)
                        cur.status = cur.status == 0 ? 'Draft' : cur.status == 1 ? 'Sent' : cur.status == 2 ? 'Unsent' : cur.status == 3 ? 'OverDue' : cur.status == 4 ? 'Paid' : cur.status == 5 ? 'PartPaid' : 'Not available'
                        cur.invoiceDueDateFormatted = this.$moment(cur.invoiceDueDate).format('DD-MM-YYYY HH:mm:ss');
                        cur.index = index
                    })

                    this.$refs.dataGrid.ej2Instances.setProperties({
                        dataSource: res.data.data
                    });
                    this.refreshGrid();
                    this.showLoader = false
                })
                .catch(error => {
                    this.showLoader = false
                });
        },
        sendInvoice(id) {
            this.$modal.show('sendInvoice')
        },
        recordPayment(id) {
        },
        edit(id) {
        },
        deleteInvoice(id) {
            let resp = confirm("Are you sure want to delete this invoice?");
            if (resp) {
                $(".loader").show();
                this.axios
                .delete(
                    `${configObject.apiBaseUrl}/Invoice/${id}`,
                    configObject.authConfig()
                )
                .then((res) => {
                    this.$toast("Invoice Deleted Successfully", {
                        type: "success",
                        timeout: 3000,
                    });
                    $(".loader").hide();
                    this.$eventHub.$emit("refreshInvoicesList");
                })
                .catch((error) => {
                    $(".loader").hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000,
                    });
                });
            }
        },
        getCompanies() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company`, configObject.authConfig())
                .then(res => {
                    this.companies = res.data.data
                    localStorage.setItem('invoiceCustomers', JSON.stringify(res.data.data))
            })
            .catch(error => {

            });
        },
        selectCompany(company) {
            this.selectedCompany = company
            this.showDropdown = !this.showDropdown
            this.getInvoices()
        },
        changeStatus(status) {
            this.activeStatus = status
            if(status === 'draft') {
                this.status = 0
            }
             if(status === 'sent') {
                this.status = 1
            }
            if(status === 'all') {
                this.status = 'allStatus'
            }
        },
        
        toggleDropdown() {
          this.showDropdown = !this.showDropdown
        },
        toggleCompaniesDropdown(){
            this.showCompanies = !this.showCompanies
        },
        removeItem(i) {
            let items = [...this.invoiceItems]
            items.splice(i,1)
            this.invoiceItems = items

        },
        addItem() {
            this.invoiceItems.push({
                item: '',
                description: '',
                quantity: 1,
                price: 0,
                amount: '',
                tax: ''
            })
        },
        refreshGrid() {
            this.$refs.dataGrid.refresh();
        },
        toolbarClick(args) {
            switch (args.item.text) {
                case "PDF Export":
                let pdfExportProperties = {
                    pageOrientation: 'Landscape',
                    fileName: "branches.pdf"
                }
                    this.$refs.dataGrid.pdfExport(pdfExportProperties);
                break;
                case "Excel Export":
                    this.$refs.dataGrid.excelExport();
                break;
            }
        },
        convertThousand(request) {
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
}



</script>