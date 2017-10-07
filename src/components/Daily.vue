<template>
    <div class="forecast-block">
        <p>{{ forecast.day }}</p>
        <img :src="forecast.icon_url" alt="" width="42" height="42">
        <p>{{ forecast.text }}</p>
    </div>
</template>

<script>
export default {
    name: 'Daily',
    props: ['forecast']
}
</script>

<style scoped>
    .forecast-block {
        color: #ececec;
        margin: 5px;
    }
</style>
