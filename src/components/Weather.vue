
<template>
  <div>
    <div class="wv-input-wrapper">
      <div class="col">
        <div class="row  justify-content-center wv-header-bar ">
          <img src="../../images/logo.png" height="42" />
          <div class="col-4 input-group">
            <input class="form-control wv-input" type="number" v-model="zipcode" @keyup.enter="fetchTemp()" placeholder="enter a zipcode" />
            <button type="button" class="btn wv-button" v-on:click="fetchTemp()">Update</button>
          </div>
        </div>
      </div>
    </div>
    <div :class="{row: true, weather: true, hidden: location.city=='' }">
      <div class="wv-header-wrapper">
        <div class="wv-header ">{{location.city}}, {{location.state}} Weather</div>
        <div class="wv-date">{{date.pretty}}</div>
      </div>

      <div class="row" v-show="location.city!=''">
        <daily class="col" v-for="item in daily" :forecast="item" />
      </div>
      <div class="row wv-footer">
        <div>Brought to you by WeatherVue, Inc.</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Forecast from './Forecast.vue'
import Daily from './Daily.vue'

export default {
  components: { Forecast, Daily },
  methods: mapActions([
    'fetchTemp'
  ]),
  computed: {
    zipcode: {
      get() {
        return this.$store.state.zipcode
      },
      set(value) {
        this.$store.commit('updateZip', value)
      }
    },
    ...mapGetters([
      'location',
      'daily',
      'forecast',
      'date'
    ])
  }
}
</script>

<style scoped>

.wv-button {
  border: 1px solid #bbbbbb;
  background-color: transparent;
  border-radius: 0px;
  color: #bbbbbb;
  font-family: "roboto";
  margin-left: 5px;
}

.wv-button:hover {
  background-color: rgba(232, 226, 226, 0.18);
}

.wv-header-bar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  padding: 5px;
  z-index: 1000;
}

.wv-input {
  border-radius: 0px;
}

.wv-header-wrapper {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border-bottom: 1px solid #bbbbbb;
  margin-bottom: 5px;
}

.wv-header {
  color: #bbbbbb;
  font-family: "roboto-thin";
  font-size: 3em;
  width: 100%;
  flex: 1;
}

.wv-footer {
  border-top: 1px solid #bbbbbb;
  color: #bbbbbb;
  font-family: "roboto-thin";
  flex-direction: row-reverse;
  width: 100%;
}

.wv-date {
  color: #bbbbbb;
  font-family: "roboto-thin";
  align-items: end;
}

.wv-input-wrapper {
  display: flex;
  flex-direction: row;
  margin: 10px;
}

.weather {
  display: block;
  height: 500px;
}

.weather.hidden {
  visibility: hidden;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
