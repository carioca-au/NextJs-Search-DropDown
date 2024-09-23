// components/__tests__/SearchDropdown.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchDropdown from '../searchDropDown/searchDropDown';
import { fetchUsers } from '../../data/users';
import '@testing-library/jest-dom'

jest.mock('../../data/users', () => ({
  fetchUsers: jest.fn()
}));

describe('SearchDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field', () => {
    render(<SearchDropdown fetchUsers={fetchUsers} />);
    const input = screen.getByPlaceholderText('Search users...');
    expect(input).toBeInTheDocument();
  });

  it('filters users based on search term', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue([
      { id: 1, name: 'User 1' },
      { id: 10, name: 'User 10' },
      { id: 11, name: 'User 11' },
      { id: 12, name: 'User 12' },
      { id: 13, name: 'User 13' }
    ]);

    render(<SearchDropdown fetchUsers={fetchUsers} />);
    const input = screen.getByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'User 1' } });

    await waitFor(() => {
      const filteredUsers = screen.getAllByRole('listitem');
      expect(filteredUsers).toHaveLength(5); // Max 5 users
    });
  });

  it('displays no users if search term does not match', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue([]);

    render(<SearchDropdown fetchUsers={fetchUsers} />);
    const input = screen.getByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'Nonexistent' } });

    await waitFor(() => {
      const filteredUsers = screen.queryAllByRole('listitem');
      expect(filteredUsers).toHaveLength(0);
    });
  });
});
