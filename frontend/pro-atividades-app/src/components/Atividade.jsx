import React from 'react'

export default function Atividade(props) {

  const prioridade = {
    'NaoDefinido': {
      label: 'Não informado',
      icon: '',
      color: 'black'
    },
    'Baixa': {
      label: 'Baixa',
      icon: 'smile',
      color: 'success'
    },
    'Normal': {
      label: 'Normal',
      icon: 'meh',
      color: 'secondary'
    },
    'Alta': {
      label: 'Alta',
      icon: 'frown',
      color: 'danger'
    }
  }

  return (
    <div className={`card mb-3 shadow-sm border-${prioridade[props.atividade.prioridade].color}`}>
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className="card-title">
            <span className='badge bg-secondary me-1'>
              { props.atividade.id }
            </span>
            { props.atividade.titulo }
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Prioridade:
            <span className={`ms-1 text-${prioridade[props.atividade.prioridade].color}`}>
              <i className={`far fa-${prioridade[props.atividade.prioridade].icon} me-1`}></i>
              { prioridade[props.atividade.prioridade].label }
            </span>
          </h6>
        </div>
        <p className="card-text">{ props.atividade.descricao }</p>
        <div className='d-flex justify-content-end pt-2 m-0 border-top'>
          <button 
            className='btn btn-sm btn-primary me-1'
            onClick={() => props.selecionaAtividade(props.atividade.id)}
          >
            <i className="fas fa-pen me-1"></i>
            Editar
          </button>
          <button 
            className='btn btn-sm btn-danger'
            onClick={() => props.handleToggleConfirmModal(props.atividade.id)}
          >
            <i className="fas fa-trash me-1"></i>
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
