import React, {useContext, useState} from 'react';
import ToastBar from '../../../components/bar/ToastBar';

// We define our type for the context properties right here
type ToastContextType = {
  showToast: ({currentText}: ToastShowToastParamsType) => void;
};

type ToastShowToastParamsType = {
  currentText: string;
};

export const ToastContext = React.createContext<ToastContextType>({
  showToast: ({currentText}: ToastShowToastParamsType) => {},
});

export const useToastProvider = () => useContext(ToastContext);

const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible(false);
  };

  const showToast = ({currentText}: ToastShowToastParamsType) => {
    setText(currentText);
    setIsVisible(true);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {isVisible && <ToastBar text={text} handleVisible={handleVisible} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
