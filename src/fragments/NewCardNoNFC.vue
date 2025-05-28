<script>
import cardService from '@/services/cardService';
import toastMixin from '@/mixins/toastMixin';

export default{
    name: 'NewCardModal',
    emits: ['cardCreated'],
    mixins: [toastMixin],
    
    props: {
        cardId: {
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

        create(){
            cardService.createCard({ label: this.tempCard.label })
                .then(() => {
                    this.$emit('cardCreated', this.tempCard);
                    this.toastSuccess('Carte créée avec succès !');
                    this.close();
                })
                .catch( e => this.toastCatch(e) );
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

        <p v-if="cardId" class="link">
            {{ cardId }}
            <i>content_copy</i>
        </p>

        <ButtonPrimary icon="home" label="Retour au dashboard" :to="{ name: 'dashboard' }" />

    </Modal>
</template>

<style scoped>

.link{
    padding: 10px;
    background-color: var(--color-secondary);
    border-radius: 5px;
}


</style>