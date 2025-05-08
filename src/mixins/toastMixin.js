import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    methods: {
        toastSuccess(message = 'Succès !') {
            toast.success(message, {
                autoClose: 3000,
            });
        },
        toastError(message = 'Une erreur est survenue.') {
            toast.error(message, {
                autoClose: 3000,
            });
        },

        toastCatch(err){
            this.toastError(err.message || 'Une erreur est survenue.');
        }
    },
};
