<template>
    <masterLayout>
        <section class="mt-3 full__row_section banner-gradient"  :style="[
                {
                backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
                }
            ]">
        <div class="row align-items-center justify-content-center hundred-percent-height">
            <div class="col-md-12 ">
            <div class="text-center ">
                <h5 class="title">MAIL RECIPIENTS</h5>
            </div>
            </div>
        </div>
        </section>
        <div  class="full__row_section mt-3">
            <div class="row">
                <div class="col-lg-8">
                    <div class="pad_div">
                        <div class="text-left tabs__lists">
                          <EjsTable :tableProps="tableProps"  />
                            </div>
                         </div>
                    </div>
                <div class="col-lg-4 col-md-4 div ep_card card_height mail_card mb-5">
                    <div class="pad_div">
                        <div class="mb-3 tabs__lists">
                            <h5>Add to Mail Recipients</h5>
                        <form>
                    <div class="text-center">
                        <div class="align-items-center mt-3">
                            <div class="input__block">
                            <input type="text" placeholder="Email" class="" />
                            </div>
                        </div>
                         <div class="text-center mt-3">
                            <button class="btn btn_theme">Create</button>
                         </div>
                    </div>
                    </form>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import EjsTable from '@/components/ejsTable.vue';

export default {
    components: {
        masterLayout,
        EjsTable
    },
    data() {
        return {
            backgroundUrl,
            tableProps: {
                pageSettings: { pageSizes: [12, 50, 100, 200], pageCount: 4 },
                toolbar: ["ExcelExport", "PdfExport", "Search"],
                search: { operator: "contains", ignoreCase: true },
                tableData: [
                    {
                        index: 1,
                        email: "fazzy@gmail.com",
                    },
                    {
                        index: 2,
                        email: "fazzy@gmail.com",
                    },
                    {
                        index: 3,
                        email: "fazzy@gmail.com",
                    },
                    {
                        index: 4,
                        email: "fazzy@gmail.com",
                    },
                    {
                        index: 5,
                        email: "fazzy@gmail.com",
                    },
                ],
                columns: [ 
                    { 
                        field: "index", 
                        headerText: "#", 
                        width: 40, 
                        textAlign: "center"
                    }, 
                    { 
                        field: "email", 
                        headerText: "Email", 
                        width: 180, 
                        textAlign: "center"
                    },  
                ] ,
                fileName: 'mailrecipient.pdf'
            },
        }
    }
}
</script>