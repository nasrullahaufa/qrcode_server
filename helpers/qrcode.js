
const QRCode = require('qrcode') 

async function generateQR(url) {
console.log('server')
  let qrLink;

  await QRCode.toDataURL(url, function (err, url) {
    console.log(url,'cb')
    qrLink=url
  })
    console.log(qrLink)
  return qrLink;
}
module.exports = generateQR;
