<script>
import cardService from '@/services/cardService';
import toastMixin from '@/mixins/toastMixin';
import nfcService from '@/services/nfcService';
import loaderMixin from '@/mixins/loaderMixin';

export default{
    name: 'NewCardModal',
    emits: ['cardCreated'],
    mixins: [toastMixin, loaderMixin],
    
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

            this.showLoader();
            setTimeout(() => {
                this.hideLoader();
                this.toastSuccess('Carte créée avec succès !');
                this.close();

                if (nfcService.isNFCAvailable()){
                    //Do nfc
                } else {
                    this.$refs.noNfcModal.show();
                    this.close();
                }

            }, 1000);

            return;
            cardService.createCard({ label: this.tempCard.label })
                .then( card => {
                    this.hideLoader();
                    this.tempCard = card;
                    this.$emit('cardCreated', card);
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

    <!-- MAIN CREATION MODAL -->
    <CardModal :card="tempCard" ref="modal">
        <div class="form">
            
            <div class="elm">
                <label for="card_label">Label</label>
                
                <input type="text" id="card_label" class="input wide" placeholder="Nom Prénom" v-model="tempCard.label" required>
            </div>

            <div class="btns">
                <ButtonCancel label="Annuler" icon="close" @click="close" />
                <ButtonValidate label="Sauvegarder" icon="save" :disabled="!canSubmit" @click="create" />
            </div>

        </div>
    </CardModal>

    <!-- MODAL TO HANDLE NFC -->
    <NewCardNoNFC ref="noNfcModal" :cardId="tempCard.id" />

</template>

<style scoped>



</style>