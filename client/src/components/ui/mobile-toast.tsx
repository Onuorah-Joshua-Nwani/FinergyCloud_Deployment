import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

export interface ToastContextType {
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void;
  removeToast: (id: string) => void;
  toasts: ToastProps[];
}

const ToastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const ToastColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export function MobileToast({ id, title, message, type, duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setIsVisible(true), 50);

    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const IconComponent = ToastIcons[type];

  return (
    <div
      className={`fixed top-20 left-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible && !isExiting ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${ToastColors[type]}`}>
        <div className="flex items-start space-x-3">
          <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs mt-1 opacity-90">{message}</p>
          </div>
          
          <button
            onClick={handleClose}
            className="p-1 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MobileToastContainer() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Date.now().toString();
    const newToast = {
      ...toast,
      id,
      onClose: removeToast
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Expose toast methods globally for mobile app
  useEffect(() => {
    (window as any).mobileToast = {
      success: (title: string, message: string) => addToast({ title, message, type: 'success' }),
      error: (title: string, message: string) => addToast({ title, message, type: 'error' }),
      warning: (title: string, message: string) => addToast({ title, message, type: 'warning' }),
      info: (title: string, message: string) => addToast({ title, message, type: 'info' })
    };
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <MobileToast key={toast.id} {...toast} />
      ))}
    </>
  );
}