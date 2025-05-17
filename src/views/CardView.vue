<script>
import OrgaPage from '@/components/OrgaPage.vue';
import CardModal from '@/components/CardModal.vue';
import toastMixin from '@/mixins/toastMixin';
import cardService from '@/services/cardService';
import { explodeLabel } from '@/utils/labelSplitter.js';

export default {

    components: {OrgaPage, CardModal},
    mixins: [toastMixin],

    data() {
        return {
            card: null,
            loading: true,
        }
    },

    mounted() {

        cardService.getCard(this.cardId)
            .then( card => {
                this.card = card 
                this.$refs.modal.show();
            })
            .catch( e => this.toastCatch(e) )
            .finally( () => this.loading = false );
        
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
    <OrgaPage :name="firstname" :loading="loading">
    </OrgaPage>
    <CardModal
        ref="modal"
        :card="card"
        @close="$router.go(-1)"
    >
        fe
    </CardModal>
</template>

<style scoped>

</style>