<script>
import orgaService from '@/services/orgaService';
import Loader from './Loader.vue';

export default {

    name: 'OrgaPage',
    components: {Loader},

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
    
    <Loader :loading="loading" />

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
    padding: 0 var(--padding) calc(var(--padding) - 5px) var(--padding);
}

.page{
    padding: var(--padding);
    padding-top: 5px !important;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.page.no-padding{
    padding: 0;
}

/* BACK BUTTON */
.back-btn{
    position: fixed;
    top: var(--padding);
    left: var(--padding);
}

</style>