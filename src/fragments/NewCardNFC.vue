<script>
import loaderMixin from '@/mixins/loaderMixin';
import toastMixin from '@/mixins/toastMixin';
import nfcService from '@/services/nfcService';

export default{

    mixins: [toastMixin, loaderMixin],
    
    props: {
        cardUrl: {
            type: String,
            default: null,
        },
    },

    data(){
        return {
            trying: true,
            title: "Écriture de la carte",
            text: "Rapprochez la carte de l'arrière de votre téléphone pour l'écrire.",
            finished: false,
        }
    },

    methods: {
        
        show(){
            this.$refs.modal.show();
            this.trying = true;
            this.finished = false;
            setTimeout(this.tryWrite, 700);
        },

        close(){
            this.$refs.modal.close();
        },

        tryWrite(){
            this.trying = true;
            this.showLoader();
            nfcService.writeNFC(this.cardUrl)
                .then(() => {
                    this.toastSuccess('Carte écrite avec succès !');
                    this.finished = true;
                })
                .catch(e => {
                    this.title = "Une erreur c'est produite.";
                    this.text = e.message;
                })
                .finally( () => {
                    this.hideLoader();
                    this.trying = false;
                });
        },

    },

    computed: {
        canSubmit() {
            return this.tempCard.label.length > 0;
        },
    },

}

</script>

<template>
    <Modal ref="modal" :closable="false">

        <template v-if="!finished">
            <p class="title">{{ title }}</p>
            <p class="subtitle">{{ text }}</p>

            <video v-if="trying" src="@/assets/images/nfc_write.webm" autoplay muted loop playsinline></video>
            <ButtonPrimary v-else class="wide" icon="nfc" label="Réessayer" @click="tryWrite"/>
        </template>

        <template v-else>
            <p class="title">Tout est bon ! </p>
            <p class="subtitle">La carte est prête à être utilisée</p>

            <ButtonPrimary class="wide" icon="check" label="Fermer" @click="close()"/>
        </template>

    </Modal>
</template>

<style scoped>

.id-link{
    padding: 15px;
    background-color: #DDDDDD;
    line-height: 50px;
    border-radius: 10px;
    margin-bottom: 20px;
    height: calc(2 * 15px + 48px);
}

.copy-btn{
    float: right;
}

video{
    width: 100%;
    height: auto;
}

</style>