import { useEffect, useState } from "react"
import './IncidentDetails.css'
import { IncidentSummary } from "./IncidentSummary";
import moment from 'moment';
import { useModal } from "../dependency-tree/ModalContext";
import { knowledgeBaseModal } from "../dependency-tree/modalconstant";

export const IncidentDetails = ({selectedIncident, setChatSessionId}) => {

    let [summary, setSummary] = useState(null);
    const { openModal } = useModal();
    const openKnowledgeBaseModal = () => {
            openModal(knowledgeBaseModal);
    };   
    
    
    useEffect(() => {
        if(selectedIncident === null){
            return;
        }
        setSummary(null);
        fetch("http://localhost:9000/ai-connect/incident/" + selectedIncident.incident_id, {
            method: "POST",
            mode: "cors",  // Ensures cross-origin request
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          })
            .then(response => {console.log(response.headers.get('Set-Cookie')); return response.json();})
            .then(data => {
                console.log(data)
                console.log(document.cookie)
                setSummary(data.summary);
                setChatSessionId(data.chat_session_id);
            })
    },[selectedIncident])
    return (
        <div className="mid-container">
        {
            selectedIncident === null ?
            <div className="incident-details-null">
                Please select an incident to work on
            </div> : 
            <div className="incident-details">
                <div className="incident-heading">
                    <div className="incident-heading-left">
                        <div className="circle-high" />
                        <h4 className="incident-number" ><b>{selectedIncident.incident_id}</b></h4>
                    </div>
                    <div className="incident-heading-right">
                        <div className="icon" title="Knowledge Base" onClick={openKnowledgeBaseModal}>
                        <svg fill="#008000" title="Knowledge Base" width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <g id="Knowledge">
                                <path d="M397.5765,258.8732,269.125,287.3982v183.75l134.0506-29.8367A13.0954,13.0954,0,0,0,413.5,428.5358V271.6478A13.0751,13.0751,0,0,0,397.5765,258.8732Zm-18.4634,141.75-70,15.5753c-16.7352,3.5675-22.5757-21.6251-5.6866-25.6369l70-15.5753C390.3091,371.5209,395.9274,396.6024,379.1131,400.6227Zm0-61.25-70,15.5753c-16.7352,3.5675-22.5757-21.6251-5.6866-25.6369l70-15.5753C390.3091,310.2709,395.9274,335.3524,379.1131,339.3727Z"/>
                                <path d="M98.5,271.6478v156.888a13.0193,13.0193,0,0,0,10.239,12.7757l134.136,29.8367v-183.75l-128.4494-28.525A13.0427,13.0427,0,0,0,98.5,271.6478Zm39.9881,40.3385,70,15.5752a13.13,13.13,0,1,1-5.6866,25.6369l-70-15.5752C116.0214,333.6135,121.5692,308.52,138.4881,311.9863Zm0,61.25,70,15.5752a13.13,13.13,0,1,1-5.6866,25.6369l-70-15.5752C116.0214,394.8635,121.5692,369.77,138.4881,373.2363Z"/>
                                <path d="M295.375,198.4114h-78.75C211.0644,262.2762,300.8758,262.3157,295.375,198.4114Z"/>
                                <path d="M223.8006,172.1614H288.114l16.8869-23.9749a59.9765,59.9765,0,0,0-6.7377-76.65c-52.5556-50.1672-131.6495,16.2162-91.2619,76.65Z"/>
                                <path d="M339.0823,176.9979c4.3088,2.01,15.4449,10.3991,20.4309,9.7786,13.0267.3108,18.1793-18.0822,6.571-24.4941l-13.8769-8.014C337.134,145.8773,324.2867,168.125,339.0823,176.9979Z"/>
                                <path d="M159.7415,154.263l-13.8855,8.0152c-11.6126,6.4161-6.4515,24.8005,6.571,24.4983,5.0458.5928,16.06-7.7524,20.44-9.7744C187.662,168.1154,174.8254,145.9082,159.7415,154.263Z"/>
                                <path d="M346.3967,113.8626a13.1256,13.1256,0,0,0,13.125,13.125h16.0218c17.2522-.2916,17.2479-25.9584,0-26.25H359.5217A13.1257,13.1257,0,0,0,346.3967,113.8626Z"/>
                                <path d="M136.4053,126.9876H152.427c17.2522-.2916,17.2479-25.9584,0-26.25H136.4053a13.125,13.125,0,0,0,0,26.25Z"/>
                                <path d="M345.6533,75.2182c5.0458.5907,16.0517-7.7566,20.4309-9.7786,14.802-8.876,1.94-31.1206-13.125-22.73l-13.8769,8.0151C327.4676,57.1361,332.633,75.5258,345.6533,75.2182Z"/>
                                <path d="M145.856,65.4439c4.3087,2.01,15.4513,10.397,20.4394,9.7743,13.0289.3066,18.1793-18.0842,6.5711-24.4983l-13.8855-8.014C143.8928,34.34,131.0668,56.5647,145.856,65.4439Z"/>
                            </g>
                        </svg>

                        </div>
                        <div className="icon" title="Alerts">
                            <svg width="24" title="Alerts"  height="24" viewBox="0 0 24 24" fill="red">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 0.999992C10.9477 0.999992 10.5 1.44771 10.5 1.99999V2.99999H9.99998C7.23864 2.99999 4.99998 5.23824 4.99998 7.99975V11C4.99998 11.7377 4.76718 12.5722 4.39739 13.4148C4.03164 14.2482 3.55875 15.0294 3.14142 15.6439C2.38188 16.7624 2.85215 18.5301 4.40564 18.8103C5.42144 18.9935 6.85701 19.2115 8.54656 19.3527C8.54454 19.4015 8.54352 19.4506 8.54352 19.5C8.54352 21.433 10.1105 23 12.0435 23C13.9765 23 15.5435 21.433 15.5435 19.5C15.5435 19.4482 15.5424 19.3966 15.5402 19.3453C17.1921 19.204 18.596 18.9903 19.5943 18.8103C21.1478 18.5301 21.6181 16.7624 20.8586 15.6439C20.4412 15.0294 19.9683 14.2482 19.6026 13.4148C19.2328 12.5722 19 11.7377 19 11V7.99975C19 5.23824 16.7613 2.99999 14 2.99999H13.5V1.99999C13.5 1.44771 13.0523 0.999992 12.5 0.999992H11.5ZM12 19.5C12.5113 19.5 13.0122 19.4898 13.4997 19.4715C13.5076 20.2758 12.8541 20.9565 12.0435 20.9565C11.2347 20.9565 10.5803 20.2778 10.5872 19.4746C11.0473 19.491 11.5191 19.5 12 19.5ZM9.99998 4.99999C8.34305 4.99999 6.99998 6.34297 6.99998 7.99975V11C6.99998 12.1234 6.65547 13.2463 6.22878 14.2186C5.79804 15.2 5.25528 16.0911 4.79599 16.7675C4.78578 16.7825 4.78102 16.7969 4.77941 16.8113C4.77797 16.8242 4.77919 16.8362 4.78167 16.8458C6.3644 17.1303 9.00044 17.5 12 17.5C14.9995 17.5 17.6356 17.1303 19.2183 16.8458C19.2208 16.8362 19.222 16.8242 19.2206 16.8113C19.2189 16.7969 19.2142 16.7825 19.204 16.7675C18.7447 16.0911 18.2019 15.2 17.7712 14.2186C17.3445 13.2463 17 12.1234 17 11V7.99975C17 6.34297 15.6569 4.99999 14 4.99999H9.99998Z" fill="#0F0F0F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0299 0.757457C16.1622 0.228068 16.7146 -0.102469 17.2437 0.0301341C17.3131 0.0476089 17.3789 0.0669732 17.4916 0.104886C17.6295 0.151258 17.8183 0.221479 18.0424 0.322098C18.4894 0.522794 19.0851 0.848127 19.6982 1.35306C20.9431 2.37831 22.2161 4.1113 22.495 6.9005C22.55 7.45005 22.149 7.94009 21.5995 7.99504C21.05 8.05 20.5599 7.64905 20.505 7.09951C20.2839 4.88869 19.3068 3.62168 18.4268 2.89692C17.9774 2.52686 17.5418 2.28969 17.2232 2.14664C17.0645 2.07538 16.9369 2.02841 16.8541 2.00057C16.8201 1.98913 16.7859 1.97833 16.7513 1.96858C16.2192 1.83203 15.8964 1.2912 16.0299 0.757457Z" fill="#0F0F0F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97014 0.757457C7.83619 0.221662 7.29326 -0.104099 6.75746 0.0298498C6.68765 0.0473468 6.62176 0.066766 6.5084 0.104885C6.37051 0.151257 6.1817 0.221478 5.9576 0.322097C5.51059 0.522793 4.91493 0.848125 4.30179 1.35306C3.05685 2.37831 1.78388 4.1113 1.50496 6.90049C1.45001 7.45003 1.85095 7.94008 2.40049 7.99503C2.95004 8.04998 3.44008 7.64904 3.49504 7.0995C3.71612 4.88869 4.69315 3.62168 5.57321 2.89692C6.02257 2.52686 6.45815 2.28969 6.77678 2.14664C6.93548 2.07538 7.06308 2.02841 7.14589 2.00057C7.17991 1.98913 7.21413 1.97833 7.24867 1.96858C7.78081 1.83203 8.10358 1.2912 7.97014 0.757457Z" fill="#0F0F0F"/>
                            </svg>
                        </div>

                    </div>
                </div>
                <div className="caller-assignee-details">
                    <div className="incident-caller">
                        <h5><b>Created By: &nbsp;</b></h5>
                        <p>                
                            {selectedIncident.caller}                
                        </p>
                    </div>
                    <div className="incident-assignee">
                        <h5><b>Assigned To: &nbsp;</b></h5>
                        <p>                
                            {selectedIncident.assigned_to}                
                        </p>
                    </div>
                    
                </div>
                <div className="incident-heading-right">
                        
                        <h5 className="incident-created-on" ><b>Created on:</b> &nbsp;{moment(selectedIncident.created_at).format("YYYY-MM-DD HH:mm:ss")}</h5>
                    </div>
                <div className="incident-description">
                    <h5><b>Description: </b></h5>
                    <p>                
                        {selectedIncident.short_description}                
                    </p>
                </div>
                <IncidentSummary summary={summary}/>
            </div>
        }
        </div>
        
    )
}