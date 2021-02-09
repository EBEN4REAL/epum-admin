<template>
    <div>
        <AddTax />
        <MasterLayout>
            <div class="py-4" >
                <div class="dialog-container" style="width: 80%">
                    <div class="row">
                        <div class="col-md-7">
                            <h4 class="primary-color">New Invoice</h4>
                        </div>
                        <div class="col-md-5 text-right">
                            <button class="rounded-button transparent mr-3" @click="togglePageStatus">{{pageStatus === 'edit' ? 'Preview' : 'Edit'}}</button>
                            <button class="rounded-button colored text-white">Save and contiue</button>
                        </div>
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
                                               <input type="text"  class="form-control" v-model="invoiceNumber"  />
                                              
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
                                    <div class="row align-items-center mt-2">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Rate</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <input type="text"  class="form-control" v-model="rate"  />
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
                                        <div class="row">
                                            <div class="col-md-4 padding-right-none">
                                                <input type="text"  class="form-control"  v-model="invoice.item" placeholder="Item name" />
                                            </div>
                                            <div class="col-md-8">
                                                <textarea  class="form-control" v-model="invoice.description" placeholder="Enter item description"  /></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="quantity pr-2">
                                        <input type="number"  class="form-control" v-model="invoice.quantity"   />
                                    </div> 
                                    <div class="price pr-2">
                                        <input type="text" class="form-control" name="currency-field" id="currency" pattern="^\₦\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="" placeholder="price" v-model="invoice.price">
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
                                                <div class="row align-items-center mb-2"  v-for="(tax,taxIndex) in invoice.taxes" :key="taxIndex">
                                                    <div class="col-md-2 text-right">
                                                        <span class="primary-color mr-2 bold-span">Tax</span>
                                                    </div>
                                                    <div class="col-md-10">
                                                        <div class="row" >
                                                            <div class="col-md-8">
                                                                <div @click="showDropdownSearch($event, invoiceIndex)" class="dropdown-select-container cursor-pointer dropdown-parent"  style="width:86%">
                                                                    <div class="row align-items-center  height-100 pl-3 pr-3">
                                                                        <div class="col-md-10">
                                                                            <span class="dropdown-value">{{tax.name}} {{tax.percentage}}</span>
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="dropdown__content dropdown__child hide_dropdown"  style="width: 77.5%">
                                                                    <div class="dropdown-select-wrapper m-3">
                                                                        <div class="row align-items-center">
                                                                            <div class="col-md-1 text-right padding-right-none">
                                                                                <i class="fa fa-search ml-2"  aria-hidden="true"></i>
                                                                            </div>
                                                                            <div class="col-md-10">
                                                                                <input type="text" autofocus  class="form-control dropdown-search" placeholder="Search" style="width:80%"    />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul class="dropdown-menu-list pb-3">
                                                                        <li class="dropdown-list tax " v-for="(tax,i) in invoice.taxes" :key="i">{{tax.name}} {{tax.percentage}}</li>
                                                                         <div class="text-center p-3 cursor-pointer"  @click="addTax">
                                                                                <i class="fa fa-plus-circle mr-2 primary-color" aria-hidden="true"></i>
                                                                                <span class="primary-color bold-span"  >Create new tax</span>
                                                                        </div>
                                                                    </ul>
                                                                   
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 text-right primary-color">
                                                                <i class="fa fa-minus primary-color" aria-hidden="true" v-if="!tax.name"></i>
                                                                <span class="primary-color bold-span mr-2"  v-if="tax.name">₦ {{tax.taxPrice}}.00</span>
                                                                <span @click="removeTax(invoiceIndex,taxIndex)"  v-if="tax.name">
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
                                       <div class="dropdown-select-wrapper m-3">
                                            <div class="row align-items-center">
                                                <div class="col-md-1 text-right padding-right-none">
                                                    <i class="fa fa-search ml-2"  aria-hidden="true"></i>
                                                </div>
                                                <div class="col-md-11">
                                                    <input type="text" autofocus  class="form-control dropdown-search" placeholder="Type a product"  style="width: 100%"   />
                                                </div>
                                            </div>
                                       </div>
                                      <ul class="">
                                            <li class="dropdown-list " v-for="(prod,i) in products" :key="i" @click="selectItem(prod)">
                                                <div class="product-list">
                                                    <div>
                                                        <span class="primary-color">{{prod.item}}</span>
                                                    </div>
                                                    <div>
                                                        ₦ {{prod.priceFormatted}}
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
                        <div class="preview-container mt-3"  v-if="pageStatus === 'preview'">
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
     
     
        // Jquery Dependency

        $("input[data-type='currency']").on({
            keyup: function() {
            formatCurrency($(this));
            },
            blur: function() { 
            formatCurrency($(this), "blur");
            }
        });


        function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }


        function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.
        
        // get input value
        var input_val = input.val();
        
        // don't validate empty input
        if (input_val === "") { return; }
        
        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");
            
        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);
            
            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
            right_side += "00";
            }
            
            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = "₦" + left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = "₦" + input_val;
            
            // final formatting
            if (blur === "blur") {
            input_val += ".00";
            }
        }
        
        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
        }


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