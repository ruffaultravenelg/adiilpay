<script>

export default{
    name: 'ButtonValidate',

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
    <button class="btn btn-green">
        <i v-if="icon">{{ icon }}</i>
        {{ label }}
    </button>
</template>