<script>

export default{
    name: 'ButtonPrimary',

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
        to:{
            type: Object,
            required: false,
            defualt: null,
        },
    },
}

</script>

<template>

    <RouterLink v-if="to" class="btn btn-primary" :to="to">
        <i v-if="icon">{{ icon }}</i>
        {{  label }}
    </RouterLink>

    <button v-else class="btn btn-primary">
        <i v-if="icon">{{ icon }}</i>
        {{ label }}
    </button>

</template>