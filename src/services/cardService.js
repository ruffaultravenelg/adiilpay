import { GET } from "@/utils/rest";

export default {

    getCards(){
        return GET('/cards');
    }

}