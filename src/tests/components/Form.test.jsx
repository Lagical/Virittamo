import { render } from '@testing-library/react';
import Form from '../../components/Form';

describe('Form', () => {
    it('renders without crashing', () => {
      render(<Form />);
    });
});