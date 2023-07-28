import chatbotGreetins from "../service/greetins.js";

import { Router } from "express";
const bot = Router();

let isInUse = false;

//Initialize whatsappWeb
import client from './client.js';

const contacts = [
    "Pedrow",
    "Arturo Avenidas"
];

//Messages response
client.on('message', async (message) => {
    try {
        const contactReceived = await message.getContact();

        //Designed response
        let response;

        //Foreach contact it verifies if contact.name send message
        contacts.forEach(async contact => {
            if (contactReceived.name == contact) {
                if (message.body.toUpperCase() == "!BOT") {
                    isInUse = !isInUse;
                    isInUse ? message.reply("*Bot habilitado*") : message.reply("*Bot desabilitado*");

                    return;
                } else if (isInUse) {
                    response = await chatbotGreetins(message.body);
                    message.reply(response);

                    //Se não receber mensagem ele desativa o bot em 60 segundos
                    setTimeout(() => { isInUse = false }, 60000);
                }
            }
        });

        console.log("Contato: ", contactReceived.name);
        console.log("mensagem: ", message.body);
        console.log("resposta: ", response);
        console.log("\n\n");
    } catch (error) {
        console.log(error);
    }
});