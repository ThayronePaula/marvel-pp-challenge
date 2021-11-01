export type MarvelCharacter = {
  id: number;
  name: string;
  description: string;

  thumbnail: {
    extension: string;
    path: string;
  };
};

export type MarvelCharacterResponse = {
  data: {
    results: MarvelCharacter[];
  };
};

export type MarvelSerie = {
  id: number;
  title: string;
  description: string;
  characters: {
    items: [{ name: string }];
  };

  thumbnail: {
    extension: string;
    path: string;
  };
};

export type MarvelSeriesResponse = {
  data: {
    results: MarvelSerie[];
  };
};

export type MarvelComics = MarvelSerie;

export type MarvelComicsResponse = {
  data: {
    results: MarvelComics[];
  };
};
