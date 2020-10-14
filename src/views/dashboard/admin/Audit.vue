<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
             <div class="row">
                <div class="col-md-4 remove-right-padding">
                    <div class="header-three-text">Product Tank sales</div>
                    <div class="small_card product_details_card mt-3">
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">

                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volmne  Sold</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volume Refilled</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" epump-color">PMS</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" epump-color">AGO</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card_pump">
                            <div class="product_sales_flex_card_item_first">
                                <div class="epump-color">DPK</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 ">
                    <div class="header-three-text">Product Pump sales</div>
                    <div class="small_card product_details_card mt-3">
                        <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">

                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Volume </div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Amount</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">Price</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">RTT</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">RTT AMount</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class="">PMS</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                        </div>
                        <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" ">AGO</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                        </div>
                       <div class="product_sales_flex_card">
                            <div class="product_sales_flex_card_item_first">
                                <div class=" ">DPK</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">0.00 Ltrs</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                            <div class="product_sales_flex_card_item">
                                <div class="text-black ">&#8358; 0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </masterLayout>
</template>
<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'
import configObject from "@/config";

export default {
    components: {
        masterLayout
    },
    data() {
        return {
            companiesCount: 0,
            stationsCount: 0
        }
    },
    mounted() {
        // this.getCompanies()
        // this.getStations()
    },
    methods: {
        getCompanies() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Company`, configObject.authConfig)
                .then(res => {
                    this.companiesCount = res.data.data.length
                })
                .catch(error => {

                });
        },
        getStations() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Branch/GetStations`, configObject.authConfig)
                .then(res => {
                    this.stationsCount = res.data.length
                })
                .catch(error => {

                });
        },
    }
}
</script>