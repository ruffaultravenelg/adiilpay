import { GET } from "@/utils/rest.js";

export default{

    /**
     * Get the statistics of the transactions.
     * @returns {Promise<Object>} The statistics of the transactions.
     */
    getStatistics(){
        return GET('/transactions/statistics');
    }    

}