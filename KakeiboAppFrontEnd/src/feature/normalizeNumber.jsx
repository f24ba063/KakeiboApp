
export default function normalizeNumber(value){
    let v = toHalfWidth(value);
    let num = v.replace(/[^0-9]/g, "");
    num = num.slice(0, 7);
    return {raw: v, num}
}

function toHalfWidth(str) {
    return str.replace(/[０-９]/g, s =>
        String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    );
}