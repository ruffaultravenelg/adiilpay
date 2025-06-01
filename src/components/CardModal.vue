<script>

export default{
    name: 'CardModal',
    emits: ['close'],

    props: {
        card: {
            required: true,
        },
        closable: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        show(){
            this.$refs.modal.show();
        },
        close(){
            this.$refs.modal.close();
        },
    }
}

</script>

<template>
    <Modal ref="modal" @close="$emit('close')" :closable="closable"  noPadding>
        <Transition name="card" appear>
            <Card :card="card" class="card" v-show="$refs.modal?.showed"/>
        </Transition>
        <div class="spacer"></div>
        <div class="content-container">
            <slot></slot>
        </div>
    </Modal>
</template>

<style scoped>

.card{
    position: absolute;
    top: calc(-178px / 2);
    left: 50%;
    transform: translate(-50%, 0);
}

.spacer{
    width: 100%;
    height: calc(178px / 2);
}

.card-enter-active, .card-leave-active {
    transition: var(--animation-duration) ease;
}
.card-enter-from, .card-leave-to {
    transform: translate(-50%, 20px);
}
.card-enter-to, .card-leave-from {
    transform: translate(-50%, 0);
}

.content-container {
    width: 100%;
    max-height: calc(90dvh - 200px);
    overflow-y: auto;
    padding: 30px;
}

</style>