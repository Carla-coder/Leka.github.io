const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

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
            expiresIn: 3600 
        });

        usuario.token = token;

        return res.json({ nome: usuario.nome, chave: usuario.chave, token: usuario.token });
    } else {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
};

const create = async (req, res) => {
    try {
        const { nome, email, telefone, senha } = req.body;

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

        const chave = crypto.randomBytes(16).toString('hex');

        const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha,
                chave: chave
            }
        });

        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(req.params.id, 10)
            },
            select: {
                nome: true,
                id: true
            }
        });
        return res.json(usuario);
    } else {
        const usuarios = await prisma.usuario.findMany({
            select: {
                nome: true,
                id: true
            }
        });
        return res.json(usuarios);
    }
};

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

const perfil = async (req, res) => {
    try {
        const usuarioId = req.user.id;
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioId,
            },
        });

        if (usuario) {
            const { senha, ...usuarioSemSenha } = usuario;
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
