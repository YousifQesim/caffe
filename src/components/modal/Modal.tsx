import { useOrder } from "../../context/OrderContext";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import TableSelection from "../../components/TableSelection";

import api from "../../utilities/getServer";

export default function modal() {
  const {
    selectedItems,
    changeQuantity,
    removeItem,
    setIsModalOpen,
    isModalOpen,
    orders,
    tableNumber,
    clearSelectedItems,
  } = useOrder();


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmitOrder = () => {
    if (tableNumber === null || selectedItems.length === 0) {
      return window.alert("Please select a table number and items to order.");
    }

    // Check if there is a table with the same table number
    const existingTable = orders.find(
      (order) => order.tableNumber === tableNumber
    );


    const orderData = {
      tableNumber,
      items: selectedItems.map((selectedItem) => ({
        id: selectedItem.item.id,
        quantity: selectedItem.quantity,
      })),
    };

    if (existingTable) {
      api(`/orders/${existingTable.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order updated:", data);
          clearSelectedItems();
          setIsModalOpen(false);
        })
        .catch((error) => console.error("Error updating order:", error));
    } else {
      api("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order submitted:", data);
          clearSelectedItems();
          setIsModalOpen(false);
        })
        .catch((error) => console.error("Error submitting order:", error));
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      contentLabel="Selected Items"
      className="modal border rounded-xl "
      overlayClassName="modal-overlay"
    >
      <div className="p-4 sm:p-8 lg:p-16 bg-main text-white rounded-xl relative">
        <h2 className="text-xl font-bold mb-4 text-center">Selected Items</h2>
        <button onClick={toggleModal} className="absolute top-2 right-2">
          <FaTimes size={24} />
        </button>
        {selectedItems.length === 0 ? (
          <p>No items selected.</p>
        ) : (
          selectedItems.map((selectedItem, index) => (
            <table key={index} className="w-full">
              <tbody className="">
                <tr className="min-w-full flex items-center ">
                  <td className="py-4 text-left   font-medium text-gray-900 sm:w-1/3">
                    {selectedItem.item.name} - {selectedItem.item.price} IQD
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center text-sm text-gray-500 sm:w-1/3">
                    <input
                      type="number"
                      value={selectedItem.quantity}
                      onChange={(e) =>
                        changeQuantity(
                          selectedItem.item.id,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-16 p-2 text-cat border rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sm:w-1/3">
                    <button
                      onClick={() => removeItem(selectedItem.item.id)}
                      className="px-4 py-2 w-auto bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 "
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        )}
        <div className="my-4">
          {selectedItems.length !== 0 ? <TableSelection /> : <p></p>}
        </div>
        {selectedItems.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSubmitOrder}
              className="px-4 py-2 bg-category_back text-white rounded-lg transition duration-300"
            >
              Submit Order
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
