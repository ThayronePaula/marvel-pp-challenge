import { createContext, ReactNode, useState } from "react";

import { MarvelCharacter } from "../interfaces";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type AuthContextData = {
  characters: MarvelCharacter[];
  handleCharactersData: (data: MarvelCharacter[]) => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);

  const handleCharactersData = (data: MarvelCharacter[]) => {
    const dataFilter = data.filter(({ description, thumbnail }) => {
      if (description) {
        return !thumbnail.path.includes("image_not_available");
      }
    });

    setCharacters((prev) => [...prev, ...dataFilter]);
  };

  return (
    <AuthContext.Provider value={{ characters, handleCharactersData }}>
      {children}
    </AuthContext.Provider>
  );
}
