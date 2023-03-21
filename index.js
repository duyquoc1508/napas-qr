const { calculateCRC } = require('./lib/CRCCalculator');
const { buildQRProps } = require('./lib/qrBuilder');
const { generateRawQRString } = require('./lib/qrStringGenerator');
const constant = require('./constant');

function generateQRContent(qrRawData = {}) {
  // fill data to qrProps structure
  const qrProperties = buildQRProps(qrRawData);
  // generate qr string don't have checksum
  const rawQRString = generateRawQRString(qrProperties);
  const qrContentNoChecksum = rawQRString + constant.CRC_ID + constant.CRC_LENGTH;
  const checksum = calculateCRC(qrContentNoChecksum);
  // add CRC ID, length, value
  const qrContent = qrContentNoChecksum + checksum.toUpperCase();
  return qrContent;
}

module.exports = { generateQRContent };
