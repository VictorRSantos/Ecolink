using EcolinkAPI.Data;
using EcolinkAPI.Dtos;
using EcolinkAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcolinkAPI.Services
{
    public class UsuarioServices : IUsuario
    {
        private readonly AppDbContext _context;

        public UsuarioServices(AppDbContext context)
        {
            _context = context;
        }

        public Task<ResponseModel<UsuarioModel>> BuscarUsuarioPorId(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseModel<UsuarioModel>> CriarUsuario(UsuarioCriacaoDto usuarioCriacaoDto)
        {
            ResponseModel<UsuarioModel> resposta = new ResponseModel<UsuarioModel>();

            try
            {   
                var usuario = new UsuarioModel
                {
                    NomeCompleto = usuarioCriacaoDto.NomeCompleto,
                    Email = usuarioCriacaoDto.Email,
                    SenhaHash = PasswordService.GerarHash(usuarioCriacaoDto.Senha),
                    Cnpj = usuarioCriacaoDto.Cnpj
                };

                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                resposta.Dados = usuario;
                resposta.Mensagem = "Usuário criado com sucesso.";

                return resposta;
            }
            catch (Exception e)
            {
                resposta.Mensagem = e.Message;
                resposta.Status = false;
                return resposta;
            }
        }

        public Task<ResponseModel<UsuarioModel>> EditarUsuario(UsuarioEdicaoDto usuarioEdicaoDto)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel<UsuarioModel>> ExcluirUsuario(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseModel<List<UsuarioModel>>> ListarUsuarios()
        {
            ResponseModel<List<UsuarioModel>> resposta = new ResponseModel<List<UsuarioModel>>();

            try
            {
                var usuarios = await _context.Usuarios.ToListAsync();
                resposta.Dados = usuarios;
                resposta.Mensagem = "Lista de usuários obtida com sucesso.";

                return resposta;
            }
            catch (Exception e)
            {
                resposta.Mensagem = e.Message;
                resposta.Status = false;
                return resposta;
            }
        }
    }
}
