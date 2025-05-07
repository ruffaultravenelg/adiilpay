<script>
import Page from '@/components/Page.vue';

export default{
    components: {Page},
}

</script>

<template>

    <Page title="Page inconnu" subtitle="La page que vous cherchez n'existe pas" :loading="false">
        <div class="container">
            <RouterLink class="btn btn-primary" :to="{ name: 'dashboard' }"><i>home</i> Retour à l'accueil</RouterLink>
        </div>
    </Page>

</template>

<style scoped>

.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>