import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { ErrorCredenciaisInvalidas } from "../errors/ErrorCredenciaisInvalidas";
import { ErrorDadosIncompletos } from "../errors/ErrorDadosIncompletos";

export class AuthService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository;        
    }

    async login(dados: any) {
        const { email, senha } = dados;

        if (!email || !senha) {
            throw new ErrorDadosIncompletos([
                { field: "email, senha", issue: "Ausentes" }
            ]);
        };

        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw new ErrorCredenciaisInvalidas();
        };

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            throw new ErrorCredenciaisInvalidas();
        };

        const secret = process.env.JWT_SECRET || 'super_secreto_desenvolvimento';
        const expiresIn = '1d';

        const token = jwt.sign (
            { id: usuario.id, perfil: usuario.perfil },
            secret,
            { expiresIn }
        );

        return {
            accessToken: token,
            tokenType: "Bearer",
            expiresIn: 86400,
            user: this.mapearUsuario(usuario)
        };
    };

    mapearUsuario(usuario: any) {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfil: usuario.perfil
        }
    }
};
