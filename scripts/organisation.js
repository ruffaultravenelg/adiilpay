// Set colors
document.documentElement.style.setProperty('--primary-color', localStorage.getItem('org_primary'));
document.documentElement.style.setProperty('--secondary-color-lighter', localStorage.getItem('org_secondary'));

// Set name
document.addEventListener('DOMContentLoaded', () => {

    const organisation_name = document.querySelector('section.top > h2');
    if (organisation_name)
        organisation_name.textContent = localStorage.getItem('org_name');

});
