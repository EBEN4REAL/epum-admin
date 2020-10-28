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
            <h5 class="title">Edit User To Role</h5>
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
                <small> Email</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="email" placeholder="Email" class="" />
                </div>
              </div>
            </div>
            <div class="row align-items-center mt-3">
              <div class="col-md-4 text-left">
                <small>Credit Limit</small>
              </div>
              <div class="col-md-8">
                <div class="input__block">
                  <input type="number" placeholder="0.00" class="" />
                </div>
              </div>
            </div>
           
            <div class="row mt-3">
              <div class="col-md-4 text-left">
                <small>Roles</small>
              </div>
              <div class="col-md-8 text-left align-items-center ">
                  <b-form-checkbox-group
                    v-model="userRole"
                    :options="roles"
                    name="flavour-2a"
                  >
                  </b-form-checkbox-group>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
    <section class="full__row_section">
       <div class="btn-group btn-group-sm" role="group">
          <router-link v-b-tooltip.hover title="Map User To Branch" :to="{name:'map_user_branch', query: { id: this.$route.query.id }}" class="btn btn-warning" >
                <i class="fa fa-map-o mr-1" aria-hidden="true"></i>
          </router-link>
          <router-link v-b-tooltip.hover title="Map User To Dealer" :to="{name:'map_user_dealer', query: { id: this.$route.query.id }}" class="btn btn-primary" >
                <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
          </router-link>
          <!-- <router-link v-b-tooltip.hover title="Map User To Sales Rep" :to="{name:'map_user_sales_rep', query: { id: this.$route.query.id }}" class="btn btn-info" >
                <i class="fa fa-map-o mr-1" aria-hidden="true"></i>
          </router-link> -->
           <router-link v-b-tooltip.hover title="Map User To Role" :to="{name:'map_user_to_role', query: { id: this.$route.query.id }}" class="btn btn-primary" >
                <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
          </router-link>

           <router-link v-b-tooltip.hover title="Map User To Company" :to="{name:'map_user_to_comapny', query: { id: this.$route.query.id }}" class="btn btn-success" >
                <i class="fa fa-refresh mr-1" aria-hidden="true"></i>
          </router-link>
      </div>
    </section>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },

  mounted() {
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
    const userObject = JSON.parse(ml);
    this.userRoles = userObject.roles.split(',')
  },
  data() {
    return {
      backgroundUrl,
      id: '',
      userRoles: [],
      userRole: [],
      roles: []
    };
  },
  watch: {
    roles: function(roles) {
      if (roles.length) {
        this.roles.forEach(cur => {
          if (this.userRoles.includes(cur.text)) {
            this.userRole.push(cur.value)
          }
        })
      }
    }
  },
  methods: {
    getRoles() {
        this.axios
        .get(
            `${configObject.apiBaseUrl}/Admin/GetRoles`, configObject.authConfig)
            .then(res => {
                res.data.sort((a, b) => {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0;
                });
                this.roles = res.data.map(cur => {
                  return {
                    text: cur.name,
                    value: cur.id
                  }

                })
            })
            .catch(error => {
            });
    },
  }
};
</script>
