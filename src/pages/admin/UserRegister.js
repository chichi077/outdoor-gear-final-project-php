import React, { useEffect } from 'react';

export function UserRegisterPage() {

    const submitHandler = (evt) => {
        evt.preventDefault();
        const regData = new FormData(evt.target);
        console.log(regData);
        fetch('http://localhost/outdoor-gear-final-project%20(php)/php/classSolution.php/reg', {
            method: 'POST',
            body: regData,
        })
            .then(response => {
                if (response.status === 201) { // navigate('/products');
                    // if (window.confirm("Product registered successfully! Would you like to proceed to the product page?")) {
                    //     navigate('/products', {
                    //         replace: true
                    //     });
                    // } else {
                    // }
                    window.alert("User registered successfully!");
                    window.location.href = '/login';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    useEffect(() => {

    }, []);


    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-9">

                        <h1 className="text-black mb-4">Welcome to Outdoor Web Page</h1>

                        <form onSubmit={submitHandler}>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">First Name</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="first_name" placeholder="First Name" />
                                </div>
                            </div>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Last Name</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="last_name" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="email" placeholder="Email" type="email" />
                                </div>
                            </div>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Password</h6>
                                </div>
                                <div class="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" name="password" placeholder="Password" type="password" />
                                </div>
                            </div>
                            <div className="px-5 py-4">
                                <button type="submit" >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}