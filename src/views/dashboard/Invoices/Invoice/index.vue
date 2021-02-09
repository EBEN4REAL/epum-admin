<template>
    <div>
        <AddTax />
        <MasterLayout>
            <div class="py-4" >
                <div class="dialog-container" style="width: 90%">
                    <div class="row">
                        <div class="col-md-7">
                            <h4 class="primary-color">New Invoice</h4>
                        </div>
                        <div class="col-md-5 text-right">
                            <button class="rounded-button transparent mr-3" @click="togglePageStatus">{{pageStatus === 'edit' ? 'Preview' : 'Edit'}}</button>
                            <button class="rounded-button colored text-white">Save and contiue</button>
                        </div>
                        <div class="dropdown-slide mt-3" v-b-toggle.collapse-2 @click="showSummary"  v-if="pageStatus === 'edit' ">
                            <div class="row align-items-center ">
                                <div class="col-md-9">
                                    <span class="primary-color bold-span">Invoice title and summary</span>
                                </div>
                                <div class="col-md-3 text-right">
                                    <i class="fa fa-chevron-down primary color" aria-hidden="true" v-if="!summary"></i>
                                    <i class="fa fa-chevron-up primary color" aria-hidden="true" v-if="summary"></i>
                                </div>
                              
                            </div>
                       </div>
                        <b-collapse id="collapse-2" class="" style="width: 100%">
                             <div class="dropdown-summary" v-if="pageStatus === 'edit' ">
                                <div class="row align-items-center ">
                                    <div class="col-md-7 ">
                                        <img src="@/assets/img/fuelmetrics-png-transparent.png" width="350  " class="pl-3" />
                                    </div>
                                    <div class="col-md-5 text-right py-5">
                                        <div class="row align-items-enter">
                                            <div class="col-md-11">
                                                <div class="summary-title">
                                                <input type="text"  class="form-control" v-model="invoiceTitle" placeholder="Invoice Title" />
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="row align-items-center mt-2">
                                            <div class="col-md-11">
                                                <div class="">
                                                <input type="text"  class="form-control" v-model="invoiceSummary"  placeholder="Summary(e.g prject name, description of invoice)" />
                                                </div>
                                                <div class="e-heading--subtitle text-right mt-3">
                                                    <h5 class="bold-span">Fuelmetrics</h5>
                                                </div>
                                                <div class="e-heading--para mt-2  text-right">
                                                    <p class="bold-span">Nigeria</p>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                        </div>
                        </b-collapse>
                       
                        <div class="invoice-container mt-3"  v-if="pageStatus === 'edit'">
                            <div class="add_customer_conainer">
                                <div class="invoice_customer p-3" v-if="view ==='customer'">
                                    <div class="bold-span grey-text">Bill to</div>
                                    <div class="bold-span mt-1">{{selectedCompany.name}}</div>
                                    <div class="bold-span mt-1">{{selectedCompany.email}}</div>
                                    <div class="bold-span primary-color mt-1 cursor-pointer" @click="changeView('showCompanies')">choose a different customer</div>
                                </div>
                                <div class="add_customer" v-show="view === 'showCompanies' || view === 'selectCompany'">
                                    <div class="row align-items-center  ml-3" v-if="view === 'showCompanies'">
                                        <div class="col-md-9">
                                            <div class="dropdown__content" style="width: 91.1%;left: 2px;top: 27pxx;top: 17px;border-radius: 15px;height: 175px;">
                                                <div class="dropdown-select-wrapper m-2">
                                                    <div class="row align-items-center">
                                                        <div class="col-md-1 text-right padding-right-none">
                                                            <i class="fa fa-search ml-2"  aria-hidden="true"></i>
                                                        </div>
                                                        <div class="col-md-11">
                                                            <input type="search" autofocus  class="form-control dropdown-search" placeholder="Type a customer name"  v-model="companySearch"   />
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="dropdown-menu-list">
                                                    <li class="dropdown-list cursor-po" v-for="(cp,i) in filteredCompanies" :key='i' @click="selectCompany(cp)">{{cp.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="add_custoemr_card mt-3 ml-3" @click="changeView('showCompanies')" v-if="selectCompany">
                                        <span>
                                            <i class="fa fa-building-o mr-2 primary-color" aria-hidden="true"></i> <span class="primary-color" >Select company</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="invoice_details pr-3 pt-3">
                                    <div class="row align-items-center ">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice number</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                               <input type="number"  class="form-control" v-model="invoiceNumber" @blur="checkInvoiceNumber" placeholder="Invoice number"  />
                                              
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">P.O/S.O number</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <input type="text"  class="form-control" v-model="poNumber"  />
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice date</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <vue-ctk-date-time-picker
                                                    id="DateTimePicker"
                                                    v-model="invoiceDate"
                                                    color="#370F70"
                                                    format="YYYY-MM-DD"
                                                    formatted="DD/MM/YYYY"
                                                    position="bottom"
                                                    :onlyDate="true"
                                                    :autoClose="true"
                                                    :label="invoiceDateLabel"
                                                    
                                                />  
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Payment due</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <vue-ctk-date-time-picker
                                                    id="DateTimePicker"
                                                    v-model="paymentDueDate"
                                                    color="#370F70"
                                                    format="YYYY-MM-DD"
                                                    formatted="DD/MM/YYYY"
                                                    position="bottom"
                                                    :onlyDate="true"
                                                    :autoClose="true"
                                                    :label="paymentDue"
                                                />  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-header mt-5">
                                <button class="invoice-edit-button"><i class="fa fa-pencil mr-1 primary-color" aria-hidden="true"></i> Edit Columns</button>
                                <div class="invoice_items">
                                    <span class="primary-color">Items</span>
                                </div>
                                <div class="quantity">
                                    <span class="primary-color">Quantity</span>
                                </div> 
                                <div class="price">
                                    <span class="primary-color">Price</span>
                                </div>
                                <div class="amount">
                                    <span class="primary-color">Amount</span>
                                </div>
                            </div>
                            <div class="invoice__details" v-for="(invoice, invoiceIndex) in invoiceItems" :key="invoiceIndex">
                                <div class="table-list-input" >
                                    <div class="invoice_items pr-2">
                                        <div class="row textareaSection">
                                            <div class="col-md-4 padding-right-none">
                                                <input type="text"  class="form-control ":disabled="invoice.status === 'auto'"  v-model="invoice.item" placeholder="Item name" @focus="focusElement(invoiceIndex)" />
                                            </div>
                                            <div class="col-md-8">
                                                <textarea @keyup="processTextarea($event, invoiceIndex)"  class=""  v-model="invoice.description" placeholder="Enter item description" id="descTxa"  /></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="quantity pr-2">
                                        <input type="number"  class="form-control" v-model="invoice.quantity" @focus="focusElement(invoiceIndex)"    />
                                    </div> 
                                    <div class="price pr-2">
                                        <input type="text" class="form-control" name="currency-field" id="currency" pattern="^\₦\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="" placeholder="price" v-model="invoice.price" @focus="focusElement(invoiceIndex)" >
                                    </div>
                                    <div class="amount">
                                        <span class="primary-color mr-2">&#8358;  {{invoice.quantity * invoice.price}}.00</span>
                                        <span @click="removeItem(invoiceIndex)">
                                            <i class="fa fa-trash table-icon" aria-hidden="true" style="color: red" ></i>
                                        </span>
                                    </div>
                                    </div>
                                    <div class="p-3 tax-row">
                                        <div class="row align-items-center">
                                            <div class="col-md-5">
                                                <span class="primary-color bold-span">Edit income account</span>
                                            </div>
                                            <div class="col-md-7">
                                                <div class="row align-items-center mb-2"  v-for="(tax,taxIndex) in invoice.invoiceTaxes" :key="taxIndex">
                                                    <div class="col-md-1 text-right">
                                                        <span class="primary-color mr-2 bold-span">Tax</span>
                                                    </div>
                                                    <div class="col-md-11">
                                                        <div class="row" >
                                                            <div class="col-md-8">
                                                                <div class="row align-items-center">
                                                                    <div class="col-md-10">
                                                                        <model-select :options="options" v-model="tax.selectedTax"  placeholder="select tax" @click="focusElement(invoiceIndex)"   />
                                                                    </div>
                                                                    <div class="col-md-2">
                                                                        <i class="fa fa-plus primary-color cursor-pointer" title="Add Tax" aria-hidden="true" @click="createTax(invoiceIndex,taxIndex)" v-if="taxIndex === (invoice.taxesArr.length) - 1"></i>
                                                                    </div>
                                                                </div>
                                                               
                                                            </div>
                                                            <div class="col-md-4 text-right primary-color">
                                                                <i class="fa fa-minus primary-color" aria-hidden="true" v-if="tax.selectedTax === 'select item'"></i>
                                                                <span class="primary-color bold-span mr-2"  v-if="tax.selectedTax !== 'select item'">₦ {{tax.taxes.filter(el => el.value == tax.selectedTax).length > 0 ? tax.taxes.filter(el => el.value == tax.selectedTax)[0].taxPrice : 0}}.00</span>
                                                                <span @click="removeTax(invoiceIndex,taxIndex)"  v-if="invoice.taxesArr.length > 1">
                                                                    <i class="fa fa-trash table-icon" aria-hidden="true" style="color: red" ></i>
                                                                </span> 
                                                            </div>
                                                        </div>
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-3 cursor-pointer position-relative">
                                    <div @click="toggleDropdown" v-if="!showDropdown">
                                        <i class="fa fa-plus-circle mr-2 primary-color" aria-hidden="true"></i>
                                        <span class="primary-color bold-span"  >Add an item</span>
                                    </div>
                                   
                                    <div class="dropdown__content" style="top: -13px;" :class="[showDropdown ? 'show_dropdown' : 'hide_dropdown']">
                                       <div class="dropdown-select-wrapper m-3 product-sec">
                                            <div class="row align-items-center">
                                                <div class="col-md-1 text-right padding-right-none">
                                                    <i class="fa fa-search ml-2"  aria-hidden="true"></i>
                                                </div>
                                                <div class="col-md-11">
                                                    <input type="text"   class="form-control dropdown-search" placeholder="Type a product"  style="width: 100%; box-shadow: none !important" v-model="productSearch"  />
                                                   
                                                </div>
                                            </div>
                                       </div>
                                      <ul class="">
                                            <li class="dropdown-list " v-for="(prod,i) in filteredProducts" :key="i" @click="selectItem(prod)">
                                                <div class="product-list">
                                                    <div>
                                                        <span class="primary-color">{{prod.item}}</span>
                                                    </div>
                                                    <div>
                                                        ₦ {{prod.price}}.00
                                                    </div>
                                                </div>
                                            </li>
                                       </ul>
                                       <div class="p-3 create-item-container">
                                            <div class="">
                                                <i class="fa fa-plus-circle mr-2 primary-color" aria-hidden="true"></i>
                                                <span class="primary-color bold-span"  @click="addItem">Create a new item</span>
                                            </div>
                                            <div>
                                                <span class="bold-span primary-color" @click="toggleDropdown">Cancel</span>
                                            </div>
                                            
                                       </div>
                                   </div>
                                </div>
                                <div class="text-right mt-3 cursor-pointer pr-3">
                                    <span class="primary-color mr-3 bold-span">Sub Total: </span>
                                    <span class="primary-color bold-span">&#8358;  {{subTotal}}.00</span>
                                </div>
                                <div class="text-right mt-3 cursor-pointer pr-3">
                                    <span class="primary-color mr-3 bold-span">Total: </span>
                                    <span class="primary-color bold-span">&#8358;  {{totalAmount}}.00</span>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-slide mt-3" v-b-toggle.collapse-1  v-if="pageStatus === 'edit' "  @click="showFooter">
                            <div class="row ">
                                <div class="col-md-9">
                                    <span class="primary-color bold-span">Footer</span>
                                </div>
                                <div class="col-md-3 text-right">
                                    <i class="fa fa-chevron-down primary color" aria-hidden="true" v-if="!footer"></i>
                                    <i class="fa fa-chevron-up primary color" aria-hidden="true" v-if="footer"></i>
                                </div>
                              
                            </div>
                        </div>
                        <b-collapse id="collapse-1" class="invoice-footer"  v-if="pageStatus === 'edit'">
                            <b-card style="width: 98.5%">
                                <input type='text' class="form-control" placeholder="Enter a footer for this invoice (e.g tax information, thank you note)" style="box-shadow: none !important" v-model="invoiceFooter" />
                            </b-card>
                        </b-collapse>
                        <div class="preview-container mt-3 position-relative"  v-if="pageStatus === 'preview'" >
                            <div class="row  ivoice-preview-header-wrapper pb-4 align-items-center">
                                <div class="col-md-4">
                                    <img src="@/assets/img/fuelmetrics-png-transparent.png" width="150"  />
                                </div>
                                <div class="col-md-8 text-right">
                                    <div class="e-heading--title pt-3 pr-3">
                                       {{invoiceTitle}}
                                    </div>
                                    <div class="e-heading--subtitle pr-3">
                                        <h5 class="bold-span">{{invoiceSummary}}</h5>
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
                            <div class="text-center  invoice_footer" style="position: absolute; bottom: 15px; left: 45%">
                                {{invoiceFooter}}
                            </div>
                        </div>  
                    </div>
                </div>
            <div>
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
import { ModelSelect } from 'vue-search-select'



import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout,
        Datepicker,
        TableLoader,
        AddTax,
        ModelSelect,
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            invoiceTitle: "Invoice Title",
            invoiceSummary: "",
            invoiceDateLabel: 'Invoice date',
            paymentDue: 'Payment due',
            showDropdown: false,
            showTaxes: false,
            invoiceFooter: '',
            selectedTax: {
                name: 'Tax 1',
                value: 'tax1'
            },
            summary: false,
            options: [
                { value: '1', text: 'aa' + ' - ' + '1' },
                { value: '2', text: 'ab' + ' - ' + '2' },
                { value: '3', text: 'bc' + ' - ' + '3' },
            ],
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
            invoiceNumber: "",
            poNumber: 1,
            companies: [],
            selectedCompany: {},
            showCompanies: false,
            companyId:"select company",
            invoiceTaxes:[
                {
                    dateCreated: "2021-02-08T22:13:50.0612797",
                    description: "desc",
                    id: "16f10266-ee3e-4379-ce25-08d8cc766ee2",
                    rate: 7,
                    taxAbbrevation: "TAX",
                    taxName: "Taaax 1",
                    taxNumber: "1234567"
                }
            ],
            taxes: [
                {
                    name: 'VAT 1',
                    percentage: '7.5%',
                    value: 'vat',
                    taxAmount: '20,000.00',
                    taxPrice: 500,
                },
                {
                    name: 'VAT 2',
                    percentage: '5%',
                    value: 'vat',
                    taxAmount: '20,000.00',
                    taxPrice: 500,
                },
                {
                    name: 'VAT 3',
                    percentage: '15%',
                    value: 'vat',
                    taxAmount: '20,000.00',
                    taxPrice: 500,
                },
            ],
            products: [
                {
                    item: 'Epump Go',
                    description: '',
                    quantity: 1,
                    price: 100000,
                    amount: 0,
                    status:'auto',
                    taxesArr: [
                        {
                            selectedTax: '',
                            // taxes: [
                            //     { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
                            //     { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
                            //     { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
                            // ]
                        },
                    ],
                },
                {
                    item: 'ATG',
                    description: '',
                    quantity: 1,
                    price: 500000,
                    amount: 0,
                    status:'auto',
                    taxesArr: [
                        {
                            selectedTax: '',
                            // taxes: [
                            //     { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
                            //     { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
                            //     { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
                            // ]
                        },
                    ],
                },
                {
                    item: 'Deployment',
                    description: '',
                    quantity: 1,
                    price: 500000,
                    amount: 0,
                    status:'auto',
                    taxesArr: [
                        {
                            selectedTax: '',
                            // taxes: [
                            //     { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
                            //     { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
                            //     { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
                            // ]
                        },
                    ],
                }
            ],
            invoiceProducts: [],
          
            invoiceItems: [ ],
            invoiceIndex: 0,
            dropdownIndex: 0,
            lastTaxIndex: null,
            item: {
                value: '',
                text: ''
            },
            footer: false,
            productSearch: '',
            // options: [
            //     { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
            //     { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
            //     { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
            // ]
        }
    },
    mounted() {
        this.getProducts()
        this.getTaxes()
        if(localStorage.getItem('invoiceCustomers')) {
            this.companies = JSON.parse(localStorage.getItem('invoiceCustomers'))
        }else {
            this.getCompanies()
        }   
        Array.from(document.getElementsByTagName('input')).forEach(input => {
            if(!Array.from(input.classList).includes('form-control')) {
                input.classList.add('form-control')
            }
        })
        document.querySelector('#collapse-1').classList.remove('mt-2')
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => product.item.toLowerCase().includes(this.productSearch.toLowerCase()))
        },
        filteredCompanies() {
            return this.companies.filter(company => company.name.toLowerCase().includes(this.companySearch.toLowerCase()))
        },
        totalAmount() {
            return this.invoiceItems.reduce((acc,cur) => {
                let taxList = []
                let tax = cur.taxesArr.forEach((_tx, i) => {
                    const item = this.options.filter(el => el.value === _tx.selectedTax)
                    if(item.length > 0) {
                        taxList.push(item[0])
                    }
                })
                const taxesAmount = taxList.reduce((amount, tax) => {
                    return amount += tax.taxPrice
                },0)
                return acc += ((cur.quantity * cur.price))  + taxesAmount
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
        async checkInvoiceNumber(e) {
            this.axios.get(`${configObject.apiBaseUrl}/Invoices/invoicenumbercheck?invoiceNumber=${e.target.value}`, configObject.authConfig())
                .then(res => {
                    if(res.data) {
                        this.$toast("This Invoice number has been used", {
                            type: "error", 
                            timeout: 3000
                        });
                        return;
                    }
                })
                .catch(error => {
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000,
                    });
                });
        },
        async getProducts() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Invoices/products`, configObject.authConfig())
                .then(res => {
                    this.invoiceProducts = res.data
                    console.log(res.data)
            })
            .catch(error => {

            });
        },
        async getTaxes() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Invoices/taxes`, configObject.authConfig())
                .then(res => {
                    this.invoiceTaxes = res.data
                    //  {
                    //     dateCreated: "2021-02-08T22:13:50.0612797",
                    //     description: "desc",
                    //     id: "16f10266-ee3e-4379-ce25-08d8cc766ee2",
                    //     rate: 7,
                    //     taxAbbrevation: "TAX",
                    //     taxName: "Taaax 1",
                    //     taxNumber: "1234567"
                    // }

                    // taxes: [
                    //     { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
                    //     { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
                    //     { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
                    // ]
                    res.data.map(tax => {
                        return {
                            text: tax.taxName,
                            value: `${taxAbbrevation} (${tax.rate})%`,
                            taxPrice: 0,
                        }
                    })
                    console.log(res.data)
            })
            .catch(error => {

            });
        },
        focusElement(elementIndex) {
            Array.from(document.querySelectorAll('.invoice__details')).forEach((el,i) => {
                if(elementIndex === i) {
                    el.classList.add('inv-bg')
                }else {
                    el.classList.remove('inv-bg')
                }
            })
        },
        processTextarea($event, elementIndex) {
            this.focusElement(elementIndex)
            $event.target.style.height = 'calc(1.5em + 0.75rem + 1px)';
            $event.target.style.height =  $event.target.scrollHeight + 3 + 'px';
        },
        showSummary() {
            this.summary = !this.summary
        },
        showFooter() {
            this.footer = !this.footer
        },
        togglePageStatus() {
            this.pageStatus === 'edit' ?  this.pageStatus = 'preview' : this.pageStatus = 'edit'
        },
        addTax() {
            this.$modal.show('addTax')
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
            this.productSearch = ''
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
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
        toggleCompaniesDropdown(){
            this.showCompanies = !this.showCompanies
        },
        removeTax(invoiceIndex, taxIndex) {
            let invoices = [...this.invoiceItems]
            const invoice  = invoices.find((invoice,i) => invoiceIndex === i)
            if(invoice.taxesArr.length > 1) {
                invoice.taxesArr.splice(taxIndex, 1)
            }
        },
        removeItem(i) {
            let items = [...this.invoiceItems]
            items.splice(i,1)
            this.invoiceItems = items

        },
        createTax(invoiceIndex, TaxIndex) {
            const invoices = [...this.invoiceItems]
            let invoice = invoices.forEach((invoice,i) => {
                if(i === invoiceIndex) {
                    invoice.taxesArr.push({
                        selectedTax: '',
                        taxes: [
                            { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
                            { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
                            { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
                        ]
                    })
                }
            })
        },
        addItem() {
            this.invoiceItems.push({
                item: '',
                description: '',
                quantity: 1,
                price: 0,
                amount: '',
                status:'manual',
                taxesArr: [
                    {
                        selectedTax: '',
                        taxes: [
                            { value: 'vat', text: 'VAT (5%)',  taxAmount: '0.00', taxPrice: 500, },
                            { value: 'vat1', text: 'VAT (7.5%)',taxAmount: '0.00', taxPrice: 1000, },
                            { value: 'vat2', text: 'VAT (10.5%)' ,taxAmount: '0.00', taxPrice: 1500,},
                        ]
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