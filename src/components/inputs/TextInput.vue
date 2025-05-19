<script>

export default{
    name: 'TextInput',
    emits: ['update:modelValue'],
    inheritAttrs: false,

    props: {
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        label: {
            type: String,
            required: false,
            default: null,
        }
    },

    data(){
        return {
            modelValue: '',
        };
    },

    watch: {
        modelValue(){
            this.$emit('update:modelValue', this.modelValue);
        }
    },

}

</script>

<template>

    <div v-if="label" class="elm">
        <label for="card_label">{{ label }}</label>
        <input type="text"
            :placeholder="placeholder"
            v-model="modelValue"
            v-bind="$attrs"
            :class="['input wide', $attrs.class]"
        />
    </div>

    <input v-else
        type="text"
        :placeholder="placeholder"
        v-model="modelValue"
        v-bind="$attrs"
        :class="['input wide', $attrs.class]"
    />


</template>