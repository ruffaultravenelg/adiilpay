<script>

export default{
    name: 'IconButton',

    props: {
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

    <RouterLink v-if="to" class="btn btn-item only-icon" :to="to">
        <i v-if="icon">{{ icon }}</i>
    </RouterLink>
    
    <button v-else class="btn btn-item only-icon">
        <i v-if="icon">{{ icon }}</i>
    </button>

</template>