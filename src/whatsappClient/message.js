import { Router } from "express";
import chatbotGreetins from "../service/greetins.js";

const bot = Router();

//Inicializa o cliente whatsapp e importa o client
import client from './client.js';

client.on('message', async (message) => {
    //console.log(message);
    //const response = await chatbotGreetins(message);
    //await message.reply(await chatbotGreetins(message));

    const userData = await message.caption;
    const chat = await message.getChat();

    try {
        console.log("mensagem: ", message.body);
        const response = await chatbotGreetins(message.body);
        console.log("resposta: ", response);

        if (message.author == 'Pedrow') {
            await message.reply(response);
        } else if
            (
            chat.name == 'União Kwaipee express' &&
            chat.getContact().name == 'Pedrow' ||
            chat.getContact().isMe()
        ) {
            await message.reply(response);
        }
    } catch (error) {
        console.log(error);
    }
});