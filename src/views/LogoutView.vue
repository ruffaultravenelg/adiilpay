<script>
import authService from '@/services/authService';

export default {

    mounted() {
        authService.logout();
    },

}

</script>

<template>

</template>