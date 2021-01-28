<template>
  <masterLayout>
        <div class="small_card product_details_card toggler-card mt-3" :class="mode ? 'dark_back' : null">
           <div class="console-details">
                <div class="pt-3 px-4 console_header">
                    <h4 :class="darkClass">{{deviceId}}</h4>
                    <p :class="darkClass">Memory Usage: {{this.$route.query.usage}}</p>
                    <p :class="darkClass">Firmware Version: {{this.$route.query.version}}</p>
                </div>
                <div class="custom-control custom-switch toggler-button">
                    <p style="margin-right:8px;" :class="darkClass">Light</p>
                    <input type="checkbox" value="isChecked" v-model="mode" style="display: none;" />
                    <div class="dark_check" :class="!mode ? 'light_check' : null" @click="toggleCheck">
                        <div class="dark_check_inner" :style="[mode ? {left: '21px'} : null]"></div>
                    </div>
                    <p style="margin-left:8px;" :class="darkClass">Dark</p>
                </div>
              <hr />
           </div>
          <div class="console-content">
              <div class="console_height">
                  <div class="icons px-2 console_info_holder" v-for="(command, i) in info" :key="i">
                    <p><i class="fa fa-2x info_icon" :class="[command.type === 'receive' ?  'fa-angle-double-left' : 'fa-angle-right', darkClass]"></i></p>
                    <p class="console_info" :class="darkClass"> 
                    {{command.data}}
                    </p>
                  </div>
              </div>
              <div class="console_text_area">
                  <textarea name="" id="" cols="30" rows="10" class="px-2" :class="darkClass"> </textarea>
                    <span class="icon-user"><i class="fa fa-angle-right fa-1x" :class="darkClass"></i></span>
              </div>
          </div>
        </div>
  </masterLayout>
</template>

<script>
import Vue from "vue";
import masterLayout from "@/views/dashboard/masterLayout";
import Jquery from 'jquery';
// import signalR from "@aspnet/signalr";
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
// let $ = Jquery;
import configObject from "@/config";

export default {
  components: {
    masterLayout,
  },
  data() {
    return {
      info: [],
      mode: false,
      darkClass: '',
      chat: null,
      deviceId: ''
    };
  },
  updated() {
    $('.console_height').scrollTop($('.console_height')[0].scrollHeight);
  },
  mounted() {
    this.deviceId = this.$route.query.deviceId

    let memData = []
    let memIndex = 0
 
    $.connection.hub.url = 'https://app.epump.com.ng:1000/signalr';
    var chat = $.connection.myHub;
    // this.chat = chat

    chat.client.onEpOneSent = (deviceId, data) => {
        if (deviceId === this.deviceId) {
            this.info.push({data, type: 'receive'})
            $('.console_height').scrollTop($('.console_height')[0].scrollHeight);
        }
    };

    chat.client.onRecievedMessage = (data) => {
      this.info.push({data, type: 'receive'})
      $('.console_height').scrollTop($('.console_height')[0].scrollHeight);

    };


    // Start the connection.
    $.connection.hub.start().done(() => {
        chat.server.connect('Connected from the Web');

        window.addEventListener("keydown", (e) => {
            let targettedElement = $(event.target)[0].nodeName.toLowerCase();
            if (targettedElement === 'textarea') {
                if (e.keyCode === 13) {
                    // Enter pressed
                    e.preventDefault();
                    let entry = $('textarea').val();
                    memData.push({ cmd: entry, response: '' });
                    $('textarea').val('');
                    $('textarea').text('');
                    memIndex = 0;	// Reset index to 0
                    this.info.push({data: entry, type: 'command'})
                    $('.console_height').scrollTop($('.console_height')[0].scrollHeight);

                    this.pushToSignalR(this.deviceId, entry);
                }
                else if (e.keyCode === 38) {
                    // Up arrow pressed
                    e.preventDefault();
                    if (memIndex < memData.length) {
                        $('textarea').val(memData[memData.length - 1 - memIndex].cmd).text(memData[memData.length - 1 - memIndex].cmd);
                        if (memIndex < memData.length - 1)
                            memIndex++;
                    }
                }
                else if (e.keyCode === 40) {
                    // Down arrow pressed
                    e.preventDefault();
                    if (memIndex > 0) {
                        memIndex--;
                        $('textarea').val(memData[memData.length - 1 - memIndex].cmd).text(memData[memData.length - 1 - memIndex].cmd);
                    }
                    else {
                        $('#textarea').val('').text('');
                    }
                }
            }
        }, false);

    });
  },
  methods: {
    toggleCheck() {
        this.mode = !this.mode
        this.darkClass = this.darkClass == 'white_text_ev' ? '' : 'white_text_ev'
    },
    pushToSignalR(deviceId, value) {
        // this.chat.server.webConsoleSent(deviceId, value);

        $.connection.hub.url = 'https://app.epump.com.ng:1000/signalr';
        var chat = $.connection.myHub;

        chat.server.webConsoleSent(deviceId, value);
    }
  }
};
</script>