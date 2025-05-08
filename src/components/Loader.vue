<script>
export default{
    name: 'Loader',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
    },
}
</script>

<template>
    <div v-if="loading" class="loader"></div>
</template>

<style scoped>

/* LOADER */
.loader {
    z-index: 105;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100vw;
    --c: no-repeat linear-gradient(var(--color-primary) 0 0);
    background: var(--c),var(--c),var(--color-primary-lighter);
    background-size: 60% 100%;
    animation: l16 2s infinite;
}
@keyframes l16 {
    0%   {background-position:-150% 0,-150% 0}
    66%  {background-position: 250% 0,-150% 0}
    100% {background-position: 250% 0, 250% 0}
}

</style>