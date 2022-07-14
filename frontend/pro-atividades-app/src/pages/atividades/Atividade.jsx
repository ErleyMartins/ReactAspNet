import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import api from '../../api/atividade';
import TitlePage from '../../components/TitlePage';

export default function Atividade() {
  const [toggleAtividadeModal, setToggleAtividadeModal] = useState(false);
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  const handleToggleAtividadeModal = () => setToggleAtividadeModal(!toggleAtividadeModal);
  const handleToggleConfirmModal = (id) => {
    if (id > 0 && id != null) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id === id);
      setAtividade(atividadesFiltradas[0]);
    }
    else {
      setAtividade({ id: 0 });
    }
    setToggleConfirmModal(!toggleConfirmModal);
  }

  const buscarTodasAtividades = async () => {
    const response = await api.get('atividade');
    
    return response.data;
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await buscarTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    }
    getAtividades();
  }, []);

  const addAtividade = async (ativ) => {
    handleToggleAtividadeModal();
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }

  const atualizarAtividade = async (atividade) => {
    handleToggleAtividadeModal();
    const response = await api.put(`atividade`, atividade);
    const { id } = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade({id: 0});
  }

  const cancelarAtividade = () => {
    setAtividade({id: 0});
    handleToggleAtividadeModal();
  }

  const selecionaAtividade = (id) => {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id === id);
    setAtividade(atividadesFiltradas[0]);
    handleToggleAtividadeModal();
  }

  const deletarAtividade = async(id) => {
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
      setAtividades([...atividadesFiltradas]);
      handleToggleConfirmModal(0);
    }
  }

  return (
    <div className='container p-3'>
      <TitlePage titulo={'Gestão de Atividades'}>
        <Button variant='success' onClick={() => cancelarAtividade()}>
          <i className='fa fa-plus-circle'></i>
        </Button>
      </TitlePage>
      <AtividadeLista
            atividades={atividades}
            handleToggleConfirmModal={handleToggleConfirmModal}
            selecionaAtividade={selecionaAtividade}
      />
      <Modal show={toggleAtividadeModal} onHide={handleToggleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {atividade.id === 0 ? 'Nova Atividade' : `Atividade: ${atividade.id}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
          addAtividade={addAtividade}
          atualizarAtividade={atualizarAtividade}
          atividadeSelecionada={atividade}
          cancelarAtividade={cancelarAtividade}
          />
        </Modal.Body>
      </Modal>

      <Modal 
        size='md'
        show={toggleConfirmModal} 
        onHide={handleToggleConfirmModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Excluir a atividade: {atividade.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-outline-danger me-2' onClick={() => deletarAtividade(atividade.id)}>
            <i className='fa fa-check-circle me-1'></i>
            Sim
          </button>
          <button className='btn btn-secondary' onClick={() => handleToggleConfirmModal(0)}>
            <i className="fa fa-times-circle me-1"></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
