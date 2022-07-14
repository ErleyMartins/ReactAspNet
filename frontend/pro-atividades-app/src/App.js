import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Atividade from './pages/atividades/Atividade';
import Dashboard from './pages/dashboard/Dashboard';
import Cliente from './pages/clientes/Cliente';
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/atividade/lista' component={Atividade} />
      <Route path='/cliente/lista' component={Cliente} />
      <Route path='/cliente/detalhe/:id?' component={ClienteForm} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
