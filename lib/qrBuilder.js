const constant = require('../constant');

function buildQRProps({ qrType, bin, receiverNumber, instrumentType, amount, orderId, description }) {
  const qrProperties = {
    payloadFormatIndicator: {
      id: '00',
      value: '01'
    },
    pointOfInitiationMethod: {
      id: '01',
      value: constant.QR_TYPE[qrType]
    },
    merchantAccountInformation: {
      id: '38',
      value: {
        guid: {
          id: '00',
          value: 'A000000727'
        },
        paymentNetwork: {
          id: '01',
          value: {
            beneficiaryId: {
              id: '00',
              value: bin
            },
            receiverNumber: {
              id: '01',
              value: receiverNumber
            }
          }
        },
        servicesCode: {
          id: '02',
          value: constant.INSTRUMENT_TYPE[instrumentType]
        }
      }
    },
    transactionCurrency: {
      id: '53',
      value: '704'
    },
    transactionAmount: {
      id: '54',
      value: amount
    },
    countryCode: {
      id: '58',
      value: 'VN'
    },
    additionalDataFieldTemplate: {
      id: '62',
      value: {
        order: {
          id: '01',
          value: orderId
        },
        purposeOfTx: {
          id: '08',
          value: description
        }
      }
    }
  };
  return qrProperties;
};

module.exports = {
  buildQRProps
};
