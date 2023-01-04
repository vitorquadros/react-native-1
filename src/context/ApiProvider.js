import {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {create} from 'apisauce';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);

  const getApi = async () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/react-native-ec9d1/databases/(default)/documents/',
              headers: {Authorization: 'Bearer ' + idToken},
            });
            apiLocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });
            setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  return (
    <ApiContext.Provider value={{api, getApi}}>{children}</ApiContext.Provider>
  );
};
