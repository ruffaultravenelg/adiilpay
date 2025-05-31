<script>
import toastMixin from '@/mixins/toastMixin';

export default{

    mixins: [toastMixin],
    
    props: {
        cardUrl: {
            type: String,
            default: null,
        },
    },

    methods: {
        
        show(){
            this.$refs.modal.show();
        },

        close(){
            this.$refs.modal.close();
        },

        copyCardId(){
            navigator.clipboard.writeText(this.cardUrl)
                .then(() => this.toastSuccess('ID de la carte copié dans le presse-papiers !'))
                .catch(e => this.toastCatch(e));
        }

    },

    computed: {
        canSubmit() {
            return this.tempCard.label.length > 0;
        }
    },

}

</script>

<template>
    <Modal ref="modal" :closable="false">
      
        <p class="title">NFC non supporté</p>
        <p class="subtitle">Modifier le contenu de la carte NFC manuellement pour y mettre l'adresse suivante :</p>
        <p v-if="cardUrl" class="id-link">
            {{ cardUrl }}
            <ButtonPrimary icon="content_copy" only-icon class="copy-btn" @click="copyCardId"/>
        </p>

        <ButtonPrimary icon="home" class="wide" label="Fermer" @click="close()" />

    </Modal>
</template>

<style scoped>

.id-link{
    padding: 15px;
    background-color: #DDDDDD;
    line-height: 50px;
    border-radius: 10px;
    margin-bottom: 20px;
    height: calc(2 * 15px + 48px);
    position: relative;
    overflow: hidden;
}

.copy-btn{
    position: absolute;
    top: 15px;
    right: 15px;
}

</style>