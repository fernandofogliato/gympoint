import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Checkin from '~/components/Checkin';
import Header from '~/components/Header';

import { Container, List, Loading, NewCheckInButton } from './styles';

export default function Dashboard() {
  const student = useSelector(state => state.auth.student);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`students/${student.id}/checkins`, {
        params: {
          page,
        },
      });

      const rowCount = response.data.count;

      const newData = response.data.rows.map((checkin, index) => ({
        ...checkin,
        title: `Check-in #${rowCount - ((page - 1) * 10 + index)} `,
      }));
      setCheckins(old => (page >= 2 ? [...old, ...newData] : newData));
    }

    try {
      setLoading(true);
      loadCheckins();
    } catch (err) {
      Alert.alert('Falha', 'Não foi possível carregar a lista de check-ins');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, student.id]);

  function loadMoreCheckins() {
    setPage(page + 1);
  }

  function refreshCheckins() {
    setRefreshing(true);
    setPage(1);
  }

  async function handleNewCheckin() {
    try {
      await api.post(`students/${student.id}/checkins`, {});
      refreshCheckins();
    } catch (err) {
      Alert.alert(
        'Falha',
        `Não foi possível incluir o check-in: ${err.response.data.error}`
      );
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <NewCheckInButton loading={loading} onPress={handleNewCheckin}>
          Novo check-in
        </NewCheckInButton>

        {loading ? (
          <Loading />
        ) : (
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreCheckins}
            onRefresh={refreshCheckins}
            refreshing={refreshing}
            renderItem={({ item }) => <Checkin data={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

const TabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: TabBarIcon,
};

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
