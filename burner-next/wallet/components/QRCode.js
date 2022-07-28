import { QRCodeSVG } from "qrcode.react";

const QRCode = ({ value }) => {
  return <QRCodeSVG value={value} />;
};

export default QRCode;
