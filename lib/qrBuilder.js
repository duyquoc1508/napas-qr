const { QR_TYPE, ATM_CARD_NUMBER_PREFIX, INSTRUMENT_TYPE } = require('../constant');

function isBankCard(receiverNumber = '') {
	return receiverNumber.startsWith(ATM_CARD_NUMBER_PREFIX) && (receiverNumber.length === 16 || receiverNumber.length === 19);
}

function buildQRProps({ qrType, bin, receiverNumber, instrumentType, amount, orderId, description }) {
  const qrProperties = {
    payloadFormatIndicator: {
      id: '00',
      value: '01'
    },
    pointOfInitiationMethod: {
      id: '01',
      value: QR_TYPE[qrType]
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
          value: isBankCard(receiverNumber) ? INSTRUMENT_TYPE.CARD : INSTRUMENT_TYPE.ACCOUNT
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
