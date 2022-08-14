import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const OrderPage = () => {
	const [orderData, setOrderData] = useState({});
	const [cartCount, setCartCount] = useState(0);
	const [orderCount, setOrderCount] = useState(0);
	const [orderItems, setOrderItems] = useState([]);

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
			.then(async (data) => {
				console.log('data >> ', data.data);
				if (data.status === 'error') {
					Swal.fire({
						title: 'Error!',
						text: 'Failed to get order data',
						icon: 'error',
						confirmButtonText: 'Okay',
					});
				}

				setOrderData(data.data);

				await fetchOrderItems(data.data.id)
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

	const fetchOrderItems = async (id) => {
		await fetch(`http://localhost:8000/api/v1/order-details/list/${id}`, {
			method: 'get',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('data.data >>', data.data)
				if (data.status === 'error') {
					Swal.fire({
						title: 'Error!',
						text: 'Failed to get order items',
						icon: 'error',
						confirmButtonText: 'Okay',
					});
				}

				setOrderItems(data.data);
			})
			.catch((err) => {
				console.log('error >> ', err);
				Swal.fire({
					title: 'Error!',
					text: 'Failed to get order items',
					icon: 'error',
					confirmButtonText: 'Okay',
				});
			});
	};

	const makeTransaction = async (body) => {
		// 3 is user id
		await fetch(`http://localhost:8000/api/v1/transaction/add-new`, {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then(async (data) => {
				Swal.fire({
					title: data.status === 'error' ? 'Error!' : 'Success!',
					text: data.status === 'error' ? data.message : data.message,
					icon: data.status === 'error' ? 'error' : 'success',
					confirmButtonText: 'Okay',
				});

				await fetchAll();
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
		await fetchOrderData();
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
				<div className="flex flex-col mt-10">
					{!!orderData ? (
						<div className="flex flex-col">
							<span>Transaction ID : {orderData.transactionId}</span>
							<span>
								Order At :{' '}
								{moment(orderData.orderAt).format('ddd DD, MMM YYYY')}
							</span>
							<span>Payment Method : {orderData.paymentMethod}</span>
							<span>Total Amount : {orderData.totalPrice}</span>
							<span>Shipping Address : {orderData.shippingAddress}</span>
							<span>
								Status :{' '}
								{orderData.isSuccessTransaction
									? 'Done | Shipped'
									: 'Not Yet'}
							</span>

							<div className="mt-5">
								<span>Your Items</span>

								<div className="p-6 flex flex-col">
									{orderItems ? orderItems.map((v) => {
										return (
											<>
												<span>Item Name : {v['items.name']}</span>
											</>
										)
									}) : (
										<span>- No Item Was Found -</span>
									)}
								</div>
							</div>
						</div>
					) : (
						<span>- No Order Was Found -</span>
					)}

					{orderData.isSuccessTransaction ? (
						<span className="mt-10 p-10 bg-blue-300 text-lg font-bold text-white">
							Transaction Was Done, your item is now shipped to you address.
						</span>
					) : (
						<button
							onClick={async () => {
								await makeTransaction({
									orderId: orderData.id,
									transferAt: moment().format('YYYY-MM-DD HH:mm:ss'),
								});
							}}
							className="mt-10 p-10 bg-blue-300 text-lg font-bold text-white"
						>
							Transfer Now
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
