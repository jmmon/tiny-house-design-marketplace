export default function ToText(node) {
    let tag = document.createElement('div');
    tag.innerHtml = node;
    node = tag.innerText;
    return node;
}