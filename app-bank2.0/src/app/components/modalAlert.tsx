import { FC, ReactNode } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode
  }
  
  const ModalAlert: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
        <div className="fixed inset-0 bg-black opacity-50"></div>
  
          <div className="bg-white rounded-lg p-6 z-50">
  
          <div className="mt-4">{children}</div>
        </div>
      </div>
    );
  };
  
  export default ModalAlert;