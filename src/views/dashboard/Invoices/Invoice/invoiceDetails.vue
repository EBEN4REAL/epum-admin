<template>
    <div>
        <AddTax />
        <MasterLayout>
            <div class="py-4" >
                <div class="dialog-container" style="width: 80%">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row align-items-center">
                                <div class="col-md-3">
                                    <div>
                                        <span>Status</span>
                                    </div>
                                    <div>
                                        <div class="invoice-status danger bold-span overdue" >
                                            Overdue
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div>
                                        <span>Customer</span>
                                    </div>
                                    <div>
                                        <span class="bold-span">Ebenezer Oluwasegun</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 text-right">
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <div>
                                        <span>Amount due</span>
                                    </div>
                                    <div>
                                        <span class="bold-span">₦</span><span class="bold-span">1,641.22</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div>
                                        <span class="">Due</span>
                                    </div>
                                    <div>
                                        <span class="bold-span">3 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-container mt-3"  >
                            <div class="row  ivoice-preview-header-wrapper pb-4">
                                <div class="col-md-12 text-right">
                                    <div class="e-heading--title pt-3 pr-3">
                                       INVOICE
                                    </div>
                                    <div class="e-heading--subtitle  pr-3">
                                       Fuelmetrics
                                    </div>
                                    <div class="e-heading--para pt-2  pr-3">
                                       Nigeria
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-space-between">
                                <div class="col-md-7">
                                    <div class="invoice_customer p-3" v-if="selectedCompany.name">
                                        <div class="bold-span grey-text">Bill to</div>
                                        <div class="bold-span mt-1">{{selectedCompany.name}}</div>
                                        <div class="bold-span mt-1">{{selectedCompany.email}}</div>
                                    </div>
                                    <div class="invoice_customer p-5" v-if="!selectedCompany.name">
                                        You have not added a customer
                                    </div>
                                </div>
                                <div class="col-md-5 ">
                                    <div class="row align-items-center pt-3">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice number: </label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                {{invoiceNumber}}
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="row align-items-center mt-1">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice date</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                               <small class="bold-span">{{invoiceDate}}</small> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Payment due: </label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <small class="bold-span">{{paymentDueDate}}</small> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Amount Due:</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="bold-span">
                                                ₦ {{totalAmount}}.00
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="preview-table  header  p-2 mt-2 pl-3 pr-3 ">
                                <div class="invoice_items">
                                    <span class="text-white">Items</span>
                                </div>
                                <div class="quantity">
                                    <span class="text-white">Quantity</span>
                                </div> 
                                <div class="price">
                                    <span class="text-white">Price</span>
                                </div>
                                <div class="amount text-right">
                                    <span class="text-white">Amount</span>
                                </div>
                            </div>
                            <div class="mt-2" v-for="(prod,i) in invoiceItems" :key="i" v-if="invoiceItems.length > 0">
                                <div class="preview-table  p-2 pl-3 pr-3 ">
                                    <div class="">
                                        <span class="primary-color">{{prod.item}}</span>
                                    </div>
                                    <div class="">
                                        <span class="primary-color">{{prod.quantity}}</span>
                                    </div> 
                                    <div class="">
                                        <span class="">₦</span>{{prod.price}}.00</span>
                                    </div>
                                    <div class="text-right">
                                        <span class="">₦</span>{{prod.price *  prod.quantity}}.00</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 text-center font-italic p-3"  v-if="invoiceItems.length ===  0">
                               You have not added any items.
                            </div>
                            <div class="text-right mt-3  pr-3">
                                <span class="primary-color mr-3 ">Sub Total: </span>
                                <span class="primary-color ">&#8358; {{subTotal}}.00</span>
                            </div>
                            <div class="text-right mt-2 pr-3">
                                <span class="primary-color mr-3 ">Total: </span>
                                <span class="primary-color">&#8358; {{totalAmount}}.00</span>
                            </div>
                            <hr></hr>
                             <div class="text-right mt-2 pr-3">
                                <span class="primary-color mr-3 bold-span">Amount Due (NGN): </span>
                                <span class="primary-color bold-span">&#8358; {{totalAmount}}.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            <div>
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
import AddTax from "@/components/modals/Products/addTax"



import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout,
        Datepicker,
        TableLoader,
        AddTax
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            invoiceDateLabel: 'Invoice date',
            paymentDue: 'Payment due',
            showDropdown: false,
            showTaxes: false,
            selectedTax: {
                name: 'Tax 1',
                value: 'tax1'
            },
            pageStatus: 'edit',
            companySearch: "",
            rate: 1,
            view: 'selectCompany',
            isButtonDisabled: false,
            scheduleDateTime: null,
            showLoader: false,
            invoiceDate: this.invouceStartDate,
            paymentDueDate: this.paymentDueStartDate,
            paymentDueStartDate: this.$moment().format("MMMM D, YYYY"),
            invouceStartDate: this.$moment().format("MMMM D, YYYY"),
            pluginStartDate: this.$moment().format("D-M-YYYY"),
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: [],
                search: { operator: "contains", ignoreCase: true },
            },
            invoiceNumber: 1,
            poNumber: 1,
            companies: [],
            selectedCompany: {},
            showCompanies: false,
            companyId:"select company",
            products: [
                {
                    item: "Epump Go",
                    priceFormatted: '100,000.00',
                    priceAmount: 100000,
                    description: "A device which connects pumps & tanks in your station  to our web platform",
                    quantity: 1,
                    price: 100000,
                    amount: 0,
                    taxes: [
                        {
                            name: 'VAT',
                            percentage: '7.5%',
                            value: 'vat',
                            taxAmount: '20,000.00',
                            taxPrice: 500,
                        },
                    ],
                }
            ],
            invoiceItems: [ ],
            invoiceIndex: 0,
            dropdownIndex: 0,
        }
    },
    mounted() {
        this.getCompanies()
        Array.from(document.getElementsByTagName('input')).forEach(input => {
            if(!Array.from(input.classList).includes('form-control')) {
                input.classList.add('form-control')
            }
        })
     
    },
    computed: {
        filteredCompanies() {
            return this.companies.filter(company => company.name.toLowerCase().includes(this.companySearch.toLowerCase()))
        },
        totalAmount() {
            return this.invoiceItems.reduce((acc,cur) => {
                const taxesAmount = cur.taxes.reduce((amount, tax) => {
                    return amount += tax.taxPrice
                },0)
                return acc += ((cur.quantity * cur.price)) + taxesAmount
            }, 0)
        },
        subTotal() {
            return this.invoiceItems.reduce((acc,cur) => {
                return acc += ((cur.quantity * cur.price)) 
            }, 0)
        }
    },
    created() {

    },
    watch: {
        rate(val) {
            this.invoiceItems.forEach(el => {
                el.quantity = val
            })
        },
        invoiceDate: function (newDate) {
            if (newDate) {
                this.invouceStartDate = this.$moment(newDate, "DD-MM-YYYY").format("MMMM D, YYYY")
            }
        },
        paymentDueDate: function (newDate) {
            if (newDate) {
                this.paymentDueStartDate = this.$moment(newDate, "DD-MM-YYYY").format("MMMM D, YYYY")
            }
        },
    },
    methods: {
        togglePageStatus() {
            this.pageStatus === 'edit' ?  this.pageStatus = 'preview' : this.pageStatus = 'edit'
        },
        addTax() {
            this.$modal.show('addTax')
        },
        showDropdownSearch(e, invoiceIndex) {
            e.stopPropagation();
            this.invoiceIndex = invoiceIndex
            Array.from(document.querySelectorAll('.dropdown__child')).forEach((dropdown,i)  => {
                this.dropdownIndex = i
                if(this.invoiceIndex === this.dropdownIndex) {
                    if(dropdown.classList.contains('show_dropdown')) {
                        dropdown.classList.remove('show_dropdown')
                        dropdown.classList.add('hide_dropdown')
                    }else {
                        dropdown.classList.add('show_dropdown')
                        dropdown.classList.remove('hide_dropdown')
                    }
                }else {
                    dropdown.classList.remove('show_dropdown')
                    dropdown.classList.add('hide_dropdown')
                }
            })
        },  
        hideDropDown(e) {
            const classes = Array.from(e.target.classList)
            if (classes.includes('dropdown__content') || classes.includes('add_custoemr_card')) {
                return
            } else {
                this.view = 'selectCompany'
                this.selectCompany = true
            }
        },
        changeView(view) {
            this.view = view
        },
        selectCompany(company) {
            this.selectedCompany = company
            this.view = 'customer'
        },
        selectItem(product) {
            product.quantity = this.rate
            this.invoiceItems.push(product)
            this.showDropdown = !this.showDropdown
        },
        toggleTaxes() {
            this.showTaxes = !this.showTaxes
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        },
        getCompanies() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company`, configObject.authConfig())
                .then(res => {
                    console.log(res.data.data)
                    this.companies = res.data.data
            })
            .catch(error => {

            });
        },
        toggleCompaniesDropdown(){
            this.showCompanies = !this.showCompanies
        },
        removeTax(invoiceIndex, taxIndex) {
            alert()
            let invoices = [...this.invoiceItems]
            const invoice  = invoices.find((invoice,i) => invoiceIndex === i)
            if(invoice.taxes.length > 1) {
                invoice.taxes.splice(taxIndex, 1)
            }
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
                taxes: [
                    {
                        name: '',
                        percentage: '',
                        value: '',
                        taxAmount: '0.00',
                        taxPrice: 0,
                    },
                ],

                
            })
            this.showDropdown = !this.showDropdown
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
    },
}



</script>