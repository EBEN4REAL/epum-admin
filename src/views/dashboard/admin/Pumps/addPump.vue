<template>
  <masterLayout>
    <section
      class="mt-3 full__row_section banner-gradient"
      :style="[
        {
          backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31 , 0.7)), url(${backgroundUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
      ]"
    >
      <div
        class="row align-items-center justify-content-center hundred-percent-height"
      >
        <div class="col-md-12">
          <div class="text-center">
            <h5 class="title">Add Pump</h5>
          </div>
        </div>
      </div>
    </section>
    <div class="full__row_section center_div margin-top-center-div mt-3 ep_card">
      <div class="">
        <form>
              <div class="row align-items-center mt-3">
                  <div class="col-md-4">
                    <label class="label"> Pump Name</label>
                  </div>
                  <div class="col-md-8">
                    <div class="input__block">
                      <input type="text" placeholder="" class="" v-model="name"/>
                    </div>
                  </div>
              </div>
              <div class="row align-items-center mt-3" >
                  <div class="col-md-4">
                    <label class="label">Pump Display Name</label>
                  </div>
                  <div class="col-md-8">
                    <div class="input__block">
                      <input type="text" placeholder="" class="" v-model="displayName" />
                    </div>
                  </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Associate Pump to Tank</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <select class="form-control" v-model="tankId">
                      <option disabled selected value="selectATank">
                        Select Associate Pump to Tank
                      </option>
                      <option v-for="(tank, index) in tanks" :key="index" :value="tank.id">{{tank.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Manufacturer</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" v-model="manufacturer"/>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Model</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" v-model="model"/>
                  </div>
                </div>
              </div>
              <div class="row align-items-center mt-3">
                <div class="col-md-4">
                  <label class="label">Pump Version</label>
                </div>
                <div class="col-md-8">
                  <div class="input__block">
                    <input type="text" placeholder="" class="" v-model="version"/>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <button class="btn btn-success" @click="addPump"
                    :disabled="isButtonDisabled ? true : null"
                    :style="[
                      isButtonDisabled
                        ? { cursor: 'not-allowed' }
                        : { cursor: 'pointer' }
                    ]"
                  >Add Pump
                    <img
                      src="@/assets/img/git_loader.gif"
                      style="display:none"
                      width="35px"
                      class="ml-3 loader"
                    />
                </button>
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
    this.getTanks()
  },
  data() {
    return {
      backgroundUrl,
      isButtonDisabled: false,
      tanks: [],
      name: '',
      displayName: '',
      tankId: 'selectATank',
      manufacturer: '', 
      model: '',
      version: '',
    };
  },
  methods: {
    getTanks() {
        this.axios
        .get(
        `${configObject.apiBaseUrl}/Branch/Tanks/${this.$route.query.companyBranchId}`,
        configObject.authConfig
        )
        .then(response => {
          console.log(response.data)
            this.tanks = response.data
        })
        .catch(error => {});
    },
    addPump(event) {
      event.preventDefault();
      if(!this.name) {
          this.$toast("Please input a pump name", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.displayName) {
          this.$toast("Please input a display name", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(this.tankId == 'selectATank') {
          this.$toast(`Please select a ${this.selectedDevice}`, {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      if(!this.manufacturer) {
          this.$toast("Please input a manufacturer", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.model) {
          this.$toast("Please input a model", {
              type: "error", 
              timeout: 3000
          });
          return;
      }

      if(!this.version) {
          this.$toast("Please input a version", {
              type: "error", 
              timeout: 3000
          });
          return;
      }
      
      const data = {
          branchId: this.$route.query.companyBranchId,
          tankId: this.tankId,
          name: this.name,
          manufacturer: this.manufacturer,
          model: this.model,
          version: this.version,
          displayName: this.displayName
      }

      $('.loader').show();
      this.isButtonDisabled = true;

       this.axios.post(`${configObject.apiBaseUrl}/Pumps/AddPump`, data, configObject.authConfig)
          .then(res => {
                this.$toast("Successfully Added Pump", {
                    type: "success",
                    timeout: 3000
                });
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$router.push({name: 'installedPumps', query: {companyBranchId: this.$route.query.companyBranchId}})
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
  }
};
</script>
