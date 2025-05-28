<script>
import toastMixin from '@/mixins/toastMixin';
import cardService from '@/services/cardService';
import { explodeLabel } from '@/utils/labelSplitter.js';
import loaderMixin from '@/mixins/loaderMixin';

export default {

    mixins: [toastMixin, loaderMixin],

    data() {
        return {
            card: null,
        }
    },

    mounted() {

        this.showLoader();
        cardService.getCard(this.cardId)
            .then( card => {
                this.card = card 
                this.$refs.modal.show();
            })
            .catch( e => this.toastCatch(e) )
            .finally( () => this.hideLoader() );
        
    },

    methods: {
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
    },

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
    }

}

</script>

<template>

    <OrgaPage :name="firstname">
    </OrgaPage>

    <CardModal
        ref="modal"
        :card="card"
        @close="$router.go(-1)"
    >
        <div class="btn-container">
            <ItemButton tabindex="1" label="Ajouter une dépense" icon="add" :to="{ name: 'dashboard' }" />
            <ItemButton tabindex="2" label="Créditer le compte" icon="savings" :to="{ name: 'dashboard' }" />
            <ItemButton tabindex="2" label="Voir toutes les transactions" icon="receipt_long" :to="{ name: 'dashboard' }" />
            <ItemButton tabindex="2" label="Réatribuer la carte" icon="recycling" :to="{ name: 'dashboard' }" />
            <ItemButton tabindex="2" label="Désactiver la carte" icon="link_off" @click="$refs.deleteModal.show()" />
        </div>
    </CardModal>

    <ValidateModal ref="deleteModal" @validated="deleteCard"/>

</template>

<style scoped>

.btn-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

</style>