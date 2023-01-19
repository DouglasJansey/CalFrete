export default function inputMaskCep(value) {
    const input = value;
    if(!input) return '';
    return input.replace(/\D/g, "")
    .replace(/(\d{4})(\d{3})+\d?/, "$1-$2")
}