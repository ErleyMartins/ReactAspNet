import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import TitlePage from '../../components/TitlePage'

export default function ClienteForm() {
  const history = useHistory();
  const { id } = useParams();

  return (
    <>
        <TitlePage titulo={`Cliente Detalhes ${ id == null ? '' : id }`}>
          <Button 
            variant='secondary'
            onClick={() => history.goBack()}
          >
            <i className="fa fa-chevron-circle-left"></i>
          </Button>
        </TitlePage>
    </>
  )
}
