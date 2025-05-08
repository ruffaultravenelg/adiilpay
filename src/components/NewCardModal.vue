<script>
import cardService from '@/services/cardService';
import CardModal from './CardModal.vue';
import toastMixin from '@/mixins/toastMixin';

export default{
    name: 'NewCardModal',
    emits: ['cardCreated'],
    mixins: [toastMixin],

    components: {
        CardModal
    },
    
    data() {
        return {
            tempCard: {
                id: 'MFKEOSFPES',
                label: '',
                balance: 0,
            }
        };
    },

    methods: {
        
        show(){
            this.tempCard = {
                id: 'MFKEOSFPES',
                label: '',
                balance: 0,
            };
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
    <CardModal :card="tempCard" ref="modal">
        <div class="form">
            
            <div class="elm">
                <label for="card_label">Label</label>
                <input type="text" id="card_label" class="input wide" placeholder="Nom Prénom" v-model="tempCard.label" required>
            </div>

            <div class="btns">
                <button class="btn btn-red" @click="close"><i>close</i>Annuler</button>
                <button class="btn btn-green" @click="create" :disabled="!canSubmit"><i>save</i>Sauvegarder</button>
            </div>

        </div>
    </CardModal>
</template>

<style scoped>



</style>