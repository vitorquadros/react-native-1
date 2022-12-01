import React, {useContext, useEffect, useState} from 'react';
import {Container, TextInput} from './styles';
import MeuButton from '../../componentes/MeuButton';
import DeleteButton from '../../componentes/DeleteButton';
import Loading from '../../componentes/Loading';
import {EstudanteContext, showToast} from '../../context/EstudanteProvider';

const Estudante = ({
  route: {
    params: {estudante},
  },
}) => {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(EstudanteContext);

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

  const salvar = async () => {
    setLoading(true);

    if (
      await save({
        uid,
        nome,
        curso,
      })
    ) {
      setLoading(false);
      showToast('Dados salvos.');
      setNome('');
      setCurso('');
    } else {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  const excluir = async () => {
    setLoading(true);

    if (await del(uid)) {
      setLoading(false);
      showToast('Excluido com sucesso.');
    } else {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível excluir.');
    }
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
