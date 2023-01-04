import {createContext, useContext, useState} from 'react';
import {ApiContext} from './ApiProvider';
import {showToast} from '../utils/showToast';

export const DoctorContext = createContext({});

export const DoctorProvider = ({children}) => {
  const [doctors, setDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  const getDoctors = async () => {
    try {
      const response = await api.get('/doctors');
      let data = [];
      response.data.documents.map(item => {
        let k = item.name.split(
          'projects/react-native-ec9d1/databases/(default)/documents/doctors/',
        );
        data.push({
          name: item.fields.name.stringValue,
          crm: item.fields.crm.stringValue,
          uid: k[1],
        });
      });

      data.sort((a, b) => a.name.localeCompare(b.name));
      setDoctors(data);
    } catch (response) {
      setErrorMessage(response);
      console.log(response);
    }
  };

  const saveDoctor = async val => {
    try {
      await api.post('/doctors/', {
        fields: {
          name: {stringValue: val.name},
          crm: {stringValue: val.crm},
        },
      });

      showToast('Médico cadastrado com sucesso!');
      getDoctors();
    } catch (response) {
      setErrorMessage(response);
      console.log(response);
    }
  };

  const updateDoctor = async val => {
    try {
      await api.patch('/doctors/' + val.uid, {
        fields: {
          name: {stringValue: val.name},
          crm: {stringValue: val.crm},
        },
      });

      showToast('Médico atualizado com sucesso!');
      getDoctors();
    } catch (response) {
      setErrorMessage(response);
      console.log(response);
    }
  };

  const deleteDoctor = async val => {
    try {
      await api.delete('/doctors/' + val);

      showToast('Médico deletado com sucesso!');
      getDoctors();
    } catch (response) {
      setErrorMessage(response);
      console.log(response);
    }
  };

  return (
    <DoctorContext.Provider
      value={{doctors, getDoctors, saveDoctor, updateDoctor, deleteDoctor}}>
      {children}
    </DoctorContext.Provider>
  );
};
