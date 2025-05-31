<script>
export default {
    name: 'TextInput',
    emits: ['update:modelValue'],
    inheritAttrs: false,

    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        type: {
            type: String,
            required: false,
            default: 'text',
        },
    },
    methods: {
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<template>
    <div v-if="label" class="elm">
        <label for="card_label">{{ label }}</label>
        <input
            :type="type"
            :placeholder="placeholder"
            :class="['input wide', $attrs.class]"
            :value="modelValue"
            @input="onInput"
            v-bind="$attrs"
        />
    </div>

    <input v-else
        :type="type"
        :placeholder="placeholder"
        :class="['input wide', $attrs.class]"
        :value="modelValue"
        @input="onInput"
        v-bind="$attrs"
    />
</template>