const QRCode = require('qrcode')
const fs = require('fs')
const AdmZip = require('adm-zip')

exports.index = (_, res) => {
  res.render('index')
}
exports.store = (req, res) => {
  console.log(req.body)
  const { nik } = req.body
  const nikLists = nik.split(' ')
  const pathFile = fs.readdirSync('./public/image')
  if (pathFile.length !== 0) {
    pathFile.forEach((item) => fs.unlinkSync(`./public/image/${item}`))
  }
  nikLists.map((item) => {
    QRCode.toFile('./public/image/' + item + '.png', item, {
      width: 500,
    })
  })
  res.json({ success: 'Berhasil generate qr-code. silahkan klik download' })
}
exports.downloaded = (_, res) => {
  const pathFile = fs.readdirSync('./public/image')

  if (pathFile.length !== 0) {
    const zip = new AdmZip()
    for (let i = 0; i < pathFile.length; i++) {
      zip.addLocalFile(`./public/image/${pathFile[i]}`)
    }
    // Define zip file name
    const downloadName = `./qrzip/qr-generated.zip`

    const data = zip.toBuffer()

    // save file zip in root directory
    zip.writeZip('./public/' + downloadName)

    // code to download zip file

    res.set('Content-Type', 'application/octet-stream')
    res.set('Content-Disposition', `attachment; filename=${downloadName}`)
    res.set('Content-Length', data.length)
    res.download('./public/qrzip/qr-generated.zip')
    pathFile.forEach((item) => fs.unlinkSync(`./public/image/${item}`))
  } else {
    res.send('Tidak ada file didownload')
  }
}
