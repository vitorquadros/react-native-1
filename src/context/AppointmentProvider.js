import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/showToast';

export const AppointmentContext = createContext({});

export const AppointmentProvider = ({children}) => {
  const [appointment, setAppointment] = useState([]);

  const saveAppointment = async value => {
    await firestore()
      .collection('appointments')
      .doc(value.uid)
      .set(
        {
          description: value.description,
          type: value.type,
          date: value.date,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Consulta salva com sucesso!');
      })
      .catch(e => {
        console.error(e);
      });
  };

  const deleteAppointment = async value => {
    firestore()
      .collection('appointments')
      .doc(value)
      .delete()
      .then(() => {
        showToast('Consulta excluída com sucesso!');
      })
      .catch(e => {
        console.error(e);
      });
  };

  const getAppointments = async () => {
    const unsubscribe = firestore()
      .collection('appointments')
      .onSnapshot(
        querySnapshot => {
          let arr = [];
          querySnapshot.forEach(doc => {
            console.log(doc.id, ' => ', doc.data());
            const appointmentValue = {
              uid: doc.id,
              description: doc.data().description,
              date: doc.data().date,
              type: doc.data().type,
            };
            arr.push(appointmentValue);
          });
          setAppointment(arr);
        },
        e => console.log('Home, getAppointments ' + e),
      );

    return unsubscribe;
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        getAppointments,
        saveAppointment,
        deleteAppointment,
      }}>
      {children}
    </AppointmentContext.Provider>
  );
};
