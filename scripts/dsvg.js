/*

    dsvg.js - Dynamic SVG loader

    This script loads SVG files dynamically and replaces dsvg tags with the loaded SVG content.
    It able to control properties of the svg via css like `fill`.

*/
document.addEventListener('DOMContentLoaded', ()=>{

    const dsvgs = document.getElementsByTagName('dsvg');
    
    for (let dsvg of dsvgs) {

        if (!dsvg.hasAttribute('src'))
            throw new Error('dsvg tag must have a src attribute');

        const src = dsvg.getAttribute('src');
        fetch(src)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch SVG: ${response.statusText}`);
                }
                return response.text();
            })
            .then(svgContent => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                const svgElement = svgDoc.documentElement;
                if (dsvg.hasAttribute('id'))
                    svgElement.setAttribute('id', dsvg.getAttribute('id'));
                if (dsvg.hasAttribute('class'))
                    svgElement.setAttribute('class', dsvg.getAttribute('class'));
                dsvg.replaceWith(svgElement);
            })
            .catch(error => {
                console.error('Error loading SVG:', error);
            });

    }
    
})

/*
    Load SVG file and return the SVG element
    Used in code for dynamic elements
    @param {string} src - The path to the SVG file
*/
export async function loadSVG(src) {

    const response = await fetch(src);
    if (!response.ok)
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
    const svgContent = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    return svgDoc.documentElement;

}