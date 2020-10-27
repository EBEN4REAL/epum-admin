<template>
  <masterLayout>
    <div class="profile__section__outer_wrapper">
      <div class="account__header__banner">
        <div
          class="account_settings_banner co_dealer_details"
          :style="[
            {
              backgroundImage: `linear-gradient(rgb(12, 4, 31 , 0.7), rgb(12, 4, 31, 0.7)), url(${backgroundUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: '5px'
            }
          ]"
        >
          <div class="banner__text_section">
            <h3 class="banner__text">Company Details</h3>
          </div>
        </div>
        <div class="account_Settings_profile_details_section_row">
          <div class="account_Settings_profile_details_section_first_row">
            <img src="@/assets/img/company_icon.png" class="profile__pic" />
            <div class="camera_icon">
                <i class="fa fa-camera"></i>
            </div>
          </div>
          <div class="account_Settings_profile_details_section_second_row">
            <h5 class="profile__detail__header mt-2">
              Favour <br />
              <small>Helloo</small>
            </h5>
          </div>
        </div>
        </div>
          <div class="full__row_section mt-3 mb-5">
            <div class="">
              <form>
                <div class="details_form">
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label> Company Name</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Company Name"
                            class=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Email</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Email"
                            class=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Street</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="Street"
                            class=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>City</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <input
                            type="text"
                            placeholder="City"
                            class=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row border-bottom align-items-center p-2 mt-3">
                      <div class="col-md-4">
                        <label>Country</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <span>Nigeria</span>
                        </div>
                      </div>
                    </div>
                    <div class="row p-2 mt-3">
                      <div class="col-md-4">
                        <label>State</label>
                      </div>
                      <div class="col-md-8">
                        <div class="details_input">
                          <span>state</span>
                        </div>
                      </div>
                    </div>
                  </div>
              </form>
            </div>
          </div>
          <div class="text-center mt-3">
          <button class="btn btn_theme">Update Information
              <img
                src="@/assets/img/git_loader.gif"
                style="display:none"
                width="35px"
                class="ml-3 loader"
            />
        </button>
            </div>
        </div>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import backgroundUrl from "@/assets/img/bg__card.png";
import Jquery from 'jquery';
let $ = Jquery;
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },
  data() {
    return {
      backgroundUrl,
    };
  },
};
</script>