import tf from "@tensorflow/tfjs";
import use from "@tensorflow-models/universal-sentence-encoder";

let useModel;

// Carregando o modelo Universal Sentence Encoder
use.load().then((model) => {
  useModel = model;
  console.log('Modelo Universal Sentence Encoder carregado.');
});

function getEmbedding(text) {
  return useModel.embed(text);
}

// Function to calculate the cosine similarity between two vectors
function cosineSimilarity(a, b) {
  const dotProduct = tf.dot(a, b);
  const normA = tf.norm(a);
  const normB = tf.norm(b);
  return dotProduct.div(normA.mul(normB));
}

// Extract the 1D array from a tensor
function getArrayFromTensor(tensor) {
  return tensor.arraySync()[0];
}

// Example of how to use the model to find the response
async function chatbotGreetins(userMessage) {
  const userMessageEmbedding = await getEmbedding([userMessage]);
  const greetings = ['Olá', 'Oi', 'E aí', 'Tudo bem?', 'Como vai?', 'Bom dia', 'Boa tarde', 'Boa noite', 'salve', 'beleza'];
  const sensitivity = 0.65;
  
  const similarityScores = [];
  for (const greeting of greetings) {
    const greetingEmbedding = await getEmbedding([greeting]);
    const userMessageArray = getArrayFromTensor(userMessageEmbedding);
    const greetingArray = getArrayFromTensor(greetingEmbedding);
    
    const score = cosineSimilarity(userMessageArray, greetingArray).dataSync()[0];
    similarityScores.push(score);
  }

  const maxScore = Math.max(...similarityScores)

  console.table({
    'User Message': userMessage,
    'Max Score': maxScore,
    'Sensitivity': sensitivity
  })

  if (maxScore > sensitivity) {
    const possibleResponses = [
      'Olá! Como posso ajudar?',
      'Oi! Como posso ajudar?',
      'E aí! Como posso ajudar?',
      'Tudo bem? Como posso ajudar?',
      'Como vai? Como posso ajudar?',
      'Bom dia! Como posso ajudar?',
      'Boa tarde! Como posso ajudar?',
      'Boa noite! Como posso ajudar?',
      'Salve! Como posso ajudar?',
      'Beleza! Como posso ajudar?'
    ];

    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  } else {
    const possibleResponses = [
      'Desculpe, não entendi o que você disse.',
      'Não entendi, poderia repetir?',
      'Não entendi, poderia falar de outra forma?',
      'Não entendi, poderia falar de outra maneira?',
    ];

    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  }
}

export {
  chatbotGreetins
}