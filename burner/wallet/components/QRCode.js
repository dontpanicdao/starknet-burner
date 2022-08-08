import { QRCodeSVG } from "qrcode.react";

const QRCode = ({ value }) => {
  return <QRCodeSVG value={value} size={200} />;
};

export default QRCode;
