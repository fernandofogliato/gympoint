import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import HelpOrder from '~/components/HelpOrder';
import Header from '~/components/Header';

import { Container, List, Loading, NewHelpOrder } from './styles';

function ListHelpOrders({ isFocused, navigation }) {
  const student = useSelector(state => state.auth.student);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`students/${student.id}/help-orders`, {
        params: {
          page,
        },
      });
      const newData = response.data.rows;
      setOrders(old => (page >= 2 ? [...old, ...newData] : newData));
    }

    try {
      setLoading(true);
      loadOrders();
    } catch (err) {
      Alert.alert(
        'Falha',
        'Não foi possível carregar a lista de perguntas de auxílio'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, student.id, isFocused]);

  function refreshOrders() {
    setRefreshing(true);
    setPage(1);
  }

  function loadMoreOrders() {
    setPage(page + 1);
  }

  async function handleNewHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }

  return (
    <Background>
      <Header />
      <Container>
        <NewHelpOrder loading={loading} onPress={handleNewHelpOrder}>
          Nova pedido de auxílio
        </NewHelpOrder>

        {loading ? (
          <Loading />
        ) : (
          <List
            data={orders}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreOrders}
            onRefresh={refreshOrders}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailHelpOrder', { helpOrder: item })
                }
              >
                <HelpOrder data={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

ListHelpOrders.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

ListHelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(ListHelpOrders);
