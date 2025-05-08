import { GET, POST, DELETE } from "@/utils/rest";

export default {

    getCards(){
        return GET('/cards');
    },

    getCard(id){
        return GET(`/cards/${id}`);
    },

    deleteCard(id){
        return DELETE(`/cards/${id}`);
    },

    createCard(card){
        return POST('/cards', card);
    },

}