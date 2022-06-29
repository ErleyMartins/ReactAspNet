import React, { useEffect, useState } from 'react';
import './App.css';
import Atividade from './components/Atividade';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';

function App() {
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  useEffect(() => {
    atividades.length <= 0 
    ? setIndex(1)
    : setIndex(Math.max.apply(Math, atividades.map(atividade => atividade.id)) + 1)
  });

  function addAtividade(ativ) {
    setAtividades([...atividades, {...ativ, id: index}]);
  }

  function atualizarAtividade(atividade) {
    setAtividades(atividades.map(item => item.id === atividade.id ? atividade : item));
    setAtividade({id: 0});
  }

  function cancelarAtividade() {
    setAtividade({id: 0});
  }

  function selecionaAtividade(id) {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id === id);
    setAtividade(atividadesFiltradas[0]);
  }

  function deletarAtividade(id) {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
    setAtividades([...atividadesFiltradas]);
  }

  return (
    <div className='container p-3'>
      <AtividadeForm
        addAtividade={addAtividade}
        atualizarAtividade={atualizarAtividade}
        atividadeSelecionada={atividade}
        cancelarAtividade={cancelarAtividade}
      />
      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        selecionaAtividade={selecionaAtividade}
      />
    </div>
  );
}

export default App;
