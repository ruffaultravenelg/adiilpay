<script>

export default{
    name: 'ButtonPrimary',

    props: {
        label: {
            type: String,
            required: false,
            default: '',
        },
        icon: {
            type: String,
            required: false,
            default: ''
        },
        to:{
            type: Object,
            required: false,
            defualt: null,
        },
        onlyIcon: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
}

</script>

<template>

    <RouterLink v-if="to" class="btn btn-primary" :to="to" :class="{ 'only-icon': onlyIcon }">
        <i v-if="icon">{{ icon }}</i>
        {{  label }}
    </RouterLink>

    <button v-else class="btn btn-primary" :class="{ 'only-icon': onlyIcon }">
        <i v-if="icon">{{ icon }}</i>
        {{ label }}
    </button>

</template>