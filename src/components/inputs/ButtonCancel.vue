<script>

export default{
    name: 'ButtonCancel',

    props: {
        label: {
            type: String,
            required: true,
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
    <button class="btn btn-red">
        <i v-if="icon">{{ icon }}</i>
        {{ label }}
    </button>
</template>