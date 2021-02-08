<template>
    <div>
        <AddTax />
        <MasterLayout>
            <div class="py-4">
                <h5 class="primary-color text-center">Add a product or service</h5>
                <div class="form-wrapper add_product">
                    <form class="mt-5">
                        <div class="mt-3">
                            <label>Name</label>
                            <div class="form_input">
                                <input type="email"  class="form-control"  />
                            </div>
                        </div>
                        <div class="mt-3">
                            <label>Description</label>
                            <div class="form_input">
                                <textarea rows="4"  class="form-control"   ></textarea>
                            </div>
                        </div>
                        <div class="mt-3">
                            <label>Price</label>
                            <div class="form_input">
                                <input type="number"  class="form-control"  />
                            </div>
                        </div>
                        <div class="mt-3 position-relative">
                            <label>Sales Tax</label>  
                            <!--<i class="fa fa-plus primary-color cursor-pointer ml-3" title="Add Tax" aria-hidden="true"></i>-->
                             <b-form-checkbox-group
                                v-model="selected"
                                :options="options"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                                disabled-field="notEnabled"
                                ></b-form-checkbox-group>
                        </div>
                        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-5" 
                            @click="login($event, 'verifyEmail')"
                            :disabled="isButtonDisabled ? true : null"
                            :style="[
                                isButtonDisabled
                                ? { cursor: 'not-allowed' }
                                : { cursor: 'pointer' }
                            ]">Save
                            <img
                                src="@/assets/img/git_loader.gif"
                                style="display:none"
                                width="22px"
                                class="ml-3 loader"
                            />
                        </button>
                    </form>
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
import AddTax from "@/components/modals/Products/addTax"
import Jquery from 'jquery';
let $ = Jquery;


export default {
    components: {
        MasterLayout,
        AddTax
    },
    data() {
        return {
            isButtonDisabled: false,
            selected: [],
            options: [
                { 
                    item: 'vat', name: 'VAT (7.5%)' 
                },
                { 
                    item: 'WHT', name: 'WHT (10%)' 
                },
            ]
        }
    },
    methods: {
        addTaxModal() {
            this.$modal.show('addTax')
        }
    },
}
</script>