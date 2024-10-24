import "../styles/modal.css";
import Close from "../assets/close.svg";

export interface ModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    btnText: string;
}

export default function Modal({
    title,
    children,
    isOpen,
    onClose,
    onConfirm,
    btnText,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <span></span>
                    <h2 className="heading-text">{title}</h2>
                    <button className="icon-btn" onClick={onClose}>
                        <img src={Close} alt="Close" />
                    </button>
                </div>
                {children}
                <button className="modal-button" type='button' onClick={onConfirm}>
                    {btnText}
                </button>
            </div>
        </div>
    );
}
