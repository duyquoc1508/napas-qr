const crc = require('crc');

function calculateCRC(data) {
  // Convert data to buffer
  const buffer = Buffer.from(data, 'utf8');
  // Calculate the CRC
  const result = crc.crc16ccitt(buffer, 0xffff);
  // Convert the CRC to hex string
  return result.toString(16).padStart(4, '0');
}

module.exports = { calculateCRC };
