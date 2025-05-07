<script>
export default {
    name: 'Modal',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>

    <!-- Background -->
    <transition name="fade" appear="true">
        <div v-show="visible" class="background">
        
            <!-- Modal -->
            <transition name="modal" appear="true">
                <div v-show="visible" class="modal-container">
                    <slot></slot>
                </div>
            </transition>
    
        </div>
    </transition>
  

</template>

<style scoped>

/* Background */
.background {
    position: fixed;
    z-index: 100;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Modal */
.modal-container {
    position: absolute;
    z-index: 101;
    bottom: 0;
    background-color: var(--color-white);
    padding: 30px;
    width: 100%;
    max-width: var(--max-width);
    border-radius: 30px 30px 0 0;
    box-shadow: var(--shadow);
}

.modal-enter-from {
    transform: translateY(50px);
}
.modal-enter-active{
    transition: var(--animation-duration) ease;
}
.modal-enter-to {
    transform: translateY(0px);
}

.modal-leave-from {
    transform: translateY(0px);
}
.modal-leave-active {
    transition: var(--animation-duration) ease;
}
.modal-leave-to {
    transform: translateY(50px);
}

</style>
