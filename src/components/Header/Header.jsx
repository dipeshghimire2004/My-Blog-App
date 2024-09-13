import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className='py-4 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex space-x-8 text-lg'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='hover:text-yellow-300 transition-colors duration-300'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
