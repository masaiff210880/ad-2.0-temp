const DeviceDetector = require("node-device-detector");
const useragent = require("useragent");
const { lookup } = require("geoip-lite");
const requestIp = require("request-ip");
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false
});

module.exports.loginDevice = (req) => {
  const userAgentString = req.headers["user-agent"];
  const agent = useragent.parse(userAgentString);
  // Access the device type
  const deviceType = agent.device.toString();
  // Perform actions based on the device type
  let gadget;
  if (deviceType === "iPhone" || deviceType === "Android Phone") {
    gadget = `Mobile - ${deviceType}`;
  } else if (deviceType === "iPad" || deviceType === "Android Tablet") {
    gadget = `Tablet - ${deviceType}`;
  } else {
    gadget = `Laptop/Desktop`;
  }

  let ipAddress = requestIp.getClientIp(req);
  const device = detector.detect(req.get("User-Agent"));
  let deviceInfo = `${gadget} ${device.os.name} ${device.os.version} 
  ${device.client.name} ${device.device.brand} ${device.device.model}`;
  // windows 10 chrome
  let ipLocation = lookup(ipAddress);

  if (!ipAddress || ipAddress === null || ipAddress === undefined) {
    ipAddress = "0";
  }
  if (!deviceInfo || deviceInfo === null || deviceInfo === undefined) {
    deviceInfo = "0";
  }
  if (!ipLocation || ipLocation === null || ipLocation === undefined) {
    ipLocation = "0";
  }

  return { deviceInfo, ipAddress, ipLocation };
};
