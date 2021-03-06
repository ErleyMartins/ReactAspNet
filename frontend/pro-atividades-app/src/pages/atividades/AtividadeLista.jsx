import React from 'react'
import AtividadeItem from './AtividadeItem'

export default function AtividadeLista(props) {
  return (
    <div className='mt-3'>
        {props.atividades.map(atividade => (
          <AtividadeItem
            key={atividade.id}
            atividade={atividade}
            handleToggleConfirmModal={props.handleToggleConfirmModal}
            selecionaAtividade={props.selecionaAtividade}
            />
        ))}
    </div>
  )
}
