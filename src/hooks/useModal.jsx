import { X } from "lucide-react";
import React, { useState , useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";




const ModalContext = React.createContext();

const useModal = (modalname ,beforeOpen, afterClose , refreshOnClose = false) => {

  const [showModal, setShowModal] = useState(false);
  
  
  // const history = useHist
  const date_now = Date.now()

  const openModal = () => {
    if(beforeOpen){
      beforeOpen()
    }
    setShowModal(true);
  };

  const closeModal = (default_close = true, others = () => null) => {
    setShowModal(false);
    if(afterClose){
      console.log('After working')
      if(refreshOnClose && default_close){
        // navigation(`${location.pathname}?refresh`)
        // console.log('Hello')
        // useForceRefresh?.update()
      }
      afterClose()
    }
  };

  const values = {
    closeModal,
    openModal,
    showModal,
    setShowModal,
  }

  const Modal = ({ children }) => { 

    

    return(

    <>
      {showModal && (
        <div>
          <div className="fixed z-30 inset-0 overflow-y-scroll">
            <div className="flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            {/* <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"> */}
              {/* Modal Gray Overlay */}
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="align-bottom bg-white text-left self-start shadow-xl rounded-xl border border-gray-300  transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
             
                <div className="bg-white rounded-xl">
                  {/* Modal header */}
                  <div className="flex items-center rounded-t-xl justify-between bg-[#F7F7F7] py-4 px-8">
                    <div className="font-bold text-lg ">{modalname}</div>
                    {/* Modal Close button */}
                    <div>
                        <button type="button" onClick={() => closeModal(false)} className=" bg-[#FAFBFC] rounded-full p-2">
                            <X/>
                        </button>
                    </div>
                  </div>
                  {/* Modal content */}
                  <div className="px-4 pt-5 pb-4 sm:px-8 sm:p-6 sm:pb-6 ">
                     {children}
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    
  )

  // <div>
    //   <div className="rounded-xl border border-gray-300 w-full md:mx-16 ">
    //     <div className="flex items-center justify-between bg-[#F7F7F7] py-4 px-8">
    //       <p className="font-bold">Filing A New Complaint</p>
    //     </div>
    //     <div className="px-8 py-4">
         
    //     </div>
    //   </div>
    // </div>
};

  

  return {
    closeModal,
    openModal,
    showModal,
    setShowModal,
    Modal,
    ModalProvider: ({children}) => <ModalContext.Provider value={values}>
      <Modal>{children}</Modal>
    </ModalContext.Provider>
    
  };
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if(!context) throw Error(' Must be inside a Context Provider') ;
  return context;

}

export{
  useModal, 
  useModalContext
}



/**
 * 
 */
 


