import { Client } from 'whatsapp-web.js';
import qrCode from 'qrcode-terminal';

const client = new Client();

client.on('qr', (qr) => {
    //Generate QR code and print on console
    qrCode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log("The client is ready");
});

client.initialize();

export default client;