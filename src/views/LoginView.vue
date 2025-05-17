<script>
import Page from '@/components/Page.vue'
import authService from '@/services/authService';

export default{
    components: {Page},

    data(){
        return {
            login_input: '',
            password_input: '',
            loading: false,
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

            this.loading = true;
            authService.login(this.login_input, this.password_input)
                .catch( err => {
                    this.loading = false;
                    this.error_message = 'Identifiant ou mot de passe incorrect';
                })

        }
    }

}

</script>

<template>

    <Page title="Pay" subtitle="Connexion" :loading="loading">
        <div class="container">
            <section class="form">
            
                <div class="elm">
                    <label for="login">Identifiant</label>
                    <input type="text" id="login" class="input wide" tabindex="1" v-model="login_input" placeholder="Identifiant">
                </div>

                <div class="elm">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" class="input wide" tabindex="2" v-model="password_input" placeholder="Mot de passe">
                </div>

                <button class="btn btn-primary wide" id="submit" tabindex="3" @click="login()">Se connecter</button>

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