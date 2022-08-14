import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderPage = () => {
    const [orderData, setOrderData] = useState({});
	const [cartCount, setCartCount] = useState(0);
	const [orderCount, setOrderCount] = useState(0);

	const fetchOrderCount = async () => {
		// 3 is user id
		await fetch('http://localhost:8000/api/v1/order/count/3', {
			method: 'get',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data >> ', data.data);
				if (data.status === 'error') {
					Swal.fire({
						title: 'Error!',
						text: 'Failed to get count of order',
						icon: 'error',
						confirmButtonText: 'Okay',
					});
				}

				setOrderCount(data.data.count);
			})
			.catch((err) => {
				console.log('error >> ', err);
				Swal.fire({
					title: 'Error!',
					text: 'Failed to get count of order',
					icon: 'error',
					confirmButtonText: 'Okay',
				});
			});
	};

	const fetchCartCount = async () => {
		// 3 is user id
		await fetch('http://localhost:8000/api/v1/cart/count/3', {
			method: 'get',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data >> ', data.data);
				if (data.status === 'error') {
					Swal.fire({
						title: 'Error!',
						text: 'Failed to get count of cart',
						icon: 'error',
						confirmButtonText: 'Okay',
					});
				}

				setCartCount(data.data.count);
			})
			.catch((err) => {
				console.log('error >> ', err);
				Swal.fire({
					title: 'Error!',
					text: 'Failed to add to cart',
					icon: 'error',
					confirmButtonText: 'Okay',
				});
			});
	};


    const fetchOrderData = async () => {
		// 3 is user id
		await fetch('http://localhost:8000/api/v1/order/3', {
			method: 'get',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data >> ', data.data);
				if (data.status === 'error') {
					Swal.fire({
						title: 'Error!',
						text: 'Failed to get order data',
						icon: 'error',
						confirmButtonText: 'Okay',
					});
				}

				setCartCount(data.data.count);
			})
			.catch((err) => {
				console.log('error >> ', err);
				Swal.fire({
					title: 'Error!',
					text: 'Failed to get order data',
					icon: 'error',
					confirmButtonText: 'Okay',
				});
			});
	};

	const fetchAll = async () => {
		await fetchCartCount();
		await fetchOrderCount();
	};

	useEffect(() => {
		fetchAll();
	}, []);
	return (
		<div className="h-full w-full">
			{/** Header */}
			<div className="flex flex-row justify-between p-4 bg-sky-300">
				<Link to="/item-page" className="font-bold text-2xl uppercase text-white">
					Simajji Test
				</Link>
				<div className="inline">
					<Link to="/order" className="uppercase p-5 text-lg font-bold align-middle">
						Orders ({orderCount})
					</Link>
					<Link to="/cart" className="uppercase p-5 text-lg font-bold align-middle">
						Cart ({cartCount})
					</Link>
					<span className="uppercase p-5 text-lg font-bold align-middle">
						Logout
					</span>
				</div>
			</div>

			{/** Item List */}
			<div className="px-8 py-12 max-w-4xl mx-auto">
				<span className="font-medium text-center align-middle">Order Summary</span>
				<div className="grid grid-cols-4 gap-6 mt-6">
					<span>test</span>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
