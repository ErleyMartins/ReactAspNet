using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeralRepo, IAtividadeRepo
    {
        private readonly DataContext _context;
        public AtividadeRepo(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Atividade[]> GetAllAsync()
        {
            IQueryable<Atividade> query = _context.Atividades.AsNoTracking();
            query = query.OrderBy(atividade => atividade.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Atividade> GetByIdAsync(int id)
        {
            IQueryable<Atividade> query = _context.Atividades.AsNoTracking();
            query = query.Where(atividade => atividade.Id == id)
                         .OrderBy(atividade => atividade.Id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Atividade> GetByTituloAsync(string titulo)
        {
            IQueryable<Atividade> query = _context.Atividades.AsNoTracking();
            query = query.Where(atividade => atividade.Titulo == titulo)
                         .OrderBy(atividade => atividade.Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}