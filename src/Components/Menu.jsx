import Button from "./Button";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUser } from "../context/Usercontext";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "75vh",
  },
};
export default function Menu() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { menu, getmenuCard } = useUser();
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(function () {
    getmenuCard();
  }, []);
  return (
    <div className="flex justify-end mx-5">
      <Button type="secondary" onClick={openModal}>
        View Menu 
      </Button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="overflow-auto">
          <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold">Menu</h1>
          <p className="text-3xl font-semibold cursor-pointer" onClick={closeModal}>&times;</p>
          </div>
          {menu.map((item) => {
            return (
              <div
                key={item._id}
                className="border-b-2 flex justify-between items-center py-3"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm mb-6">{item.description}</p>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
