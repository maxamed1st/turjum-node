export default function log(src: String, msg: any) {
  return console.log(new Date().toLocaleString("sv-SW"), src, "\n", msg);
}
