import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.svg';
import { Container, Content, Profile, LinkWrapper } from './styles';

function Header(props) {
  const menus = [
    { name: 'ALUNOS', to: '/students' },
    { name: 'PLANOS', to: '/plans' },
    { name: 'MATRÍCULAS', to: '/enrollments' },
    { name: 'PEDIDOS DE AUXÍLIO', to: '/orders' },
  ];

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleLogout() {
    dispatch(signOut());
  }

  function isActive(path) {
    return path === props.location.pathname;
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />

          {menus.map(menu => (
            <LinkWrapper
              key={menu.name}
              to={menu.to}
              active={isActive(menu.to) ? 1 : 0}
            >
              {menu.name}
            </LinkWrapper>
          ))}
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <button type="button" onClick={handleLogout}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
