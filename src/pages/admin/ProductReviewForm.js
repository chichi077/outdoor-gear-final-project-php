import React, { useState } from 'react';

export default function ProductReviewForm() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleAddReview = () => {
        if (!newReview.trim()) return;
        setReviews(prevReviews => [...prevReviews, newReview]);
        setNewReview('');
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            <div>
                <input
                    onChange={(event) => setNewReview(event.target.value)} // 'e'를 'event'로 변경
                    placeholder="add review"
                    type="text"
                    value={newReview}
                />
                <button onClick={handleAddReview} type="button">add review</button>
            </div>
            <div>
                <button onClick={toggleModal} type="button">show review</button>
            </div>
            {showModal && (
                <div className="modal show d-block" role="dialog" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title">review</h5>
                            </div>
                            <div className="modal-body">
                                {reviews.length > 0 ? (
                                    <ul>
                                        {reviews.map((review, index) => (
                                            <li key={index}>{review}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>no review</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={toggleModal} type="button">close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}