import React from 'react'

import "./modal.css"

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    children:any
}
function Modal({ isOpen, onClose,children }: Props) {
    if (!isOpen) return null;
    return (
        <div className='overlay' >
            <div className='modal' >
                <button className='closeButton'  onClick={onClose}>
                    ✕
                </button>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Modal
