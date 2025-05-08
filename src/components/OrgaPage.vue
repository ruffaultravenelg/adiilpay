<script>
import orgaService from '@/services/orgaService';


export default {

    name: 'OrgaPage',

    data(){
        return{
            orgaName: orgaService.getName(),
        }
    },

    props: {
        name: {
            type: String,
            required: false,
            default: 'Pay'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        noPadding: {
            type: Boolean,
            required: false,
            default: false
        },
    },

}
</script>

<template>

    <div class="container">

        <p class="title">{{ orgaName }}</p>
        <h1 class="subtitle">{{ name }}</h1>

        <div :class="'page' + (noPadding ? ' no-padding' : '')">
            <slot></slot>
        </div>

    </div>

    <button
        class="btn btn-item only-icon back-btn"
        @click="$router.go(-1)"
    >
        <i>chevron_left</i>
    </button>
    
    <div v-if="loading" class="loader"></div>

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
    padding: 0 var(--padding) var(--padding) var(--padding);
}

.page{
    padding: var(--padding);
    padding-top: 0;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.page.no-padding{
    padding: 0;
}

/* LOADER */
.loader {
    z-index: 105;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 4px;
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

/* BACK BUTTON */
.back-btn{
    position: fixed;
    top: var(--padding);
    left: var(--padding);
}

</style>