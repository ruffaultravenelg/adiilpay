<script>
import OrgaPage from '@/components/OrgaPage.vue';
import cardService from '@/services/cardService';
import { explodeLabel } from '@/utils/labelSplitter.js';
<<<<<<< HEAD
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'

export default{

    components: { OrgaPage, ButtonPrimary },
=======
import NewCardModal from '@/components/NewCardModal.vue';

export default{

    components: {OrgaPage, NewCardModal},
>>>>>>> 28d4ac09385f44904976eeec1a9bdf46b0653edf

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
            
        },


        newCard(){
            this.$refs.newCardModal.show();
        },

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
    <OrgaPage name="Liste des cartes" :loading="loading" noPadding>
        
        <div class="search">
            <input type="text" placeholder="Rechercher une carte" class="input wide" v-model="search" />
        </div>

        <div class="card-list">
            <RouterLink
                v-for="card in filteredCards"
                :key="card.id"
                class="btn btn-item"
                :to="{ name: 'card', params: { id: card.id } }"
            >
                <span>{{ card.lastname }}</span>{{ card.firstname }}
            </RouterLink>
        </div>

    </OrgaPage>

    <button class="btn btn-item only-icon new-btn" @click="newCard()"><i>add</i></button>

    <NewCardModal ref="newCardModal" @cardCreated="refreshCards" />

</template>

<style scoped>

.search{
    padding: 0 var(--padding);
    padding-bottom: 5px;
}

.card-list{
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: var(--padding) var(--padding) calc(var(--padding) * 3) var(--padding);
    overflow-y: auto;
}

.new-btn{
    position: absolute;
    bottom: var(--padding);
    right: var(--padding);
}


</style>