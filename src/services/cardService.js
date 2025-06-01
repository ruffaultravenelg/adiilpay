import { GET, POST, DELETE } from "@/utils/rest";

export default {

    getCards(){
        return GET('/cards');
    },

    getCard(id){
        return GET(`/cards/${id}`);
    },

    nukeCard(id){
        return DELETE(`/cards/${id}/nuke`);
    },

    createCard(card){
        return POST('/cards', card);
    },

    addDepense(cardId, amount, description = 'Achat'){
        return POST(`/card/${cardId}/transactions`, {
            amount: -amount,
            description,
            type: 'PAYMENT'
        });
    },

    creditCard(cardId, amount, description = 'Crédit'){
        return POST(`/card/${cardId}/transactions`, {
            amount: +amount,
            description,
            type: 'DEPOSIT'
        });
    },

}