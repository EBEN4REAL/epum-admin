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
            <h5 class="title">Map User To Dealer</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="">
        <form>
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <small> Select Company</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="companyId">
                      <option disabled value="selectCompany">Select Company</option>
                      <option v-for="(company, index) in companies" :value="company.id" :key="index">{{ company.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <small>Select Dealer</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="dealerId">
                      <option disabled value="selectDealer">Select Dealer</option>
                      <option v-for="(dealer, index) in dealers" :value="dealer.id" :key="index">{{ dealer.name }}</option>
                  </select>
                </div>
              </div>
            </div>
           
             <div class="row mt-3">
              <div class="col-md-4 text-left">
                <small>Select Role</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <select class="form-control" v-model="role">
                      <option value="dealers">Dealers</option>
                      
                  </select>
                </div>
                <div class="text-center mt-3">
                  <button class="btn btn_theme" @click="addUserToDealer"
                    :disabled="isButtonDisabled ? true : null"
                    :style="[
                      isButtonDisabled
                        ? { cursor: 'not-allowed' }
                        : { cursor: 'pointer' }
                    ]"
                  >Add User
                    <img
                      src="@/assets/img/git_loader.gif"
                      style="display:none"
                      width="35px"
                      class="ml-3 loader"
                    />
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import configObject from "@/config";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  components: {
    masterLayout,
  },

  mounted() {
    this.getCompanies()
  },
  data() {
    return {
      backgroundUrl,
      companies: [],
      companyId: 'selectCompany',
      dealers: [],
      dealerId: 'selectDealer',
      role: 'dealers',
      isButtonDisabled: false,
    };
  },
  watch: {
      companyId: function(newId, oldId) {
          if (newId !== oldId) {
              this.getDealers();
          }
      },
  },
  
  methods: {
    getCompanies() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company?SortName=${'Ascending'}`, configObject.authConfig)
            .then(res => {
                this.companies = res.data.data
        })
        .catch(error => {
        });
    },
    getDealers() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Company/Dealers/${this.companyId}`, configObject.authConfig)
            .then(res => {
                res.data.sort((a, b) => {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                });
                this.dealers = res.data
            })
            .catch(error => {
            });
    },
    addUserToDealer(event) {
      event.preventDefault();
      if(this.companyId == 'selectCompany') {
          this.$toast("Please select a company", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(this.dealerId == 'selectDealer') {
          this.$toast("Please select a dealer", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      const data = {
        role: this.role,
        id: this.dealerId
      }

      $('.loader').show();
      this.isButtonDisabled = true;

      this.axios.post(`${configObject.apiBaseUrl}/Admin/AddUserToRole`, data, configObject.authConfig)
          .then(res => {
                this.$toast("Successfully Added User", {
                    type: "success",
                    timeout: 3000
                });
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$router.push({name: 'edit_user', query: {id: this.$route.query.id}})
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
