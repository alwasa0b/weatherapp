<template>
  <div>
    <div :class="{row: true, weather: true, hidden: location.city=='' }">
      <div class="row">
        <h1 class="col-md-4">{{location.city}}, {{location.state}} Weather</h1>
      </div>
     
      <div class="row" v-show="location.city!=''">
        <daily class="col" v-for="item in daily" :forecast="item" />
      </div>
       <div class="row">
        <h6 class="col-md-4 ml-md-auto">{{date.pretty}}</h6>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row  justify-content-center">
          <div class="col-4 input-group">
            <input class="form-control" type="number" v-model="zipcode" @keyup.enter="fetchTemp()" placeholder="enter a zipcode" />
            <button type="button" class="btn btn-primary btn-space" v-on:click="fetchTemp()">Update</button>
          </div>
        </div>
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
.btn-space {
  margin-left: 5px;
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
