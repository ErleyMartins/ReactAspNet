import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import TitlePage from '../../components/TitlePage'

export default function ClienteForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
        <TitlePage titulo={`Cliente Detalhes ${ id == null ? '' : id }`}>
          <Button 
            variant='secondary'
            onClick={() => navigate('/cliente/lista')}
          >
            <i className="fa fa-chevron-circle-left"></i>
          </Button>
        </TitlePage>
    </>
  )
}
