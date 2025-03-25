import BasicFlow from "./DependencyMapping"
import './DependencyTree.css'
import { useModal } from "../../context/ModalContext";
import { dependencyTreeModalId } from "../modal/modalconstant";
import { SquareArrowOutUpRight } from "lucide-react";

export const DependencyTree = ({selectedIncident}) =>{
    const { openModal } = useModal();
    const openDependencyTreeModal = () => {
        openModal(dependencyTreeModalId);
    };   
    return (
        selectedIncident === null ?
        <div className="dependency-empty-panel">
            Please select an incident to work on
        </div> : 
        <div className="dependency-tree-container">
            <div className="dependency-container-header">
                <div className="title"><h4><b>Live Dependency Mapping</b></h4></div>
                <div className="icon"  onClick={openDependencyTreeModal}>
                    <SquareArrowOutUpRight size={25} />
                </div>
            </div>
            <BasicFlow />
        </div>
    )
}