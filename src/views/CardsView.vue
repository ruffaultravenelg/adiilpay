<script>
import OrgaPage from '@/components/OrgaPage.vue';
import cardService from '@/services/cardService';
import { explodeLabel } from '@/utils/labelSplitter.js';
import NewCardModal from '@/components/NewCardModal.vue';
import ItemButton from '@/components/inputs/ItemButton.vue';
import IconButton from '@/components/inputs/IconButton.vue';
import loaderMixin from '@/mixins/loaderMixin';
import TextInput from '@/components/inputs/TextInput.vue';

export default{

    components: {OrgaPage, NewCardModal, ItemButton, IconButton, TextInput},
    mixins: [loaderMixin],

    data(){
        return {
            cards: [],
            search: '',
        }
    },

    mounted(){
        this.refreshCards();
    },

    methods:{

        refreshCards(){
            this.showLoader();

            cardService.getCards()
                .then( data =>{
                    console.log(data)
                    this.cards = data.map(card => {
                        const { firstname, lastname } = explodeLabel(card.label);
                        return {
                            ...card,
                            firstname,
                            lastname,
                        }
                    });

                })
                .finally( () => this.hideLoader() );
            
        },


        newCard(){
            this.$refs.newCardModal.show();
        },

    },

    computed: {
        filteredCards(){
            const search_term = this.search.toLowerCase().trim();
            return this.cards.filter(card => 
                (card.id + ' ' + card.date + ' ' + card.label).toLowerCase().includes(search_term)
            );
        }
    }

}

</script>

<template>
    <OrgaPage name="Liste des cartes" noPadding>
        
        <div class="search">
            <TextInput placeholder="Recehrcher une carte" v-model="search" class="no-shadow"/>
        </div>

        <div class="card-list">
            <ItemButton
                v-for="card in filteredCards"
                :key="card.id"
                :to="{ name: 'card', params: { id: card.id } }"
                :label="card.firstname"
                :span="card.lastname"
            />
        </div>

    </OrgaPage>

    <IconButton icon="add" class="new-btn" @click="newCard()" />

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
    scrollbar-width: none;
}

.new-btn{
    position: absolute;
    bottom: var(--padding);
    right: var(--padding);
}


</style>