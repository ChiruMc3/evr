import { useContext } from 'react';
import { AppContext } from '../App';

/**
 * Custom hook to access global app state (form submission, modals, etc.)
 * Throws error if used outside AppProvider.
 */
export function useAppContext() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}
