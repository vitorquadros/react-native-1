import React, {useState, createContext} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const EstudanteContext = createContext({});

export const showToast = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const EstudanteProvider = ({children}) => {
  const [estudantes, setEstudantes] = useState([]);

  const getEstudantes = async () => {
    const unsubscribe = firestore()
      .collection('estudantes')
      .orderBy('nome')
      .onSnapshot(
        //inscrevendo um listener
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const estudante = {
              uid: doc.id,
              adiantamento: doc.data().adiantamento,
              curso: doc.data().curso,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
              nome: doc.data().nome,
            };
            d.push(estudante);
          });
          //console.log(d);
          setEstudantes(d);
        },
        e => {
          console.error('EstudanteProvider, getUsers: ' + e);
        },
      );

    return unsubscribe;
  };

  const save = async estudante => {
    try {
      await firestore().collection('estudantes').doc(estudante.uid).set(
        {
          curso: estudante.curso,
          nome: estudante.nome,
        },
        {merge: true},
      );

      return true;
    } catch (error) {
      console.error('EstudanteProvider, saveEstudante: ' + e);
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('estudantes').doc(uid).delete();

      return true;
    } catch (error) {
      console.error('EstudanteProvider, deleteEstudante: ', error);
      return false;
    }
  };

  return (
    <EstudanteContext.Provider
      value={{
        estudantes,
        getEstudantes,
        save,
        del,
      }}>
      {children}
    </EstudanteContext.Provider>
  );
};
