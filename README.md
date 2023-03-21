# NAPAS qrcode

A package to create qr code for fund transfer between VietNam banks with [NAPAS standard](https://vietqr.net/)

# Installation

Using npm:

```
$ npm install --save napas-qr
```

# Quick start

```js
const napasQR = require('napas-qr');

const qrProps = {
  qrType: 'DYNAMIC', // STATIC
  bin: '970416',
  receiverNumber: '224123456',
  instrumentType: 'ACCOUNT', // CARD
  amount: 10000,
  orderId: 'NPS6869',
  description: 'TRANSFER TO SOMEONE'
};

const qrContent = napasQR.generateQRContent(qrProps);
// 00020101021138570010A00000072701270006970403011200110123456780208QRIBFTTA53037045802VN6304
```

You also can generate qr image by using package [`qrcode`](https://www.npmjs.com/package/qrcode)

```js
const qr = require('qrcode');

qr.toFile(
  'qr.png',
  qrContent,
  {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  },
  function (err) {
    if (err) throw err;
    console.log('QR code created!');
  }
);
```

## QR Properties

| Params         | Type   | Required | Description                                           |
| -------------- | ------ | -------- | ----------------------------------------------------- |
| qrType         | String | Yes\*    | Type of QR to generate. Enums = ['STATIC', 'DYNAMIC'] |
| bin            | String | Yes\*    | Bank bin                                              |
| receiverNumber | String | Yes\*    | Account number or card number                         |
| instrumentType | String | Yes\*    | Value of receiver number. Enums = ['ACCOUNT', 'CARD'] |
| amount         | Number | Optional | Amount. Optional if `qrType` = 'STATIC'               |
| orderId        | String | Optional | Order id                                              |
| description    | String | Optional | Description                                           |
