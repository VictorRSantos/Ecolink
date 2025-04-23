namespace EcolinkAPI.Dtos
{
    public class EcopontoDto
    {
        public string Nome { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public string? Endereco { get; set; }
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public string? Cep { get; set; }
        public string Cnpj { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public List<int> MateriaisAceitos { get; set; } = new();

    }
}
