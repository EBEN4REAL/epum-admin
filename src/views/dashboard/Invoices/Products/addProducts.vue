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
                                <input type="email"  class="form-control" v-model="productName"  />
                            </div>
                        </div>
                        <div class="mt-3">
                            <label>Description</label>
                            <div class="form_input">
                                <textarea rows="4"  class="form-control"  v-model="productDescription" ></textarea>
                            </div>
                        </div>
                        <div class="mt-3">
                            <label>Price</label>
                            <div class="form_input">
                                <input type="number"  class="form-control" v-model="productPrice" />
                            </div>
                        </div>
                        <div class="mt-3 position-relative">
                            <label>Sales Tax</label>  
                            <b-form-group  v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group
                                    id="checkbox-group-1"
                                    v-model="selected"
                                    :options="taxes"
                                    :aria-describedby="ariaDescribedby"
                                    name="flavour-1"
                                ></b-form-checkbox-group>
                            </b-form-group>
                            <button class="rounded-button" @click="addTaxModal">Add Tax <i class="fa fa-plus primary-color cursor-pointer ml-2" title="Add Tax" aria-hidden="true"></i></button>
                        </div>
                        <button class="rem-btn w-100 main mobile-btn-height gold_color mt-5" 
                            @click="addProduct"
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
            taxes: [],
            productName: '',
            productDescription: '',
            productPrice: '',
            productTaxes: []
        }
    },
    created() {
        this.$eventHub.$on("refreshTaxes" , () => {
            this.getTaxes()
        });
    },
    mounted() {
        this.getTaxes()
    },
    watch: {
        selected() {
            console.log(this.selected)
        }
    },
    methods: {
        addProduct(event) {
            event.preventDefault()
            if(!this.productName) {
                this.$toast("Product name is required", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.productDescription) {
                this.$toast("Product description is required", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(!this.productPrice) {
                this.$toast("Product price is required", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            if(this.selected.length < 1) {
                this.$toast("Please select at least one tax", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
            const taxes = this.selected.map(taxId => {
                return {
                    "taxId": taxId
                }
            })
            const data = {
                "productName": this.productName,
                "productDescription": this.productDescription,
                "productPrice": this.productPrice,
                "productTaxes": taxes
            }
            console.log(data)
            $('.loader').show();
            this.isButtonDisabled = true;

            this.axios.post(`${configObject.apiBaseUrl}/Invoices/products`, data, configObject.authConfig())
                .then(res => {
                        this.$toast("Successfully added product", {
                            type: "success",
                            timeout: 3000
                        });
                        $('.loader').hide();
                        this.isButtonDisabled = false;
                        this.$eventHub.$emit("refreshInvoiceProducts");
                        this.$router.push({name: 'products'})
                })
                .catch(error => {
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$toast(error.response.data.message, {
                        type: "error",
                        timeout: 3000
                    });
                });
            },
        addTaxModal(e) {
            e.preventDefault();
            this.$modal.show('addTax')
        },
        getTaxes() {
            this.axios
            .get(
                `${configObject.apiBaseUrl}/Invoices/taxes`, configObject.authConfig())
                .then(res => {
                    this.taxes = res.data.map(cur => {
                        return {
                            text: cur.taxName,
                            value: cur.id
                        }
                    })
            })
            .catch(error => {

            });
        },
    },
}
</script>