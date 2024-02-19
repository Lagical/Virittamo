import NavBar from '../../components/NavBar';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
  });
});