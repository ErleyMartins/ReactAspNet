import React, { useEffect, useState } from 'react'

const atividadeInicial = {
  id: 0,
  titulo: '',
  prioridade: '0',
  descricao: ''
}

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.atividadeSelecionada.id !== 0) {
      setAtividade(props.atividadeSelecionada);
    }
  }, [props.atividadeSelecionada]);

  function atividadeAtual() {
    if (props.atividadeSelecionada.id !== 0) {
      return props.atividadeSelecionada;
    }
    else {
      return atividadeInicial;
    }
  }

  const inputTextHandler = (input) => {
    const { name, value } = input.target;

    setAtividade({...atividade, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.atividadeSelecionada.id !== 0) props.atualizarAtividade(atividade);
    else props.addAtividade(atividade);

    setAtividade(atividadeInicial);
  }

  const handlerCancelar = (event) => {
    event.preventDefault();

    props.cancelarAtividade();
    setAtividade(atividadeInicial);
  }

  return (
    <>
      <form className="row g-3 mb-2" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input 
            type="text" 
            className="form-control" 
            id="titulo"
            name="titulo"
            onChange={inputTextHandler}
            value={atividade.titulo}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select 
            id="prioridade"
            name="prioridade"
            className="form-select"
            onChange={inputTextHandler}
            value={atividade.prioridade}
          >
            <option value='NaoDefinido'>Escolha...</option>
            <option value='Baixa'>Baixa</option>
            <option value='Normal'>Normal</option>
            <option value='Alta'>Alta</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea 
            className='form-control'
            id="descricao"
            name="descricao"
            onChange={inputTextHandler}
            value={atividade.descricao}
          ></textarea>
          <hr />
        </div>
        <div className="col-12 mt-0 ">
          {
            atividade.id === 0 
            ? (
              <button 
                className="btn btn-success"
                type='submit'
              >
                <i className="fa fa-plus-circle me-1"></i>
                Gravar
              </button>
            )
            : 
            (<>
                <button 
                  className="btn btn-success me-2"
                  type='submit'
                >
                  <i className="fa fa-save me-1"></i>
                  Salvar
                </button>
                <button 
                  onClick={handlerCancelar}
                  className="btn btn-secondary"
                >
                  <i className="fa fa-times-circle me-1"></i>
                  Cancelar
                </button>
              </>)
          }
        </div>
      </form>
    </>
  )
}
