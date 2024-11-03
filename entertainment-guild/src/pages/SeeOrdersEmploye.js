import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style.css";
import "../helpers/HandleCookies";
import { TextField } from "@mui/material";

const SeeOrdersEmploye = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const [response1, response2, response3] = await Promise.all([
                    axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/Orders?limit=1000", {
                        headers: {
                            'Accept': 'application/json',
                            'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                        }
                    }),
                    axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/TO?limit=1000", {
                        headers: {
                            'Accept': 'application/json',
                            'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                        }
                    }),
                    axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000", {
                        headers: {
                            'Accept': 'application/json',
                            'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                        }
                    })
                ]);

                const ordersList = response1.data.list;
                const toList = response2.data.list;
                const productsList = response3.data.list;

                const mergedOrders = ordersList.map(order => {
                    const matchingCustomer = toList.find(customer => customer.CustomerID === order.Customer);
                    const productNames = order["Stocktake List"].map(product => {
                        const matchedProduct = productsList.find(p => p.ID === product.ItemId);
                        return matchedProduct ? matchedProduct.Name : "Unknown Product";
                    });
                    console.log("Matching Customer:", matchingCustomer);


                    return {
                        ...order,
                        Name : matchingCustomer ? matchingCustomer.CardOwner : null,
                        Email: matchingCustomer ? matchingCustomer.Email : null,
                        PhoneNumber: matchingCustomer ? matchingCustomer.PhoneNumber : null,
                        ProductNames: productNames.join(", "),
                    };

            });

                setOrders(mergedOrders);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.Name && order.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Email && order.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.PhoneNumber && order.PhoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="containerTextField">
                <TextField
                    id="standard-basic"
                    label="Search orders..."
                    variant="standard"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="searchField"
                />
            </div>
            <div className="stockTableWrap">
                {filteredOrders.length > 0 ? (
                    <table className="userTable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Post Code</th>
                            <th>Suburb</th>
                            <th>State</th>
                            <th>Products</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={index} className={index % 2 === 0 ? "evenRow" : "oddRow"}>
                                <td>{order.Name}</td>
                                <td>{order.Email ? order.Email : "No Email"}</td>
                                <td>{order.PhoneNumber ? order.PhoneNumber : "No Phone Number"}</td>
                                <td>{order.StreetAddress ? order.StreetAddress : "No Address"}</td>
                                <td>{order.PostCode ? order.PostCode : "No Post Code"}</td>
                                <td>{order.Suburb ? order.Suburb : "No Suburb"}</td>
                                <td>{order.State ? order.State : "No State"}</td>
                                <td>{order.ProductNames}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default SeeOrdersEmploye;
