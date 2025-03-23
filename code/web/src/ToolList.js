import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.css';
import './ToolList.css'
import { dependencyTreeModalId } from './modalconstant';
import { useModal } from './ModalContext';

const Tools = () => {
    const { openModal } = useModal();
    const openDependencyTreeModal = () => {
        openModal(dependencyTreeModalId);
    };
    return (
       <>
           <div className='tools-heading'><h5 className="fw-bold">Tools</h5> </div>
           <div className='tools-content'>
            <div className='tool' onClick={openDependencyTreeModal}>
                <div className='tool-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                        <path fill="green" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5z"/>
                        <path fill="red" d="M0 12.5A1.5 1.5 0 0 1 1.5 11h1A1.5 1.5 0 0 1 4 12.5v1A1.5 1.5 0 0 1 2.5 15h-1A1.5 1.5 0 0 1 0 13.5zm6 0A1.5 1.5 0 0 1 7.5 11h1A1.5 1.5 0 0 1 10 12.5v1A1.5 1.5 0 0 1 8.5 15h-1A1.5 1.5 0 0 1 6 13.5zm6 0A1.5 1.5 0 0 1 13.5 11h1A1.5 1.5 0 0 1 16 12.5v1A1.5 1.5 0 0 1 14.5 15h-1A1.5 1.5 0 0 1 12 13.5z"/>
                    </svg>
                </div>
                <div className='tool-name'>Dependency Map</div>
            </div>
           </div>
       </>
    )
}

export default Tools;