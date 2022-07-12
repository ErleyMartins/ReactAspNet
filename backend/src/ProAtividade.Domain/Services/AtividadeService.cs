using System;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo, IGeralRepo geralRepo)
        {
            _atividadeRepo = atividadeRepo;
        }

        public async Task<Atividade> AddAtividade(Atividade atividade)
        {
            if (await _atividadeRepo.GetByTituloAsync(atividade.Titulo) != null) throw new Exception("Já existe uma atividade com o mesmo título");
            else if (await _atividadeRepo.GetByIdAsync(atividade.Id) != null) throw new Exception("Você esta tentando adicionar uma atividade já existente.");

            _atividadeRepo.Add<Atividade>(atividade);

            if (!await _atividadeRepo.SaveAsChangesAsync()) throw new Exception("Ocorreu um erro ao gravar a atividade no banco de dados.");

            return atividade;
        }

        public async Task<bool> ConcluirAtividade(Atividade atividade)
        {
            if (atividade == null) throw new Exception("Atividade não informada. É necessário informar uma atividade para conclui-la");

            atividade.Concluir();

            _atividadeRepo.Update<Atividade>(atividade);

            return await _atividadeRepo.SaveAsChangesAsync();
        }

        public async Task<bool> DeleteAtividade(int id)
        {
            Atividade atividade = await _atividadeRepo.GetByIdAsync(id);

            if (atividade == null) throw new Exception("A atividade que você tentou deletar não existe");

            _atividadeRepo.Delete<Atividade>(atividade);

            return await _atividadeRepo.SaveAsChangesAsync();
        }

        public async Task<Atividade[]> GetAllAtividadeAsync()
        {
            try
            {
                return await _atividadeRepo.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Atividade> GetByIdAtividadeAsync(int id)
        {
            try
            {
                return await _atividadeRepo.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Atividade> UpdateAtividade(Atividade atividade)
        {
            if (atividade.DataConclusao != null) throw new Exception("Não é possível alterar uma atividade já concluida.");
            else if (await _atividadeRepo.GetByIdAsync(atividade.Id) == null) throw new Exception("Você esta tentando atualizar uma atividade não cadastrada no banco de dados.");
            
            _atividadeRepo.Update<Atividade>(atividade);

            if (!await _atividadeRepo.SaveAsChangesAsync()) throw new Exception("Ocorreu um erro ao atualizar a atividade no banco de dados.");

            return atividade;
        }
    }
}