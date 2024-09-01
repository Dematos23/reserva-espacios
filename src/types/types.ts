export interface User {
  id: string | undefined;
  name: string;
  lastname: string;
  spiritualName: string | undefined | null; 
  email: string;
  role: string;
  state: string;
}

export interface OverlayProps {
  onClose: () => void;
  open: boolean;
}