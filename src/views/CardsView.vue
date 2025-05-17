<script>
import OrgaPage from '@/components/OrgaPage.vue';
import cardService from '@/services/cardService';
import { explodeLabel } from '@/utils/labelSplitter.js';
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'

export default{

    components: { OrgaPage, ButtonPrimary },

    data(){
        return {
            cards: [],
            loading: true,
            search: '',
        }
    },

    mounted(){
        this.refreshCards();
    },

    methods:{

        refreshCards(){
            this.loading = true;

            cardService.getCards()
                .then( data =>{

                    this.cards = data.map(card => {
                        const { firstname, lastname } = explodeLabel(card.label);
                        return {
                            ...card,
                            firstname,
                            lastname,
                        }
                    });

                })
                .finally( () => this.loading = false );
            
        }

    },

    computed: {
        filteredCards(){
            const search_term = this.search.toLowerCase();
            return this.cards.filter(card => 
                (card.id + ' ' + card.date + ' ' + card.label).toLowerCase().includes(search_term)
            );
        }
    }

}

</script>

<template>
    <OrgaPage name="Liste des cartes" :loading="loading">
        
        <input type="text" placeholder="Rechercher une carte" class="input wide" v-model="search" />

        <ButtonPrimary label="bonjour" />
        <ButtonPrimary label="bonjour" icon="add" />
        <div class="card-list">
            <button v-for="card in filteredCards" :key="card.id" class="btn btn-item">
                <span>{{ card.lastname }}</span>{{ card.firstname }}
            </button>
        </div>

    </OrgaPage>
</template>

<style scoped>

.card-list{
    margin-top: var(--padding);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}


</style>