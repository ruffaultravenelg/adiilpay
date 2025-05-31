<script>

export default{

    name: 'ValidateModal',
    emits: ['validated'],
    
    props: {
        title: {
            type: String,
            required: false,
            default: 'Êtes vous sûr ?'
        },
        details: {
            type: String,
            required: false,
            default: 'Cette action est irreversible.'
        },
        cancel: {
            type: String,
            required: false,
            default: 'Annuler'
        },
        validate: {
            type: String,
            required: false,
            default: 'Confirmer'
        },
        focusRef: {
            type: String,
            required: false,
            default: null
        },
    },

    data(){
        return {
            hermes: null,
        }
    },

    methods: {
        show(data) {
            this.hermes = data;
            this.$refs.modal.show();
            if (this.focusRef) {
                this.$nextTick(() => {
                    console.log(this.focusRef)
                    const focusElement = this.$refs[this.focusRef];
                    if (focusElement && focusElement.$el) {
                        focusElement.$el.focus();
                    }
                });
            }
        },

        close() {
            this.$refs.modal.close();
        },

        validateClicked() {
            this.$emit('validated', this.hermes);
            this.close();
        }
    },

}

</script>

<template>
    <Modal ref="modal">
        <p class="title">{{ title }}</p>
        <p class="subtitle">{{ details }}</p>
        <slot></slot>
        <div class="btns">
            <ButtonCancel :label="cancel" icon="close" @click="close" />
            <ButtonValidate :label="validate" icon="check" @click="validateClicked" />
        </div>
    </Modal>
</template>

<style scoped>
.btns{
    margin-top: 20px;
}
</style>