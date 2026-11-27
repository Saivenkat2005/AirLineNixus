const fs = require('fs');
const path = require('path');

const screenshotsDir = 'screenshots';

function getBase64Image(filename) {
  const filepath = path.join(screenshotsDir, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`Warning: Screenshot ${filepath} does not exist!`);
    return '';
  }
  const ext = path.extname(filename).replace('.', '');
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  const data = fs.readFileSync(filepath).toString('base64');
  return `data:${mime};base64,${data}`;
}

module.exports = {
  cabinSeatHold: getBase64Image('cabin-seat-hold.png'),
  boardingPass: getBase64Image('boarding-pass.png'),
  notifications: getBase64Image('notifications.png'),
  cabin3d: getBase64Image('cabin-3d.png'),
  flightRadar: getBase64Image('flight-radar.png'),
  aiQualityDeepEval: getBase64Image('ai-quality-deepeval.png'),
  aiQualityPromptfoo: getBase64Image('ai-quality-promptfoo.png'),
  aiQualityRagas: getBase64Image('ai-quality-ragas.png'),
  aiBookingRecovery: getBase64Image('ai-booking-recovery.png'),
  aiTravelCopilot: getBase64Image('ai-travel-copilot.png'),
  passengerDashboard: getBase64Image('passenger-dashboard.png'),
  operationsHealth: getBase64Image('operations-health.png')
};
