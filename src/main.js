import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuex from "vuex";
import VueResource from "vue-resource";

Vue.use(VueResource);
Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    zipcode: "",
    weatherData: {},
    geoData: {}
  },
  getters: {
    zipcode: state => {
      return state.zipcode;
    },
    forecast: state => {
      if (!state.weatherData.forecast) return {};
      let {
        fcttext,
        icon_url,
        icon
      } = state.weatherData.forecast.txt_forecast.forecastday[0];
      return {
        text: fcttext,
        icon_url: icon_url,
        icon: icon
      };
    },
    daily: state => {
      if (!state.weatherData.forecast) return { text: "" };
      return state.weatherData.forecast.txt_forecast.forecastday.map(f => ({
        text: f.fcttext,
        icon_url: f.icon_url,
        icon: f.icon,
        day: f.title
      }));
    },
    location: state => {
      if (!state.geoData.location) return { city: "" };
      return {
        city: state.geoData.location.city,
        state: state.geoData.location.state
      };
    },
    date: state => {
      if (!state.weatherData.forecast) return { pretty: "" };
      return {
        pretty:
          state.weatherData.forecast.simpleforecast.forecastday[0].date.pretty
      };
    }
  },
  mutations: {
    updateZip(state, zipcode) {
      state.zipcode = zipcode;
    },
    tempRecieved(state, weatherData) {
      state.weatherData = weatherData;
    },
    geoLookupRecieved(state, geoData) {
      state.geoData = geoData;
    }
  },
  actions: {
    fetchTemp: (context, zip) => {
      context.dispatch("fetchGeoData", zip);
      return Vue.http
        .get(
          `http://api.wunderground.com/api/417b110532ce7d2f/forecast/q/${context
            .state.zipcode}.json`
        )
        .then(
          response => {
            context.commit("tempRecieved", response.body);
          },
          response => {
            alert("something went wrong");
          }
        );
    },
    fetchGeoData: (context, zip) => {
      return Vue.http
        .get(
          `http://api.wunderground.com/api/417b110532ce7d2f/geolookup/q/${context
            .state.zipcode}.json`
        )
        .then(
          response => {
            context.commit("geoLookupRecieved", response.body);
          },
          response => {
            alert("something went wrong");
          }
        );
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
