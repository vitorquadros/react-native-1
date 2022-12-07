import {Container} from './styles';

const User = ({route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(route.params.user.nome);
    setEmail(route.params.user.email);
  }, []);

  return (
    <Container>
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setName(t)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        editable={false}
        value={email}
      />
    </Container>
  );
};

export default User;
