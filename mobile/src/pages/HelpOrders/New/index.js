import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function NewHelpOrder({ navigation }) {
  const student = useSelector(state => state.auth.student);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post(`students/${student.id}/help-orders`, { question });
      Alert.alert('Sucesso', 'Pedido de auxílio inserido com sucesso.');
      navigation.navigate('ListHelpOrders');
    } catch (err) {
      Alert.alert('Falha', 'Não foi possível adicionar o pedido de auxílio.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            autoCapitalize="none"
            placeholder="Inclua seu pedido de auxílio"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={8}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar pedido
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListHelpOrders');
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});
