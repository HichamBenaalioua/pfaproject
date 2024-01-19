import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Transaction() {
  const [budgetData, setBudgetData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const nom = useRef(null);
  const description = useRef(null);
  const moninit = useRef(null);
  const submitBtn = useRef(null);
  const idref = useRef(null);
  const budgetselect = useRef(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const responsetransaction = await axios.get(
        "http://localhost:8080/transaction/all"
      );
      const responsebudget = await axios.get(
        "http://localhost:8080/budget/all"
      );
      setTransactionData(responsetransaction.data);
      setBudgetData(responsebudget.data);
      console.log(responsebudget.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //handle update and add to transaction request
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    if (submitBtn.current.innerHTML === "Ajouter") {
      const postObject = {
        nom: data.get("nom"),
        description: data.get("description"),
        montant: data.get("moninit"),
        budget: {
          id: budgetselect.current.value,
        },
      };
      console.log(postObject);
      axios
        .post("http://localhost:8080/transaction/save", postObject)
        .then(() => navigate(0));
    } else if (submitBtn.current.innerHTML === "Modifier") {
      const postObject = {
        id: idref.current.innerHTML,
        nom: data.get("nom"),
        description: data.get("description"),
        montant: data.get("moninit"),
        budget: {
          id: budgetselect.current.value,
        },
      };
      axios
        .post("http://localhost:8080/transaction/save", postObject)
        .then(() => navigate(0));
    }
  };

  //handle modify request
  const handleModify = async (id, budgetid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/transaction/${id}`
      );
      nom.current.value = response.data.nom;
      description.current.value = response.data.description;
      moninit.current.value = response.data.montant;
      idref.current.innerHTML = response.data.id;
      //console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    submitBtn.current.innerHTML = "Modifier";
    console.log(budgetid);
    budgetselect.current.value = budgetid;
  };

  //handle delete request
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/transaction/delete/${id}`)
      .then(() => navigate(0));
  };

  return (
    <>
      <h1 className=" text-5xl font-extrabold dark:text-white pb-4">
        Gestion des Transactions
      </h1>

      <form className="pb-4" onSubmit={handleSubmit}>
        <span ref={idref} className="text-white">
          id
        </span>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nom"
            id="nom"
            ref={nom}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="nom"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nom
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="description"
            id="description"
            ref={description}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="moninit"
            id="moninit"
            ref={moninit}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="moninit"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Montant
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="budgetselect"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            choisir une budget
          </label>
          <select
            id="budgetselect"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={budgetselect}
          >
            {budgetData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          ref={submitBtn}
        >
          Ajouter
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                nom
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                montant
              </th>
              <th scope="col" className="px-6 py-3">
                budget
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((item) => (
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
                <td className="px-6 py-4">{item.nom}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.montant}</td>
                <td className="px-6 py-4">{item.budget.nom}</td>
                <td className="px-6 py-4">
                  <span
                    href="#"
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleModify(item.id, item.budget.id)}
                  >
                    Modifier
                  </span>
                  <span
                    onClick={() => handleDelete(item.id)}
                    className="font-medium cursor-pointer pl-4 text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Supprimer
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

export default Transaction;
