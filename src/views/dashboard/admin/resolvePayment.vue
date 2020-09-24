<template>
    <MasterLayout>
        <div class="center_div">
        <div class="pad_div">
          <ul class="tabs__lists">
            <li class="mt-3" @click="changeTab('bank')">
              <a
                href="#"
                class="tab_link mr-4"
                :class="[tab === 'bank' ?  'active__tab__link' : null]"
              >
                <i
                  class="fa fa-university mr-2"
                  aria-hidden="true"
                  :style="[tab === 'bank' ?  {color:'#370F70'} : null]"
                ></i>
                Bank Transfer
              </a>
            </li>
            <li class="mt-3" @click="changeTab('card')">
              <a href="#" class="tab_link" :class="[tab === 'card' ?  'active__tab__link' : null]">
                <i
                  class="fa fa-credit-card mr-2"
                  aria-hidden="true"
                  :style="[tab === 'bank' ?  {color:'#370F70'} : null]"
                ></i>
                Fund with Card
              </a>
            </li>
          </ul>
        </div>
        <div v-if="tab === 'card'">
          <div class="pay_header text-center">Fund your Account by paying for your card online</div>
          <div class="text-center mt-4">
            <img src="@/assets/img/credit-card.svg" width="35px" />
          </div>
          <div class="text-center mt-4">
            <small class="small_text">How much would you like to fund your wallet with?</small>
          </div>
          <div class="input_holder">
            <div class="mt-4">
              <input type="hidden" class="email" />
              <input type="hidden" class="phone" />
              <input type="hidden" class="publicKey" />
              <input type="hidden" name="trxRef" class="trxRef" />
              <input type="hidden" name="flwRef" class="flwRef" />
              <input
                type="number"
                name="amount"
                class="form-control form__input amount"
                placeholder="Amount"
                style="width: 100%"
              />
            </div>
          </div>
          <div class="mt-4 text-center">
            <button class="btn btn_theme" @click="payFunction($event)">Pay Now</button>
          </div>
        </div>

        <div v-if="tab === 'bank'">
          <div
            class="pay_header text-center"
          >Fund your account by doing a bank transfer to the following bank details</div>
          <div class="text-center mt-4">
            <img src="@/assets/img/credit_card__grey.svg" width="35px" />
          </div>
          <div class style="margin: 0 auto; width: 60%">
            <div class="mt-4">
              <div class="row">
                <div class="col-md-6">
                  <span class="accont_text_span">Account Name:</span>
                </div>
                <div class="col-md-6 text-right">
                  <b class="accont_text_span">Remis - {{accountName}}</b>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-6">
                <span class="mr-4 accont_text_span">Bank Name:</span>
              </div>
              <div class="col-md-6 text-right">
                <b class="accont_text_span">{{bankName}}</b>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-6">
                <span class="mr-4 accont_text_span">Account Number:</span>
              </div>
              <div class="col-md-6 text-right">
                <b class="accont_text_span text-right">{{reservedAccount}}</b>
              </div>
            </div>
            <div class="mt-5">
              <div class="pay_header text-center">Your Wallet would be funded within the next few minutes. </div>
            </div>
          </div>
        </div>

        <div
          class="pattern_sec"
          :style="[
                {
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `linear-gradient(rgb(55, 15, 112 , 0.001), rgb(55, 15, 112 ,0.001)), url(${backImg})`,
                }
                ]"
        ></div>
      </div>
    </MasterLayout>
</template>