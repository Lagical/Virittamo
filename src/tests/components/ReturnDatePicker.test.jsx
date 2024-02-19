import { render } from "@testing-library/react";
import ReturnDatePicker from '../../components/ReturnDatePicker';

describe('ReturnDatePicker', () => {
  it('renders without crashing', () => {
    render(<ReturnDatePicker label="Test Date" value={null} onChange={() => {}} />);
  });
});