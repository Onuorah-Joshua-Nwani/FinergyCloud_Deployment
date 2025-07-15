// Minimal auth hook that avoids React Query
export function useAuth() {
  // Simple auth state without React Query
  return {
    data: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  };
}