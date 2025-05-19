<script>
import Modal from '@/components/Modal.vue'
import dashboardService from '@/services/dashboardService'
import OrgaPage from '@/components/OrgaPage.vue'
import ItemButton from '@/components/inputs/ItemButton.vue'
import toastMixin from '@/mixins/toastMixin'
import loaderMixin from '@/mixins/loaderMixin'

export default {

    components: {OrgaPage, Modal, ItemButton},
    mixins: [toastMixin, loaderMixin],

    mounted(){
        this.showLoader();
        dashboardService.getStatistics()
            .then(res => {
                this.hideLoader();
            })
            .catch( e => this.toastCatch(e) )
    },

    data(){
        return {
            loading: true,
        }
    },

}
</script>

<template>
    <OrgaPage name="Dashborad">
        <div class="container">
            
            <div></div>

            <div class="btn-container">
                <ItemButton tabindex="1" label="Dernières transactions" icon="history" :to="{ name: 'dashboard' }" />
                <ItemButton tabindex="2" label="Voir toute les cartes" icon="account_balance" :to="{ name: 'cards' }" />
                <ItemButton tabindex="3" label="Modifier mon compte" icon="edit" :to="{ name: 'dashboard' }" />
                <ItemButton tabindex="4" label="Se déconnecter" icon="logout" :to="{ name: 'logout' }" />
            </div>

        </div>
    </OrgaPage>
</template>

<style scoped>

.container{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.btn-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

</style>