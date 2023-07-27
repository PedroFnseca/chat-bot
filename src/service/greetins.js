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
  const greetings = ['Olá', 'Oi', 'E aí'];
  
  const similarityScores = [];
  for (const greeting of greetings) {
    const greetingEmbedding = await getEmbedding([greeting]);
    const userMessageArray = getArrayFromTensor(userMessageEmbedding);
    const greetingArray = getArrayFromTensor(greetingEmbedding);
    
    const score = cosineSimilarity(userMessageArray, greetingArray).dataSync()[0];
    similarityScores.push(score);
  }

  const maxScoreIndex = similarityScores.indexOf(Math.max(...similarityScores));
  
  if (maxScoreIndex !== -1) {
    return 'Olá! Como posso ajudar?';
  } else {
    return 'Desculpe, não entendi o que você disse.';
  }
}

export {
  chatbotGreetins
}