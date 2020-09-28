<template>
    <masterLayout>
        <section class=" mt-3 full__row_section">
            <div clas   s="page_title">
                <p>DASHBOARD</p>
            </div>
            <div class="dashboard__cards__wrapper">
                <div class="dashboard__card small_card">
                    <div class="small__card_content_wrapper" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           Companies
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/company_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom fg-success">123</h3>
                        </div>
                    </div>
                </div>
                <div class="dashboard__card  small_card" >
                    <div class="small__card_content_wrapper" style="height: 100%">
                        <h4 class="dashboard__card__header">
                            Dealers
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/dealer_icon.png" width="80px" style="opacity: 0.6;" />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom fg-blue">66</h3>
                        </div>
                    </div>
                </div>
                <div class="dashboard__card small_card" >
                     <div class="small__card_content_wrapper" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           Outlets
                        </h4>
                         <div class="mt-3">
                            <img src="@/assets/img/branch_icon.png" width="70px" style="opacity: 0.6;" />
                        </div>
                        <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom fg-danger">55</h3>
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

export default {
    components: {
        masterLayout
    },
    data() {
        return {

        }
    }
}
</script>