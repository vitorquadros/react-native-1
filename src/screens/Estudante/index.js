import React, {useEffect, useState} from 'react';
import {Container, TextInput} from './styles';
import MeuButton from '../../componentes/MeuButton';
import DeleteButton from '../../componentes/DeleteButton';
import Loading from '../../componentes/Loading';

const Estudante = ({
  route: {
    params: {estudante},
  },
}) => {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(estudante);
    if (estudante) {
      setUid(estudante.uid);
      setNome(estudante.nome);
      setCurso(estudante.curso);
    } else {
      setUid('');
      setNome('');
      setCurso('');
    }
  }, [route]);

  const salvar = () => {
    alert('Salvar');
  };

  const excluir = () => {
    alert('Excluir');
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />

      <TextInput
        placeholder="Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCurso(t)}
        value={curso}
      />

      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}

      {loading && <Loading />}
    </Container>
  );
};

export default Estudante;
