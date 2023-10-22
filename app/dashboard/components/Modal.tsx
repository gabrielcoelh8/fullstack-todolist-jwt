interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open : boolean) => boolean | void;
    children: React.ReactNode ///for allow children
 }
 
 const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <>
    <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
    <div className="modal-box w-full">
        <button onClick={() => setModalOpen(false)} 
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
        </button>

        {children}
    </div>
    </dialog>
    </>
  )
}

export default Modal