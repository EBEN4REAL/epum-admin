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
            <h5 class="title">Create Role</h5>
          </div>
        </div>
      </div>
    </section>
    <div  class="full__row_section mt-3 center_div margin-top-center-div ep_card mb-5">
      <div class="" style="height: 160px;">
        <form>
          <div class="text-center">
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <label> Role Name</label>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="text" class="" placeholder="Role" v-model="role" />
                </div>
                <div class="text-center mt-4">
                  <!-- <button class="btn btn-primary">Back to List</button> -->
                  <button class="btn btn_theme" style="padding: 10px; " @click="createRole"  :disabled="isButtonDisabled ? true : null"
                      :style="[
                          isButtonDisabled
                          ? { cursor: 'not-allowed' }
                          : { cursor: 'pointer' }
                      ]"> Create
                     <img
                        src="@/assets/img/git_loader.gif"
                        style="display:none"
                        width="19"
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

  mounted() {},
  data() {
    return {
      backgroundUrl,
      isButtonDisabled: false,
      showLoader: false,
      role: null
    };
  },
  methods: {
     createRole(event){
        event.preventDefault();
        if(!this.role) {
            this.$toast("Role Field Cannot be blank", {
                type: "error", 
                timeout: 3000
            });
            return;
        }
       

        $('.loader').show();
        this.axios.post(`${configObject.apiBaseUrl}/Admin/CreateRole?role=${this.role}`, configObject.authConfig)
            .then(res => {
                this.$toast("Role created successfully", {
                    type: "success",
                    timeout: 3000
                });
                this.role = null
                this.$eventHub.$emit('refreshRoles')
                $('.loader').hide();
            })
            .catch(error => {
                this.isButtonDisabled = false;
                $('.loader').hide();
                this.$toast("Unable to create Role", {
                    type: "error",
                    timeout: 3000
                });
            });
    }
  }
};
</script>
