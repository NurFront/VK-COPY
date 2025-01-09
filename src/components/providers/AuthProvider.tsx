import {
  createContext,
  FC,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { IUser, TypeSetState } from "../../Types";
import { Auth, getAuth, onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { Firestore, getFirestore } from 'firebase/firestore'
import { users } from "../layout/sidebar/dataUsers"; 

interface IContext {
  user: IUser | null;
  setUser: TypeSetState<IUser | null>;
  ga: Auth;
  db: Firestore;
}

export const AuthContext = createContext<IContext>({} as IContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const ga = getAuth();
  const db = getFirestore()

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, async (authUser) => {
      if (authUser) {
        setUser({
          id: authUser.uid,
          avatarSrc: users[1].avatarSrc,
          name: authUser.displayName || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unListen();
    };
  }, [ga]);

  const values = useMemo(
    () => ({
      user,
      setUser,
      ga,
      db,
    }),
    [user, ga]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
