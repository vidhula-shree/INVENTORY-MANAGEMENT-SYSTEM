import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
import DeleteInventoryModal from "../../components/DeleteInventoryModal/DeleteInventoryModal";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function Inventory() {
  const [inventoryList, setInventoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInventoryName, setSelectedInventoryName] = useState(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  // This useEffect is used to set the viewWidth state to the current window width
  // It is used help determine whether the modal should take the full screen (for mobile) or not
  useEffect(() => {
    const resize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [viewWidth]);

  // Function to fetch the list of inventories from the API
  const fetchInventories = () => {
    setIsLoading(true);
    axios
      .get(API_URL + "/inventories")
      .then((response) => {
        setInventoryList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // This useEffect is used to fetch the list of inventories from the API
  useEffect(() => {
    fetchInventories();
  }, []);

  return (
    <>
      {!showModal ? (
        !isLoading ? (
          <InventoryList
            inventoryList={inventoryList}
            setSelectedInventoryName={setSelectedInventoryName}
            setSelectedInventoryId={setSelectedInventoryId}
            setShowModal={setShowModal}
          />
        ) : (
          <div className="isLoading">Loading...</div>
        )
      ) : viewWidth < 768 ? (
        // This is the mobile version of the modal
        <DeleteInventoryModal
          selectedInventoryName={selectedInventoryName}
          selectedInventoryId={selectedInventoryId}
          setShowModal={setShowModal}
          setSelectedInventoryName={setSelectedInventoryName}
          setSelectedInventoryId={setSelectedInventoryId}
          onDeleteSuccess={fetchInventories}
        />
      ) : !isLoading ? (
        <>
          <DeleteInventoryModal
            selectedInventoryName={selectedInventoryName}
            selectedInventoryId={selectedInventoryId}
            setShowModal={setShowModal}
            setSelectedInventoryName={setSelectedInventoryName}
            setSelectedInventoryId={setSelectedInventoryId}
            onDeleteSuccess={fetchInventories}
          />{" "}
          <InventoryList
            inventoryList={inventoryList}
            setSelectedInventoryName={setSelectedInventoryName}
            setSelectedInventoryId={setSelectedInventoryId}
            setShowModal={setShowModal}
          />
        </>
      ) : (
        <div className="isLoading">Loading...</div>
      )}
    </>
  );
}

export default Inventory;
