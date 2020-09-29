<template>
    <masterLayout>
        <div class="new_row_section">
            <div class="page_title">
                <p>PEF DASHBOARD</p>
            </div>
            <div class="row mt-3">
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           Outlets
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           PMS Available
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           AGO Available
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-3 col-md-3 remove_padding-right ">
                   <div class="small__card_content_wrapper small_card" style="height: 100%">
                        <h4 class="dashboard__card__header">
                           DPK Available
                        </h4>
                        <div class="text-center mt-3">
                            <img src="@/assets/img/branch_icon.png" width="60px" style="opacity: 0.6;"  />
                        </div>
                         <div class="mt-3">
                            <h3 class="dashboard__card__header_bottom">123</h3>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
      
    </masterLayout>
</template>

<script>

import Vue from 'vue';
import masterLayout from '@/views/dashboard/masterLayout'



export default {
    components: {
        masterLayout,
    },
  
    mounted(){
       
    },
    data() {
        return {
          
        }
    }
}
</script>
