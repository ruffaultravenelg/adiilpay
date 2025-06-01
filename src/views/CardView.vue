<script>
import toastMixin from '@/mixins/toastMixin';
import cardService from '@/services/cardService';
import { explodeLabel } from '@/utils/labelSplitter.js';
import loaderMixin from '@/mixins/loaderMixin';

export default {

    mixins: [toastMixin, loaderMixin],

    computed: {
        cardId(){
            return this.$route.params.id;
        },
        firstname(){
            return this.card ? explodeLabel(this.card.label).firstname : '';
        },
        lastname(){
            return this.card ? explodeLabel(this.card.label).lastname : '';
        },
    },

    data() {
        return {
            card: null,

            addDepense_value: 0,
            creditCard_value: 0,
        }
    },

    mounted() {
        this.refreshCard()
            .then( this.$refs.modal.show )
    },

    methods: {

        refreshCard(){
            this.showLoader();
            return cardService.getCard(this.cardId)
                .then( card => this.card = card )
                .catch( e => this.toastCatch(e) )
                .finally( this.hideLoader );
        },

        deleteCard(){
            this.showLoader();
            cardService.nukeCard(this.card.id)
                .then(() => {
                    this.$router.push({ name: 'cards' });
                    this.toastSuccess('Carte supprimée avec succès !');
                })
                .catch( e => this.toastCatch(e) )
                .finally( () => this.hideLoader() );
        
        },

        closePage(){
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                this.$router.push({ name: 'cards' });
            }
        },
  
        showAddDepense(){
            this.addDepense_value = null;
            this.$refs.addDepenseModal.show();
        },

        addDepense(){
            this.showLoader();
            cardService.addDepense(this.card.id, this.addDepense_value)
                .then( () => {
                    this.toastSuccess('Dépense ajoutée avec succès !');
                    this.refreshCard();
                })
                .catch( e => this.toastCatch(e) )
                .finally( this.hideLoader );
        },

        showCreditCard(){
            this.creditCard_value = null;
            this.$refs.creditCardModal.show();
        },

        creditCard(){
            this.showLoader();
            cardService.creditCard(this.card.id, this.creditCard_value)
                .then( () => {
                    this.toastSuccess('Carte créditée avec succès !');
                    this.refreshCard();
                })
                .catch( e => this.toastCatch(e) )
                .finally( this.hideLoader );
        },

    },

}

</script>

<template>

    <!-- MAIN PAGE BACKGROUND -->
    <OrgaPage :name="firstname">
    </OrgaPage>

    <!-- MAIN PAGE CONTENT -->
    <CardModal
        ref="modal"
        :card="card"
        @close="closePage()"
    >
        <div class="btn-container">
            <ItemButton tabindex="1" label="Ajouter une dépense" icon="add" @click="showAddDepense()" />
            <ItemButton tabindex="2" label="Créditer le compte" icon="savings" @click="showCreditCard()" />
            <ItemButton tabindex="2" label="Voir toutes les transactions" icon="receipt_long" :to="{ name: 'dashboard' }" />
            <ItemButton tabindex="2" label="Réatribuer la carte" icon="recycling" :to="{ name: 'dashboard' }" />
            <ItemButton tabindex="2" label="Désactiver la carte" icon="link_off" @click="$refs.deleteModal.show()" />
        </div>
    </CardModal>

    <!-- VALIDATE SUPPRESSION -->
    <ValidateModal ref="deleteModal" @validated="deleteCard"/>

    <!-- ADD DEPENSE MODAL -->
    <ValidateModal
        ref="addDepenseModal"
        title="Ajouter une dépense"
        details="Spécifier le montant à retirer de la carte"
        @validated="addDepense()"
    >
        <TextInput type="number" placeholder="1,25" v-model="addDepense_value" min="0" tabindex="1" />
    </ValidateModal>
    
    <!-- CREDIT CARD MODAL -->
    <ValidateModal
        ref="creditCardModal"
        title="Créditer la carte"
        details="Spécifier le montant à créditer sur la carte"
        @validated="creditCard()"
    >
        <TextInput type="number" placeholder="5" v-model="creditCard_value" min="0" tabindex="1" />
    </ValidateModal>

</template>

<style scoped>

.btn-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

</style>