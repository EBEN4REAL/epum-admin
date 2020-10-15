<template>
    <masterLayout>
         <section class=" mt-3 full__row_section">
            <div class="banner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="dashboard__card large_card"  :style="[
                                    {
                                    backgroundImage: `linear-gradient(rgb(37, 37, 37 , 0.9), rgb(37, 37, 37 , 0.9)), url(${backgroundUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }
                                ]">
                                <div class="row">
                                    <div class="col-md-4">
                                        
                                    </div>
                                    <div class="col-md-8">
                                         <div class="small__card_content_wrapper align-items-center " >
                                            <p class="dashboard__card__header text-white">ETERNAL PLC.</p>
                                            <p class="yellow_text">ALAPERE STATION</p>
                                            <small class="grey_text">08-12-2020</small>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
import backgroundUrl from "@/assets/img/Tankimage.png";
// import PumpVarianceTemplate from '@/components/Templates/list_of_pump_variance_reports_template.vue';



export default {
    components: {
        masterLayout
    },
    data() {
        return {
            companiesCount: 0,
            stationsCount: 0,
            backgroundUrl
        }
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>