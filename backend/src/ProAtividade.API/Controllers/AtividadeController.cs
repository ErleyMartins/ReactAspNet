using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get() 
        {
            try
            {
                IQueryable<Atividade> query =_context.Atividades.AsNoTracking();

                return Ok(await query.OrderBy(atividade => atividade.Id).ToArrayAsync());
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) 
        {
            try
            {
                IQueryable<Atividade> query =_context.Atividades.AsNoTracking();

                return Ok(await query.Where(atividade => atividade.Id == id)
                                     .OrderByDescending(atividade => atividade.Id)
                                     .FirstOrDefaultAsync());
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade atividade) 
        {
            try
            {
                if (atividade == null) return BadRequest("Não é possível adicionar uma atividade nula.");

                _context.Add<Atividade>(atividade);
                if (await _context.SaveChangesAsync() <= 0) throw new Exception("Ocorre um erro ao salvar a atividade");

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(Atividade atividade) 
        {
            try
            {
                if (atividade == null) return BadRequest("Não é possível atualizar uma atividade nula.");
                else if (atividade.Id <= 0) return BadRequest("É necessario informar um id para atualizar");
               
                _context.Update<Atividade>(atividade);
        
                if(await _context.SaveChangesAsync() <= 0) throw new Exception("Ocorre um erro ao realizar a atualização da atividade");

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) 
        {
            try
            {
                if (id <= 0) return BadRequest("É necessario informar um id para excluir");
               
                IQueryable<Atividade> query =_context.Atividades.AsNoTracking();
                var atividade = await query.Where(atividade => atividade.Id == id)
                                     .OrderBy(atividade => atividade.Id)
                                     .FirstOrDefaultAsync();

                _context.Remove(atividade);
                
                return Ok(await _context.SaveChangesAsync() > 0);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}