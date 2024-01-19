import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Budget() {
  const [demandes, setDemandes] = useState([]);
  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/demandes/all"
      );
      //console.log(response.data.filter((item) => item.status === null));
      setDemandes(response.data.filter((item) => item.status === null)); // Reverse the order of the list
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (item) => {
    item.status = "accepté";

    try {
      const response = await axios.post(
        "http://localhost:8080/api/demandes/save",
        item
      );
      console.log(response.data);
      fetchDemandes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefuse = async (item) => {
    item.status = "refusé";

    try {
      const response = await axios.post(
        "http://localhost:8080/api/demandes/save",
        item
      );
      console.log(response.data);
      fetchDemandes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className=" text-5xl font-extrabold dark:text-white pb-4">
        Gestion des Demandes
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Objet de Demande
              </th>
              <th scope="col" className="px-6 py-3">
                Message de demande
              </th>
              <th scope="col" className="px-6 py-3">
                Utilisateur
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4">{item.objet}</td>
                <td className="px-6 py-4">{item.textdemande}</td>
                <td className="px-6 py-4">{item.user.nom}</td>

                <td className="px-6 py-4">
                  <span
                    onClick={() => handleAccept(item)}
                    href="#"
                    className="font-medium cursor-pointer text-green-600 dark:text-blue-500 hover:underline"
                  >
                    Accepter
                  </span>
                  <span
                    onClick={() => handleRefuse(item)}
                    className="font-medium cursor-pointer pl-4 text-red-600 dark:text-blue-500 hover:underline"
                  >
                    Refuser
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Budget;
