const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Importa o módulo crypto
require('dotenv').config();

// Função de login
const login = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findFirst({
        where: {
            email: email,
            senha: senha
        }
    });
    
    if (usuario) {
        const token = jwt.sign({ id: usuario.id }, process.env.KEY, {
            expiresIn: 3600 // expira em uma hora
        });
        
        usuario.token = token;
        
        // Aqui retornamos o nome e a chave
        return res.json({ nome: usuario.nome, chave: usuario.chave, token: usuario.token });
    } else {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
};


// Função de criação de usuário
const create = async (req, res) => {
    try {
        const { nome, email, telefone, senha } = req.body;

        // Verifica se o nome, email ou telefone já estão em uso
        const usuarioExistente = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { nome: nome },
                    { email: email },
                    { telefone: telefone }
                ]
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({ message: 'Nome, email ou telefone já estão em uso' });
        }

        // Gerando uma chave aleatória
        const chave = crypto.randomBytes(16).toString('hex'); // Gera uma chave de 32 caracteres (16 bytes em hexadecimal)

        // Log para depuração: Verifica os dados antes de tentar salvar no banco
        console.log('Dados recebidos para criação do usuário:', { nome, email, telefone, senha, chave });

        // Criação do novo usuário com a chave aleatória
        const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha,
                chave: chave
            }
        });

        // Log para verificar se o usuário foi criado com sucesso
        console.log('Usuário criado com sucesso:', usuario);

        return res.status(201).json(usuario);
    } catch (error) {
        // Log para depuração do erro
        console.error('Erro ao criar usuário:', error);
        return res.status(400).json({ message: error.message });
    }
};

// Função para leitura de usuário
const read = async (req, res) => {
    if (req.params.id !== undefined) {
        // Consulta para um único usuário, retornando nome e id (não mais a chave)
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(req.params.id, 10)
            },
            select: {
                nome: true,
                id: true  // Mudança aqui, substituindo 'chave' por 'id'
            }
        });
        return res.json(usuario);
    } else {
        // Consulta para todos os usuários, retornando nome e id (não mais a chave)
        const usuarios = await prisma.usuario.findMany({
            select: {
                nome: true,
                id: true  // Mudança aqui, substituindo 'chave' por 'id'
            }
        });
        return res.json(usuarios);
    }
};


// Função de atualização de usuário
const update = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.update({
            where: {
                id: parseInt(id, 10)
            },
            data: req.body
        });
        return res.status(202).json(usuario);
    } catch (error) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
};

// Função de exclusão de usuário
const del = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.usuario.delete({
            where: {
                id: parseInt(id, 10)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
};

// Função para exibição do perfil do usuário
const perfil = async (req, res) => {
    try {
        const usuarioId = req.user.id; // id do usuário que está no token JWT
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioId,
            },
        });

        if (usuario) {
            const { senha, ...usuarioSemSenha } = usuario; // Não retorne a senha
            return res.json(usuarioSemSenha);
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Erro ao carregar perfil", error: error.message });
    }
};



module.exports = {
    login,
    create,
    perfil,
    read,
    update,
    del
};
