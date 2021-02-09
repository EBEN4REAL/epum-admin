<template>
    <div>
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
                                        <div class="invoice-status bold-span overdue" :class="[invoiceDetails.status === 'OverDue' ? 'danger' : invoiceDetails.status === 'Paid' ? 'success' : 'danger']"
                                        >
                                            {{invoiceDetails.status}}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div>
                                        <span>Customer</span>
                                    </div>
                                    <div>
                                        <span class="bold-span">{{invoiceDetails.customerName}}</span>
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
                                        <span class="bold-span">₦</span><span class="bold-span">{{convertThousand(invoiceDetails.amountDue)}}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div>
                                        <span class="">Due</span>
                                    </div>
                                    <div>
                                        <span class="bold-span">{{timeSince(new Date(invoiceDetails.invoiceDueDate))}}</span>
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
                                    <div class="invoice_customer p-3" v-if="invoiceDetails.customerName">
                                        <div class="bold-span grey-text">Bill to</div>
                                        <div class="bold-span mt-1">{{invoiceDetails.customerName}}</div>
                                        <div class="bold-span mt-1">{{invoiceDetails.customerMail}}</div>
                                    </div>
                                    <!-- <div class="invoice_customer p-5" v-if="!invoiceDetails.customerName">
                                        You have not added a customer
                                    </div> -->
                                </div>
                                <div class="col-md-5 ">
                                    <div class="row align-items-center pt-3">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice number: </label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                {{invoiceDetails.invoiceNumber}}
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="row align-items-center mt-1">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Invoice date</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                               <small class="bold-span">{{$moment(invoiceDetails.invoiceDate).format('DD MMMM YYYY HH:mm:ss')}}</small> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Payment due: </label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="">
                                                <small class="bold-span">{{$moment(invoiceDetails.invoiceDueDate).format('DD MMMM YYYY HH:mm:ss')}}</small> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-md-5 text-right">
                                            <label class="primary-color">Amount Due:</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="bold-span">
                                                ₦ {{convertThousand(invoiceDetails.amountDue)}}
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
                            <div v-if="invoiceDetails.invoiceItems && invoiceDetails.invoiceItems.length">
                                <div class="mt-2" v-for="(prod,i) in invoiceDetails.invoiceItems" :key="i">
                                    <div class="preview-table  p-2 pl-3 pr-3 ">
                                        <div class="">
                                            <span class="primary-color">{{prod.itemDescription}}</span>
                                        </div>
                                        <div class="">
                                            <span class="primary-color">{{prod.itemQuantity}}</span>
                                        </div> 
                                        <div class="">
                                            <span class="">₦{{convertThousand(prod.itemPrice)}}</span>
                                        </div>
                                        <div class="text-right">
                                            <span class="">₦{{convertThousand(prod.itemPrice *  prod.itemQuantity)}}</span>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            <div class="mt-2 text-center font-italic p-3"  v-if="invoiceDetails.invoiceItems && !invoiceDetails.invoiceItems.length">
                               You have not added any items.
                            </div>
                            <div class="text-right mt-3  pr-3">
                                <span class="primary-color mr-3 ">Sub Total: </span>
                                <span class="primary-color ">&#8358; {{convertThousand(subTotalInvoiceItemsPrice)}}</span>
                            </div>
                            <div class="text-right mt-2 pr-3">
                                <span class="primary-color mr-3 ">Tax: </span>
                                <span class="primary-color">&#8358; {{convertThousand(taxAmount)}}</span>
                            </div>
                            <div class="text-right mt-2 pr-3">
                                <span class="primary-color mr-3 ">Total: </span>
                                <span class="primary-color">&#8358; {{convertThousand(subTotalInvoiceItemsPrice + taxAmount)}}</span>
                            </div>
                            <hr>
                             <div class="text-right mt-2 pr-3">
                                <span class="primary-color mr-3 bold-span">Amount Due (NGN): </span>
                                <span class="primary-color bold-span">&#8358; {{convertThousand(subTotalInvoiceItemsPrice + taxAmount)}}</span>
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

import Jquery from 'jquery';
let $ = Jquery;

export default {
    components: {
        MasterLayout,
        Datepicker,
        TableLoader,
    },
    provide: {
        grid: [Page, Sort, Toolbar, Search]
    },
    data() {
        return {
            invoiceItems: [ ],
            invoiceDetails: {},
            subTotalInvoiceItemsPrice: 0,
            taxAmount: 0,
        }
    },
    mounted() {
    },
    computed: {
    },
    created() {
        this.getInvoiceDetails()
    },
    methods: {
        getInvoiceDetails() {
            this.axios
                .get(
                    `${configObject.apiBaseUrl}/Invoices/${this.$route.query.id}`, configObject.authConfig())
                    .then(res => {
                        res.data.status = res.data.status == 0 ? 'Draft' : res.data.status == 1 ? 'Sent' : res.data.status == 2 ? 'Unsent' : res.data.status == 3 ? 'OverDue' : res.data.status == 4 ? 'Paid' : res.data.status == 5 ? 'PartPaid' : 'Not available'
                        this.invoiceDetails = res.data
                        this.subTotalInvoiceItemsPrice  = res.data.invoiceItems.reduce((total, cur) => {
                            return total + (cur.itemPrice * cur.itemQuantity) 
                        }, 0)

                        // this.taxAmount = res.data.invoiceItems.invoiceTaxes.reduce((amount, tax) => {
                        //     return amount += tax.taxPrice
                        // }, 0)
                    })
                    .catch(error => {
                        this.showLoader = false
                    });
        },
        convertThousand(request) {
            request = parseInt(request)
            if (!isFinite(request)) {
                return "0.00";
            }
            return request.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        timeSince(date) {

            let seconds = Math.floor((new Date() - date) / 1000);
            const value = seconds < 0 ? 'from now' : 'ago'
            seconds = Math.abs(seconds)

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " year " : " years ") + value;
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " month " : " months ") + value;
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " day " : " days ") + value;
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " hour " : " hours ") + value;
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + (Math.floor(interval) == 1 ? " minute " : " minutes ") + value;
            }
            return Math.floor(seconds) + (Math.floor(interval) == 1 ? " second " : " seconds ") + value;
        }
    },
}



</script>