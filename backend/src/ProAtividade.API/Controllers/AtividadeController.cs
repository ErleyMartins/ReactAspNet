using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService _atividadeService;

        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get() 
        {
            try
            {
                return Ok(await _atividadeService.GetAllAtividadeAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) 
        {
            try
            {
                Atividade atividade = await _atividadeService.GetByIdAtividadeAsync(id);
                
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
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

                atividade = await _atividadeService.AddAtividade(atividade);
                if (atividade == null) throw new Exception("Ocorreu um erro ao gravar uma nova atividade");
                
                return Ok(atividade);
            }
            catch (Exception ex)
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
               
                atividade = await _atividadeService.UpdateAtividade(atividade);
                if (atividade == null) throw new Exception("Ocorreu um erro ao atualizar uma nova atividade");

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) 
        {
            try
            {
                if (id <= 0) return BadRequest("É necessario informar uma atividade para excluir");

                return Ok(new { sucesso = await _atividadeService.DeleteAtividade(id) });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}