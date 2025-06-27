const UAParser = require('ua-parser-js');

module.exports = userAgent => {
	const parser = new UAParser(userAgent || '');
	const device = parser.getDevice();
	const os = parser.getOS();
	const browser = parser.getBrowser();

	const deviceType = device.type || 'desktop';
	const osName = os.name || 'unknown OS';
	const osVersion = os.version || '';
	const browserName = browser.name || 'unknown browser';
	const browserVersion = browser.version || '';

	const deviceInfo = `${deviceType} | ${osName} ${osVersion} | ${browserName} ${browserVersion}`.trim();

	return deviceInfo;
};
