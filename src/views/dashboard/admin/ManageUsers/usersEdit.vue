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
                    <div class="mx-auto btn create_btn primary_btn colour_one"
                        @click="changeForm('Branch')"
                    >
                        Map User To Branch
                    </div>
                </div>
              </div>
               <div class="col-lg-3 col-md-2 credit_limit border-right">
                <div class="text-center">
                 
              <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                    <img src="@/assets/img/truck.svg" width="60px" />
              </div>
                <div class="btn mx-auto create_btn primary_btn colour_two"
                        @click="changeForm('Dealer')"
                    >
                    Map User To Dealer
                </div>
            </div>
              </div>
              <div class="col-lg-3 col-md-2 number_roles border-right">
                <div class="text-center">
                    <div class="icon_wrapper centralize icon_div_big mx-auto text-center mt-3">
                            <img src="@/assets/img/car-parking.svg" width="60px" />
                    </div>
                    <div class="btn mx-auto create_btn primary_btn colour_three"
                        @click="changeForm('Company')"
                    >
                        Map User To Company
                    </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-2">
               <div class="text-center">
                    <div class="icon_wrapper centralize icon_div_big mx-auto text-center">
                        <img src="@/assets/img/truck.svg" width="60px" />
                    </div>
                    <div class="btn mx-auto create_btn primary_btn colour_two"
                        @click="changeForm('Role')"
                    >
                        Map User To Role
                    </div>
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

                    <div class="mb-3 tabs__lists" v-if="currentForm !== null"> 
                        <h5>Map user to {{currentForm}} by filling the form below</h5>
                        <form>
                            <div class="text-center">
                                <div class="align-items-center mt-3" v-if="currentForm !== 'Role' && currentForm !== null">
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

                                <div class="align-items-center mt-3" v-if="currentForm == 'Branch'">
                                    <div class="text-left">
                                        <label>Select Branch</label>
                                    </div>
                                    <div class="input__block">
                                        <select class="form-control" v-model="branchId">
                                            <option disabled value="selectBranch">Select Branch</option>
                                            <option v-for="(branch, index) in branches" :value="branch.id" :key="index">{{ branch.name }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="align-items-center mt-3" v-if="currentForm == 'Dealer'">
                                    <div class="text-left">
                                        <label>Select Dealer</label>
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

                                    <div class="input__block" v-if="currentForm == 'Company'">
                                        <select class="form-control" v-model="role">
                                            <option disabled value="selectRole">Select Role</option>
                                            <option value="companyadmin">Company Admin</option>
                                            <option value="industryadmin">Industry Admin</option>
                                        </select>
                                    </div>

                                    <div class="input__block" v-if="currentForm == 'Branch'">
                                        <select class="form-control" v-model="role">
                                            <option disabled value="selectRole">Select Role</option>
                                            <option value="branch manager">Branch Manager</option>
                                            <option value="branchtechadmin">Branch Tech Admin</option>
                                            <option value="IndustryManager">Industry Manager</option>
                                            <option value="sub branch manager">Sub Branch Manager</option>
                                            <option value="supervisor">Supervisor</option>
                                            
                                        </select>
                                    </div>

                                    <div class="input__block" v-if="currentForm == 'Dealer'">
                                        <select class="form-control" v-model="role">
                                            <option value="dealers">Dealers</option>
                                        </select>
                                    </div>

                                    <div class="input__block" v-if="currentForm == 'Role'">
                                        <select class="form-control" v-model="role">
                                            <option disabled value="selectRole">Select Role</option>
                                            <option v-for="(aRole, index) in roles" :value="aRole.name" :key="index">{{ aRole.name }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="text-center mt-3">
                                    <button class="btn btn_theme" @click="addUser"
                                        :disabled="isButtonDisabled ? true : null"
                                        :style="[
                                        isButtonDisabled
                                            ? { cursor: 'not-allowed' }
                                            : { cursor: 'pointer' }
                                        ]"
                                    >Map User
                                        <img
                                        src="@/assets/img/git_loader.gif"
                                        style="display:none"
                                        width="15px"
                                        class="ml-3 loader"
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

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
    this.getCompanies()
    this.getRoles()
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
  watch: {
    companyId: function(newId, oldId) {
        if (newId !== 'selectCompany' && (this.currentForm == 'Branch' || this.currentForm == 'Dealer')) {
            this.currentForm == 'Dealer' ? this.getDealers() : this.getBranches();
        }
    },
  },
  data() {
    return {
        currentForm: null,
        userObject: {},
        companies: [],
        companyId: 'selectCompany',
        branches: [],
        branchId: 'selectBranch',
        dealers: [],
        dealerId: 'selectDealer',
        role: 'selectRole',
        roles: [],
        isButtonDisabled: false,
    };
  },
  
  methods: {
    changeForm(currentForm) {
        this.companyId = 'selectCompany'
        this.branchId = 'selectBranch'
        this.branches = []
        this.dealerId = 'selectDealer'
        this.dealers = []
        this.role = currentForm == 'Dealer' ? 'dealers' : 'selectRole'
        this.currentForm = currentForm
    },
    getCompanies() {
        this.axios
            .get(
                `${configObject.apiBaseUrl}/Company?SortName=${'Ascending'}`, configObject.authConfig())
                .then(res => {
                    this.companies = res.data.data
            })
            .catch(error => {
            });
    },

    getBranches() {
        this.axios
            .get(
                `${configObject.apiBaseUrl}/Company/Branches/${this.companyId}`, configObject.authConfig())
                .then(res => {
                    res.data.sort((a, b) => {
                        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                    });
                    this.branches = res.data
                })
                .catch(error => {
                });
    },

    getDealers() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/Dealers/${this.companyId}`, configObject.authConfig())
            .then(res => {
                res.data.sort((a, b) => {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                });
                this.dealers = res.data
            })
            .catch(error => {
            });
    },

    getRoles() {
        this.axios
          .get(
              `${configObject.apiBaseUrl}/Admin/GetRoles`, configObject.authConfig())
              .then(res => {
                  res.data.sort((a, b) => {
                      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                  });
                  this.roles = res.data
              })
              .catch(error => {
              });
    },

    addUser(event) {
        event.preventDefault();
        if (this.currentForm !== null && this.currentForm !== 'Role') {
            if(this.companyId == 'selectCompany') {
                this.$toast("Please select a company", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
        }

        if (this.currentForm == 'Branch') {
            if(this.branchId == 'selectBranch') {
                this.$toast("Please select a branch", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
        }

        if (this.currentForm == 'Dealer') {
            if(this.dealerId == 'selectDealer') {
                this.$toast("Please select a dealer", {
                    type: "error", 
                    timeout: 3000
                });
                return;
            }
        }
      

        if(this.role == 'selectRole') {
            this.$toast("Please select a role", {
                type: "error", 
                timeout: 3000
            });
            return;
        }

        const data = {
            userId: this.$route.query.id,
            role: this.role,
            id: this.currentForm == 'Company' ? this.companyId : this.currentForm == 'Branch' ? this.branchId : this.currentForm == 'Dealer' ? this.dealerId : ''
        }

        $('.loader').show();
        this.isButtonDisabled = true;

        this.axios.post(`${configObject.apiBaseUrl}/Admin/AddUserToRole`, data, configObject.authConfig())
            .then(res => {
                    this.$toast("Successfully Mapped User", {
                        type: "success",
                        timeout: 3000
                    });
                    this.isButtonDisabled = false;
                    $('.loader').hide();
                    this.$router.push({name: 'user_details', query: {id: this.$route.query.id}})
            })
            .catch(error => {
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$toast(error.response.data.message, {
                    type: "error",
                    timeout: 3000
                });
            });
    }
  },
};
</script>
