import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddNote from './AddNote';
import { addNoteApi } from '../Services/Api'; 

// Mock the API call
jest.mock('../Services/Api', () => ({
  addNoteApi: jest.fn(),
}));

describe('AddNote Component', () => {
  const handleAddNote = jest.fn(); 

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders without expanding initially', () => {
    render(<AddNote handleAddNote={handleAddNote} />);
    
    expect(screen.getByText('Take a note...')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Title')).not.toBeInTheDocument();
  });

  test('expands the note input when clicked', () => {
    render(<AddNote handleAddNote={handleAddNote} />);
    
    fireEvent.click(screen.getByText('Take a note...'));
    
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Take a note...')).toBeInTheDocument();
  });

  test('allows input of title and description', () => {
    render(<AddNote handleAddNote={handleAddNote} />);

    fireEvent.click(screen.getByText('Take a note...'));

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Take a note...');

    fireEvent.change(titleInput, { target: { value: 'My Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'My Description' } });

    expect(titleInput.value).toBe('My Title');
    expect(descriptionInput.value).toBe('My Description');
  });

  test('submits the note and calls the api when close button is clicked', async () => {
    addNoteApi.mockResolvedValueOnce({ data: { id: 1, title: 'My Title', description: 'My Description' } });
    render(<AddNote handleAddNote={handleAddNote} />);

    fireEvent.click(screen.getByText('Take a note...'));

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'My Title' } });
    fireEvent.change(screen.getByPlaceholderText('Take a note...'), { target: { value: 'My Description' } });

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(addNoteApi).toHaveBeenCalledWith({ title: 'My Title', description: 'My Description' });
      expect(handleAddNote).toHaveBeenCalledWith({ id: 1, title: 'My Title', description: 'My Description' }, "add");
    });
  });

  test('does not call API if title and description are empty', () => {
    render(<AddNote handleAddNote={handleAddNote} />);
    fireEvent.click(screen.getByText('Take a note...'));
    fireEvent.click(screen.getByText('Close'));

    expect(addNoteApi).not.toHaveBeenCalled();
    expect(handleAddNote).not.toHaveBeenCalled();
  });
});
