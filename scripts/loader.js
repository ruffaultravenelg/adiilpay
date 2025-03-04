function getLoader(){

    const loader = document.getElementById('loader');

    if (loader) return loader;

    const loaderDiv = document.createElement('div');
    loaderDiv.innerHTML = `
        <div id="loader">
    `
    loaderDiv.hidden = true;
    document.body.appendChild(loaderDiv);
    return loaderDiv;

}

export function showLoader(){

    const loader = getLoader();
    loader.hidden = false;

}

export function hideLoader(){

    const loader = getLoader();
    loader.hidden = true;

}