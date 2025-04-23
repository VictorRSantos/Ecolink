using EcolinkAPI.Dtos;
using EcolinkAPI.Models;

namespace EcolinkAPI.Services
{
    public interface IUsuario
    {
        Task<ResponseModel<List<UsuarioModel>>> ListarUsuarios();
        Task<ResponseModel<UsuarioModel>> BuscarUsuarioPorId(int idUsuario);
        Task<ResponseModel<UsuarioModel>> CriarUsuario(UsuarioCriacaoDto usuarioCriacaoDto);
        Task<ResponseModel<UsuarioModel>> EditarUsuario(UsuarioEdicaoDto usuarioEdicaoDto);
        Task<ResponseModel<UsuarioModel>> ExcluirUsuario(int idUsuario);
    }
}
