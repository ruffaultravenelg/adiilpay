<script>
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import Page from '@/components/Page.vue'
import loaderMixin from '@/mixins/loaderMixin';
import authService from '@/services/authService';

export default{
    components: {Page, ButtonPrimary, TextInput},
    mixins: [loaderMixin],

    data(){
        return {
            login_input: '',
            password_input: '',
            error_message: '',
        }
    },

    mounted(){

        if (authService.isConnected())
            this.$router.push({ name: 'dashboard' });

    },

    methods: {
        login(){

            if (!this.login_input || !this.password_input){
                this.error_message = 'Veuillez remplir tous les champs';
                return;
            }

            this.showLoader();
            authService.login(this.login_input, this.password_input)
                .catch( err => {
                    this.hideLoader();
                    this.error_message = 'Identifiant ou mot de passe incorrect';
                })

        }
    }

}

</script>

<template>

    <Page title="Pay" subtitle="Connexion">
        <div class="container">
            <section class="form">
            
                <div class="elm">
                    <label for="login">Identifiant</label>
                    <TextInput id="login" tabindex="1" v-model="login_input" placeholder="Identifiant"/>
                </div>

                <div class="elm">
                    <label for="password">Mot de passe</label>
                    <TextInput type="password" id="password" tabindex="2" v-model="password_input" placeholder="Mot de passe" />
                </div>

                <ButtonPrimary class="wide" tabindex="3" @click="login()" label="Se connecter" />

                <p class="error_message">{{ error_message }}</p>

            </section>

            <section class="create">
                <RouterLink class="link" :to="{ name: 'create-organisation' }" tabindex="4">Créer une organisation</RouterLink>
            </section>
        </div>
    </Page>

</template>

<style scoped>

.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.error_message{
    color: #f00;
    font-size: 0.9rem;
    text-align: center;
}

</style>