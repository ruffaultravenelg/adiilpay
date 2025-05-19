<script>

export default{
    name: 'ItemButton',

    props: {
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: false,
            default: ''
        },
        span: {
            type: String,
            required: false,
            default: null,
        },
        to:{
            type: Object,
            required: false,
            defualt: null,
        },
        noArrow:{
            type: Boolean,
            required: false,
            default: false,
        },
    },
}

</script>

<template>

    <RouterLink v-if="to" class="btn btn-item" :to="to" :class="{ 'no-arrow': noArrow }">
        <i v-if="icon">{{ icon }}</i>
        <span v-if="span">{{ span }}</span>
        {{  label }}
    </RouterLink>
    
    <button v-else class="btn btn-item" :class="{ 'no-arrow': noArrow }">
        <i v-if="icon">{{ icon }}</i>
        <span v-if="span">{{ span }}</span>
        {{ label }}
    </button>


</template>