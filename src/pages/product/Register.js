import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProductRegisterPage() {

    const navigate = useNavigate();
    const [options, setOptions] = useState([]);


    const submitHandler = (evt) => {
        evt.preventDefault();
        const regData = new FormData(evt.target);

        fetch('http://localhost/webdev6/outdoor_backend/load.php/regProduct', {
            method: 'POST',
            body: regData,
        })
            .then(response => {
                if (response.status === 201) {
                    console.log("Success");
                    if (window.confirm("Product Registered! Do you want to move to product page?")) {
                        navigate('/products');
                    } else {
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const settingOptions = () => {
        fetch('http://localhost/webdev6/outdoor_backend/load.php/loadCategory')
            .then(response => response.json())
            .then(data => {
                setOptions(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        settingOptions();
    }, []);


    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-9">

                        <h1 className="text-black mb-4">Register Product</h1>

                        <form onSubmit={submitHandler}>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Product Name</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="pname" placeholder="Product Name" />
                                </div>

                            </div>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Category</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <select className="form-control form-control-lg" name="category_id">
                                        {options.map((option, index) => (
                                            <option key={index} value={option.cid}>
                                                {option.cname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Product Image </h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="image" placeholder="Upload Image" type="file" />
                                </div>
                            </div>
                            <div className="row align-items-center pt-4 pb-3">

                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Price</h6>
                                </div>
                                <div className="col-md-9 pe-5">

                                    <input className="form-control form-control-lg" name="price" placeholder="Price" step="0.1" type="number" />
                                </div>

                            </div>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="description" placeholder="Description" />
                                </div>
                            </div>
                            <div className="px-5 py-4">
                                <button type="submit" >
                                    Create Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}