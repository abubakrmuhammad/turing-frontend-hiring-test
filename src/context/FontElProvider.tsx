import {
  PropsWithChildren,
  createContext,
  RefObject,
  useContext,
  useRef,
} from 'react';

interface FontContextProps {
  fontStyleElRef: RefObject<HTMLDivElement>;
}

const FontContext = createContext<FontContextProps>({} as FontContextProps);

function FontElProvider({ children }: PropsWithChildren) {
  const fontStyleElRef = useRef<HTMLDivElement>(null);

  return (
    <FontContext.Provider value={{ fontStyleElRef }}>
      {children}
    </FontContext.Provider>
  );
}

const useFontElRef = () => {
  const { fontStyleElRef } = useContext(FontContext);

  return fontStyleElRef;
};

export { FontElProvider, useFontElRef };
