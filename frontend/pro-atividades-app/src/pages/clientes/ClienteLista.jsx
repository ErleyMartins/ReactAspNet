import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TitlePage from '../../components/TitlePage';


const clientes = [
  {
    id: 1,
    nome: 'Microsoft',
    responsavel: 'Otto',
    contato: '1012412',
    situacao: 'Ativo'
  },
  {
    id: 2,
    nome: 'Amazon',
    responsavel: 'George',
    contato: '1230421',
    situacao: 'Ativo'
  },
  {
    id: 3,
    nome: 'Google',
    responsavel: 'Zeck',
    contato: '10144232',
    situacao: 'Ativo'
  },
  {
    id: 4,
    nome: 'Meta',
    responsavel: 'Josh',
    contato: '1122211',
    situacao: 'Ativo'
  }
];

export default function ClienteLista() {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');

  const handleInputChange = (input) => {
    setTermoBusca(input.target.value);
  }

  const novoCliente = () => {
    navigate('/cliente/detalhe');
  }

  const clientesFiltrados = clientes.filter(cliente => {
    return Object.values(cliente)
                 .join(' ')
                 .toLocaleLowerCase()
                 .includes(termoBusca.toLocaleLowerCase());
  });

  return (
    <>
     <TitlePage titulo='Cliente Lista'>
      <Button variant='success' onClick={novoCliente}>
        <i className='fa fa-plus-circle'></i>
      </Button>
     </TitlePage>
     <InputGroup className="mt-3 mb-3">
        <InputGroup.Text >
          Buscar:
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Buscar por nome'
          onChange={handleInputChange}
        />
      </InputGroup>
     <table className="table table-striped table-hover">
        <thead className='table-dark mt-3'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Empresa</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(cliente => (
            <tr key={cliente.id}>
              <th scope="row">{cliente.id}</th>
              <td>{cliente.nome}</td>
              <td>{cliente.responsavel}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.situacao}</td>
              <td>
                <div>
                  <button 
                    className='btn btn-sm btn-outline-primary me-2'
                    onClick={() => navigate(`/cliente/detalhe/${cliente.id}`)}
                  >
                    <i className='fa fa-user-edit me-1'></i>
                    Editar
                  </button>
                  <button className='btn btn-sm btn-outline-danger'>
                    <i className='fa fa-user-times me-1'></i>
                    Inativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
