<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model.trim="city"
          placeholder="Enter city name"
          class="search-input"
          @keyup.enter="searchByCity"
        />
        <button
          @click="searchByCity"
          class="search-button"
          :disabled="!city || loading"
        >
          {{ loading ? "Searching..." : "Search" }}
        </button>
      </div>
    </div>

    <main>
      <!-- 仅当拿到数据时渲染 -->
      <div v-if="weatherData" class="weather-card">
        <h2 class="place">
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>

        <div class="now">
          <img :src="iconUrl" alt="Weather Icon" class="icon" />
          <p class="temp">{{ Math.round(weatherData.main.temp) }} °C</p>
        </div>

        <span class="desc">{{ weatherData.weather[0].description }}</span>
      </div>

      <p v-else-if="error" class="error">Error: {{ error }}</p>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "17467aff8300acbb0d619487e37a62bd"; 

export default {
  name: "WeatherApp",
  data() {
    return {
      city: "",
      weatherData: null,
      loading: false,
      error: null,
    };
  },
  computed: {

    iconUrl() {
      if (!this.weatherData) return null;
      const icon = this.weatherData.weather?.[0]?.icon;
      return icon
        ? `https://openweathermap.org/img/wn/${icon}@2x.png`
        : null;
    },
  },
  mounted() {

    this.fetchCurrentLocationWeather();
  },
  methods: {
    async searchByCity() {
      if (!this.city) return;
      this.error = null;
      this.loading = true;
      this.weatherData = null;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city
      )}&appid=${apikey}&units=metric`;

      await this.fetchWeatherData(url);
      this.loading = false;
    },

    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) return;
      this.error = null;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
          this.loading = true;
          await this.fetchWeatherData(url);
          this.loading = false;
        },
        (err) => {
    
          console.warn("Geolocation error:", err?.message || err);
        }
      );
    },

    async fetchWeatherData(url) {
      try {
        const { data } = await axios.get(url, { timeout: 10000 });
        this.weatherData = data;
      } catch (e) {
        console.error("Error fetching weather data:", e);
        this.error =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to fetch weather data";
        this.weatherData = null;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.search-bar {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}
.search-input {
  width: 70%;
  max-width: 420px;
  padding: 10px 12px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  outline: none;
}
.search-input:focus {
  border-color: #6ea8fe;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
}
.search-button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #0d6efd;
  color: #fff;
  cursor: pointer;
}
.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.weather-card {
  margin-top: 24px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
}
.place {
  margin: 0 0 8px 0;
}
.now {
  display: flex;
  align-items: center;
  gap: 12px;
}
.icon {
  width: 72px;
  height: 72px;
}
.temp {
  font-size: 36px;
  margin: 0;
}
.desc {
  display: inline-block;
  margin-top: 8px;
  text-transform: capitalize;
  color: #374151;
}
.error {
  color: #b42318;
  margin-top: 16px;
}
</style>
