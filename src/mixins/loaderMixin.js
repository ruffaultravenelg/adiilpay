export default{
    methods: {
        
        showLoader(){
            const loader = '<div class="bar-loader"></div>';
            document.body.insertAdjacentHTML('beforeend', loader);
        },

        hideLoader(){
            const loaders = document.querySelectorAll('.bar-loader');
            loaders.forEach(loader => {
                loader.remove();
            });
        }

    }
}