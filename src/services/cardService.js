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

}