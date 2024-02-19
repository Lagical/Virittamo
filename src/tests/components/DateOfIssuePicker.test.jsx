import { render } from "@testing-library/react";
import DateOfIssuePicker from '../../components/DateOfIssuePicker';

describe('DateOfIssuePicker', () => {
  it('renders without crashing', () => {
    render(<DateOfIssuePicker label="Test Date" value={null} onChange={() => {}} />);
  });
});