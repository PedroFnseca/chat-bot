import { Router } from "express";
import chatbotGreetins from "../service/greetins.js";

const bot = Router();

//Inicializa o cliente whatsapp e importa o client
import client from './client.js';

client.on('message', async (message) => {
    try {
        console.log("mensagem: ", message.body);
        const response = await chatbotGreetins(message.body);
        console.log("resposta: ", response);

        const contact = await message.getContact();

        //console.log("é user: ", contact.isUser);
        //console.log(contact);

        if(contact.name == "Pedrow")
        {
            message.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
});