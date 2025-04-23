using EcolinkAPI.Dtos;
using EcolinkAPI.Models;
using EcolinkAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcolinkAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuario _usuario;

        public UsuarioController(IUsuario usuario)
        {
            _usuario = usuario;
        }

        [HttpGet("ListarUsuarios")]
        public async Task<ActionResult<ResponseModel<List<UsuarioModel>>>> ListarUsuarios()
        {
            var usuarios = await _usuario.ListarUsuarios();

            return Ok(usuarios);
        }

        [HttpPost("CriarUsuario")]
        public async Task<ActionResult<ResponseModel<UsuarioModel>>> CriarUsuario(UsuarioCriacaoDto usuarioCriacaoDto)
        {
            if (usuarioCriacaoDto.Senha != usuarioCriacaoDto.ConfirmarSenha)
                return BadRequest("As senhas não coincidem.");

            //if (_context.Usuarios.Any(u => u.Email == dto.Email || u.Cnpj == dto.Cnpj))
            //    return BadRequest("Usuário já existe.");

            var usuario = await _usuario.CriarUsuario(usuarioCriacaoDto);

            if (usuario.Status)
                return Ok(usuario);

            return BadRequest(usuario);
        }


    }
}
