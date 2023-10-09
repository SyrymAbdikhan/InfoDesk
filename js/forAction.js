
function openLink(element) {
    window.open(element.previousElementSibling.value, 'blank');
}

function copyLink(element) {
    navigator.clipboard.writeText(element.previousElementSibling.previousElementSibling.value);
    element.setAttribute('data-tooltip', 'copied');
    setTimeout(() => {element.removeAttribute('data-tooltip')}, 1500);
}
