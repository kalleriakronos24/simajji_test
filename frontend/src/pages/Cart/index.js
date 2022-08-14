import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

const CartPage = () => {
	const [productList, setProductList] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	const fetchCart = async () => {
		// user id 3
		await fetch('http://localhost:8000/api/v1/cart/list/user/3', {
			method: 'get',
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('success get data >> ', data);
				setProductList(data.data);
			})
			.catch((err) => {
				Swal.fire({
					title: 'Error!',
					text: 'Failed to get product list',
					icon: 'error',
					confirmButtonText: 'Okay',
				});
			});
	};

	const removeItemFromCart = async (id) => {
		await fetch(`http://localhost:8000/api/v1/cart/delete/${id}`, {
			method: 'get',
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
				Swal.fire({
					title: 'Error!',
					text: 'Failed to get product list',
					icon: 'error',
					confirmButtonText: 'Okay',
				});
			});
	};

	const checkoutToOrder = async (data) => {

        const priceAllItem = productList.reduce((a,b) => a + (b['items.price'] * b.qty),0);
        const allItemId = productList.map((v) => v['items.id']);
        const body = {
            totalPrice : priceAllItem,
            paymentMethod: 'visa',
            shippingAddress: 'test',
            isSuccessTransaction: false,
            userId: 3, // user id 3
            orderAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            cartItems: allItemId,
            transactionId: null
        }


		await fetch('http://localhost:8000/api/v1/order/add-new', {
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

	const updateCartQty = async (cartId, qty) => {
		console.log(Number(qty));
		await fetch('http://localhost:8000/api/v1/cart/update/qty', {
			method: 'post',
			body: JSON.stringify({
				cartId,
				qty: Number(qty),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then(async (data) => {
				await fetchAll();
				if (data.status === 'error') {
					Swal.fire({
						title: 'Error!',
						text: data.message,
						icon: 'error',
						confirmButtonText: 'Okay',
					});
				}
			})
			.catch((err) => {
				console.log('error >> ', err);
				Swal.fire({
					title: 'Error!',
					text: 'Failed to update cart qty',
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

	const fetchAll = async () => {
		await fetchCart();
		await fetchCartCount();
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
					<span className="uppercase p-5 text-lg font-bold align-middle">
						Cart ({cartCount})
					</span>
					<span className="uppercase p-5 text-lg font-bold align-middle">
						Logout
					</span>
				</div>
			</div>

			{/** Item List */}
			<div className="flex flex-col px-8 py-12 max-w-4xl mx-auto">
				<span className="font-medium text-center align-middle">Cart Item List</span>
				<div className="grid grid-cols-4 gap-6 mt-6">
					{!productList
						? null
						: productList.map((v) => {
								return (
									<div className="flex flex-col bg-sky-300 py-10 px-4">
										<div className="block">
											<span className="block">
												Item Name : {v['items.name']}
											</span>
											<span>Price/ea :{v['items.price']}</span>
											<span className="block">
												Item Qty :{v['items.stocks']}
											</span>
											<div className="inline-block">
												<span className="inline">
													Bought Qty :{' '}
												</span>
												<input
													onBlur={async (e) => {
														let qtyNumber = Number(
															e.target.value
														);
														if (qtyNumber <= 0) {
															qtyNumber = 1;
														}
														await updateCartQty(
															v.id,
															qtyNumber
														);
													}}
													onChange={async (e) => {
														let qtyNumber = Number(
															e.target.value
														);
														// if(qtyNumber <= 0) {
														//     qtyNumber = 1
														// }
														await updateCartQty(
															v.id,
															qtyNumber
														);
													}}
													type="number"
													className="inline w-10"
													value={v.qty}
												/>
											</div>
											<span className="block">
												Total Price : {v.price * v.qty}
											</span>
											<span className="block">
												Sold by : {v['users.firstName']}
											</span>
										</div>

										<button
											onClick={async () =>
												await removeItemFromCart(v.id)
											}
											className="bg-red-600 text-white p-3 mt-3 mx-auto"
										>
											Remove from cart
										</button>
									</div>
								);
						  })}
				</div>
				<button
					onClick={async () => {
						
						await checkoutToOrder();
					}}
					className="p-10 bg-indigo-200 mx-auto mt-20 justify-center align-middle"
				>
					Checkout All Items
				</button>
			</div>
		</div>
	);
};

export default CartPage;
