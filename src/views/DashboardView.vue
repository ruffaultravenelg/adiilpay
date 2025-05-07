<script>
import Page from '@/components/Page.vue'
import Modal from '@/components/Modal.vue'

export default {

    components: {Page, Modal},

    data(){
        return {
            showModal: false,
            loading: false,
        }
    }

}
</script>

<template>

    <Page title="Pay" subtitle="Dashborad" :loading="loading">
        <button @click="showModal = true" class="btn-red">Popup</button>
        <button @click="loading = !loading" class="btn-red wide">change loading state</button>
    </Page>

    <Modal :visible="showModal">
        <h1>test</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button class="btn-red wide" @click="showModal = false">Fermer</button>
    </Modal>

</template>
