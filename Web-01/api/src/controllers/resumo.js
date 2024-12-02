const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para obter todos os resumos
const getSummaries = async (req, res) => {
  try {
    const summaries = await prisma.summary.findMany();  // Busca todos os resumos
    res.json(summaries);  // Retorna os resumos em formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summaries' });
  }
};

// Função para obter um resumo específico (para edição)
const getSummaryById = async (req, res) => {
  const { id } = req.params;
  try {
    const summary = await prisma.summary.findUnique({
      where: { id: parseInt(id) }
    });

    if (!summary) {
      return res.status(404).json({ error: 'Summary not found' });
    }

    res.json(summary);  // Retorna o resumo específico
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};


// Função para criar um novo resumo
const createSummary = async (req, res) => {
  const { title, description, summary } = req.body;  // Pega os dados do corpo da requisição
  try {
    const newSummary = await prisma.summary.create({
      data: { title, description, summary }  // Cria um novo resumo
    });
    res.status(201).json(newSummary);  // Retorna o novo resumo criado
  } catch (error) {
    res.status(500).json({ error: 'Failed to create summary' });
  }
};

// Função para editar um resumo existente
const updateSummary = async (req, res) => {
  const { id } = req.params;
  const { title, description, summary } = req.body;

  if (!title || !description || !summary) {
    return res.status(400).json({ error: 'Title, description, and summary are required' });
  }

  try {
    // Verifique se o resumo existe antes de tentar atualizar
    const existingSummary = await prisma.summary.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingSummary) {
      return res.status(404).json({ error: 'Summary not found' });
    }

    const updatedSummary = await prisma.summary.update({
      where: { id: parseInt(id) },
      data: { title, description, summary }
    });

    res.json(updatedSummary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update summary' });
  }
};

// Função para deletar um resumo
const deleteSummary = async (req, res) => {
  const { id } = req.params;  // Pega o ID do resumo da URL
  try {
    await prisma.summary.delete({
      where: { id: parseInt(id) }  // Exclui o resumo pelo ID
    });
    res.status(200).json({ message: 'Summary deleted successfully' });  // Retorna uma mensagem de sucesso
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete summary' });
  }
};

module.exports = { getSummaries, createSummary, updateSummary, deleteSummary, getSummaryById };
