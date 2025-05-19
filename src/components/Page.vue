<script>
export default {

    name: 'Page',
    components: {},

    props: {
        title: {
            type: String,
            required: false,
            default: 'Pay'
        },
        subtitle: {
            type: String,
            required: false,
            default: 'Prepaid cards'
        }
    },

}
</script>

<template>

    <div class="container">

        <p class="title">{{ title }}</p>
        <h1 class="subtitle">{{ subtitle }}</h1>

        <div class="page">
            <slot></slot>
        </div>

    </div>

</template>

<style scoped>

/* PAGE */
.container{
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
}

.title{
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-black);
    width: 100%;
    text-align: center;
    padding: var(--padding) var(--padding) 0 var(--padding);
}

.subtitle{
    font-size: 1.2rem;
    font-weight: normal;
    color: var(--color-black);
    width: 100%;
    text-align: center;
    padding: 0 var(--padding);
}

.page{
    padding: var(--padding);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

</style>