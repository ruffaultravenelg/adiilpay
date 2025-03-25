export function explodeLabel(label){
    let firstname, lastname;
    if (label.includes(' ')) {
        lastname = label.split(' ')[0];
        firstname = label.split(' ')[1];
    }
    else {
        lastname = label;
        firstname = '';
    }
    return {firstname, lastname};
}