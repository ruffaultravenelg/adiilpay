<script>

export default{
    name: 'ButtonPrimary',

    props: {
        label: {
            type: String,
            required: false,
            default: 'Pay'
        },
        icon: {
            type: String,
            required: false,
            default: ''
        }
    },
}

</script>

<template>
    <button class="btn btn-primary">
        <i v-if="icon">{{ icon }}</i>
        {{ label }}
    </button>
</template>