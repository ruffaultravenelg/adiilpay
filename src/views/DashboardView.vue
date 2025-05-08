<script>
import Modal from '@/components/Modal.vue'
import dashboardService from '@/services/dashboardService'
import OrgaPage from '@/components/OrgaPage.vue'

export default {

    components: {OrgaPage, Modal},

    mounted(){
        dashboardService.getStatistics()
            .then(response => {
                this.loading = false
                console.log(response)
            })
            .catch(error => {
                this.loading = false
                console.error(error)
            })
    },

    data(){
        return {
            loading: true,
        }
    },

}
</script>

<template>
    <OrgaPage name="Dashborad" :loading="loading">
        <div class="container">
            
            <div></div>

            <div class="btn-container">
                <RouterLink tabindex="1" class="btn btn-item" :to="{ name: 'dashboard' }"><i>history</i>Dernières transactions</RouterLink>
                <RouterLink tabindex="2" class="btn btn-item" :to="{ name: 'cards' }"><i>account_balance</i>Voir toute les cartes</RouterLink>
                <RouterLink tabindex="3" class="btn btn-item" :to="{ name: 'dashboard' }"><i>edit</i>Modifier mon compte</RouterLink>
                <RouterLink tabindex="4" class="btn btn-item" :to="{ name: 'logout' }"><i>logout</i>Se déconnecter</RouterLink>
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