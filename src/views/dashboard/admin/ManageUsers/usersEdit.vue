<template>
  <masterLayout>
      <div class="users_edit">
          <div class="new_row_section mb-3">
          <div class="small_card product_details_card mt-3">
             <h4 class="text-center py-3">{{userObject.email}}</h4>
            <div class="row">
              <div class="col-lg-3 col-md-2 user_contact border-right">
                <div class="text-center">
                <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/clock (4).svg" width="60px" />
              </div>
                    <router-link title="" :to="{name:'map_user_branch', query: { id: this.$route.query.id } }" class="mx-auto btn create_btn primary_btn colour_one" > Map User To Branch
                    </router-link>
                </div>
              </div>
               <div class="col-lg-3 col-md-2 credit_limit border-right">
                <div class="text-center">
                 
              <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/truck.svg" width="60px" />
              </div>
                <router-link :to="{name:'map_user_dealer', query: { id: this.$route.query.id } }" class="btn mx-auto create_btn primary_btn colour_two" >
                    Map User To Dealer
                </router-link>
            </div>
              </div>
              <div class="col-lg-3 col-md-2 number_roles border-right">
                <div class="text-center">
              <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/car-parking.svg" width="60px" />
              </div>
                <router-link :to="{name:'map_user_to_comapny', query: { id: this.$route.query.id } }" class="btn mx-auto create_btn primary_btn colour_three" >Map User To Company
            </router-link>
              </div>
              </div>
              <div class="col-lg-3 col-md-2">
               <div class="text-center">
                   <div class="icon_wrapper centralize icon_div_big mx-auto text-center">
                    <img src="@/assets/img/truck.svg" width="60px" />
              </div>
            <router-link :to="{name:'map_user_to_role', query: { id: this.$route.query.id } }" class="btn mx-auto create_btn primary_btn colour_two" > Map User To Role
            </router-link>
            </div>
              </div>

              <!-- <div class="col-lg-3 col-md-2">
               <div class="text-center">
                   <div class="icon_wrapper centralize icon_div_big mx-auto text-center">
                    <img src="@/assets/img/truck.svg" width="60px" />
              </div>
            <router-link :to="{name:'map_user_sales_rep', query: { id: this.$route.query.id } }" class="btn mx-auto create_btn primary_btn colour_two" > Map User To Sales Rep
            </router-link>
            </div>
              </div> -->
            </div>
          </div>
        </div>

        <div  class="full__row_section mapusersdetails">
            <div class="row">
                <div class="col-lg-5 col-md-4 div ep_card mail_card card_height mb-5">
                    <div class="pad_div">

                       <!-- MAP COMPANY -->                   
                        

                        <!-- <div class="mb-3 tabs__lists">
                            <h5>Map user to branch by filling the form below</h5>
                        <form>
                    <div class="text-center">
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Company</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="companyId">
                                <option disabled value="selectCompany">Select Company</option>
                                <option v-for="(company, index) in companies" :value="company.id" :key="index">{{ company.name }}</option>
                            </select>
                            </div>
                        </div>
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Branch</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="branchId">
                                <option disabled value="selectBranch">Select Branch</option>
                                <option v-for="(branch, index) in branches" :value="branch.id" :key="index">{{ branch.name }}</option>
                            </select>
                            </div>
                        </div>
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Role</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="role">
                                  <option disabled value="selectRole">Select Role</option>
                                  <option value="branch manager">Branch Manager</option>
                                  <option value="branchtechadmin">Branch Tech Admin</option>
                                  <option value="IndustryManager">Industry Manager</option>
                                  <option value="sub branch manager">Sub Branch Manager</option>
                                  <option value="supervisor">Supervisor</option>
                              </select>
                            </div>
                        </div>
                         <div class="text-center mt-3">
                            <button class="btn btn_theme">Add User</button>
                         </div>
                    </div>
                    </form>
                     </div> -->

                        <!-- MAP DEALERS  -->    
                     <!-- <div class="mb-3 tabs__lists">
                            <h5>Map user to Dealer by filling the form below</h5>
                        <form>
                    <div class="text-center">
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Company</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="companyId">
                                <option disabled value="selectCompany">Select Company</option>
                                <option v-for="(company, index) in companies" :value="company.id" :key="index">{{ company.name }}</option>
                            </select>
                            </div>
                        </div>
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Dealer</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="dealerId">
                                <option disabled value="selectDealer">Select Dealer</option>
                                <option v-for="(dealer, index) in dealers" :value="dealer.id" :key="index">{{ dealer.name }}</option>
                            </select>
                            </div>
                        </div>
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Role</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="role">
                                  <option disabled value="selectRole">Select Role</option>
                                  <option value="branch manager">Branch Manager</option>
                                  <option value="branchtechadmin">Branch Tech Admin</option>
                                  <option value="IndustryManager">Industry Manager</option>
                                  <option value="sub branch manager">Sub Branch Manager</option>
                                  <option value="supervisor">Supervisor</option>
                              </select>
                            </div>
                        </div>
                         <div class="text-center mt-3">
                            <button class="btn btn_theme">Add User</button>
                         </div>
                    </div>
                    </form>
                     </div> -->


                        <!-- MAP COMPANY -->                   
                        <!-- <div class="mb-3 tabs__lists"> 
                            <h5>Map user to Company by filling the form below</h5>
                        <form>
                    <div class="text-center">
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Company</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="companyId">
                                <option disabled value="selectCompany">Select Company</option>
                                <option v-for="(company, index) in companies" :value="company.id" :key="index">{{ company.name }}</option>
                            </select>
                            </div>
                        </div>
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Role</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="role">
                                  <option disabled value="selectRole">Select Role</option>
                                  <option value="branch manager">Branch Manager</option>
                                  <option value="branchtechadmin">Branch Tech Admin</option>
                                  <option value="IndustryManager">Industry Manager</option>
                                  <option value="sub branch manager">Sub Branch Manager</option>
                                  <option value="supervisor">Supervisor</option>
                              </select>
                            </div>
                        </div>
                         <div class="text-center mt-3">
                            <button class="btn btn_theme">Add User</button>
                         </div>
                    </div>
                    </form>
                     </div> -->


                      <!-- MAP ROLE -->                   
                        <!-- <div class="mb-3 tabs__lists"> 
                            <h5>Map user to Role by filling the form below</h5>
                        <form>
                    <div class="text-center">
                        <div class="align-items-center mt-3">
                            <div class="text-left">
                                <label for="">Select Role</label>
                            </div>
                            <div class="input__block">
                            <select class="form-control" v-model="role">
                                  <option disabled value="selectRole">Select Role</option>
                                  <option value="branch manager">Branch Manager</option>
                                  <option value="branchtechadmin">Branch Tech Admin</option>
                                  <option value="IndustryManager">Industry Manager</option>
                                  <option value="sub branch manager">Sub Branch Manager</option>
                                  <option value="supervisor">Supervisor</option>
                              </select>
                            </div>
                        </div>
                         <div class="text-center mt-3">
                            <button class="btn btn_theme">Add User</button>
                         </div>
                    </div>
                    </form>
                     </div> -->

                    </div>
                </div>
                <div class="col-lg-7 bg-section">
                   <div class="new_row_section mb-3">
                      <div class="bg_image">
                          <img src="@/assets/img/backimage.svg" alt="" height="477px">
                      </div>
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
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
  },

  mounted() {
    this.id = this.$route.query.id;
    let ml = sessionStorage.getItem(this.id);
    if (!ml) {
    let allData = localStorage.getItem("usersList");
    let dt = JSON.parse(allData);
    dt.forEach((my, index) => {
        if (my.id === this.id) {
            ml = JSON.stringify(my);
            sessionStorage.setItem(this.id, ml);
        }
    });
    }
    this.userObject = JSON.parse(ml);
  },
  data() {
    return {
      userObject: {}
    };
  },
  
  methods: {
  },
};
</script>
