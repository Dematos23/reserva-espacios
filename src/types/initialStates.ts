import { User, Session } from "@/types/types";

export const initialUser: User = {
  id: "",
  name: "",
  lastname: "",
  spiritualName: undefined,
  email: "",
  role: "",
  state: "",
};

export const initialSession: Session = {
  token: "",
  user: {
    name: "",
    lastname: "",
    spiritualName: undefined,
    role: "",
  },
};
