export function stripAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .normalize("NFC");
}
