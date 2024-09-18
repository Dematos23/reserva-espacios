export interface User {
  id: string;
  name: string;
  lastname: string;
  spiritualName: string | undefined;
  email: string;
  role: string;
  state: string;
}

export interface OverlayProps {
  onClose: () => void;
  open: boolean;
}
