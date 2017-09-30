<template>
    <div>
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

</style>
