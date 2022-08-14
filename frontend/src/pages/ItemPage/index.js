import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ItemPage = () => {
	const [productList, setProductList] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	const fetchProduct = async () => {
		await fetch('http://localhost:8000/api/v1/item/list', {
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

	const addItemToCart = async (data) => {
		await fetch('http://localhost:8000/api/v1/cart/add-new', {
			method: 'post',
			body: JSON.stringify(data),
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
				await fetchCartCount();
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
		await fetchProduct();
		await fetchCartCount();
	};

	useEffect(() => {
		fetchAll();
	}, []);
	return (
		<div className="h-full w-full">
			{/** Header */}
			<div className="flex flex-row justify-between p-4 bg-sky-300">
				<span className="font-bold text-2xl uppercase text-white">Simajji Test</span>
				<div className="inline">
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
				<span className="font-medium text-center align-middle">Product List</span>
				<div className="grid grid-cols-4 gap-6 mt-6">
					{!productList
						? null
						: productList.map((v) => {
								return (
									<div className="bg-sky-300 py-10 px-4">
										<span className="block">
											Item Name : {v.name}
										</span>
										<span className="block">Stock : {v.stocks}</span>
										<span className="block">
											Price/ea : {v.price}
										</span>
										<span className="block">
											Sold by : {v.users.firstName}
										</span>

										<button
											onClick={async () => {
												await addItemToCart({
													itemId: v.id,
													qty: 1,
													price: v.price,
													userId: 3,
												});
											}}
											className="bg-blue-400 p-4 mt-4 mx-auto"
										>
											Add to cart
										</button>
									</div>
								);
						  })}
				</div>
			</div>
		</div>
	);
};

export default ItemPage;
