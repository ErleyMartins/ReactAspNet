using System.Threading.Tasks;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AddAtividade(Atividade atividade);
        Task<Atividade> UpdateAtividade(Atividade atividade);
        Task<bool> DeleteAtividade(int id);
        Task<bool> ConcluirAtividade(Atividade atividade);
        Task<Atividade[]> GetAllAtividadeAsync();
        Task<Atividade> GetByIdAtividadeAsync(int id);
    }
}