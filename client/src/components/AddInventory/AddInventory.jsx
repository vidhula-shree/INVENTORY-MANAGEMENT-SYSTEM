import TitleComponent from "../TitleComponent/TitleComponent";
import InputComponent from "../Input/Input";
import DropdownSelect from "../Dropdown/Dropdown";
import RadioButtons from "../RadioButton/RadioButton";
import ButtonEl from "../Button/Button";
import { useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
/**
 *
 * @param {*} props
 * @returns Renders Add Inventory Form component
 */

function AddInventory(props) {
	const params = useParams();
	const navigate = useNavigate();
	const [showQuantity, setShowQuantity] = useState(true);
	let formData = useRef({
		warehouse_id: "",
		item_name: "",
		description: "",
		category: "",
		status: "",
		quantity: "",
	});

	function setFormData(newFormData) {
		formData.current = newFormData;
	}

	const setWarehouseId = (newFormData) => {
		const warehouse_name = newFormData.warehouse_name;
		const warehouses = {
			Manhattan: 1,
			Washington: 2,
			Jersey: 3,
			SF: 4,
			"Santa Monica": 5,
			Seattle: 6,
			Miami: 7,
			Boston: 8,
		};

		const id = warehouses[warehouse_name];
		setFormData({ ...formData.current, ["warehouse_id"]: id });
	};

	const onChangeFormhandler = (event) => {
		setFormData({
			...formData.current,
			[event.target.name]: event.target.value,
		});
	};

	const backButtonHandler = (event) => {
		event.preventDefault();
		navigate(-1);
	};

	const postData = async (postFormData) => {
		const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
		axios
			.post(`${API_URL}/inventories/`, postFormData)
			.then((res) => {
				alert(`Item has been added successfully!`);
				navigate('/inventory');
			})
			.catch((err) => {
				const errorMessage = err.response?.data || err.message || 'Unknown error';
				alert(
					`Error adding item: ${errorMessage}`
				);
				console.error('Error details:', err);
			});
	};

	const formHandler = async (event) => {
		event.preventDefault();
		
		// Update warehouse_id before validation
		setWarehouseId(formData.current);
		
		// Wait a moment for state to update, then get the updated formData
		const updatedFormData = { ...formData.current };
		const warehouses = {
			Manhattan: 1,
			Washington: 2,
			Jersey: 3,
			SF: 4,
			"Santa Monica": 5,
			Seattle: 6,
			Miami: 7,
			Boston: 8,
		};
		
		if (updatedFormData.warehouse_name && warehouses[updatedFormData.warehouse_name]) {
			updatedFormData.warehouse_id = warehouses[updatedFormData.warehouse_name];
		}
		
		console.log(updatedFormData);
		
		//Form validation logic
		if (
			!updatedFormData.warehouse_id ||
			!updatedFormData.item_name ||
			!updatedFormData.category ||
			updatedFormData.category === "Please select a category" ||
			!updatedFormData.description ||
			!updatedFormData.status ||
			updatedFormData.warehouse_name === "Please select a Warehouse"
		) {
			alert("Please fill in all required fields");
			return;
		}
		
		// Convert quantity to number and ensure it's valid
		const quantity = updatedFormData.status === "Out of Stock" ? 0 : parseInt(updatedFormData.quantity) || 0;
		
		// Prepare data for API
		const postDataPayload = {
			warehouse_id: updatedFormData.warehouse_id,
			item_name: updatedFormData.item_name,
			description: updatedFormData.description,
			category: updatedFormData.category,
			status: updatedFormData.status,
			quantity: quantity
		};

		postData(postDataPayload);
	};

	function showQuantityFunc(show) {
		if (show === "In Stock") {
			setShowQuantity(true);
		} else {
			setShowQuantity(false);
		}
	}

	return (
		<>
			<TitleComponent
				title='Add Inventory Item'
				backButton={true}
			/>

			<section className='card-container__background'>
				<div className='card-container__card'>
					<div className='inventory-edit__container'>
						<form
							className='inventory-edit__form'
							onSubmit={formHandler}
							onChange={onChangeFormhandler}>
							<div className='inventory-edit__form__row'>
								<div className='inventory-edit__form__column'>
									<h2 className='inventory-edit__form__header'>
										Item Details
									</h2>
									<InputComponent
										labelName='Item Name'
										fieldName='item_name'
										defaultValue='Add Item Name'
										error={false}
									/>
									<InputComponent
										labelName='Description'
										type='textarea'
										defaultValue='Add a description'
										fieldName='description'
										error-description={false}
									/>
									<DropdownSelect
										labelName='Category'
										items={[
											"Please select a category",
											"Electronics",
											"Gear",
											"Apparel",
											"Accessories",
											"Health",
										]}
										defaultValue='Please select a category'
										fieldName='category'
										error-category={false}
									/>
								</div>

								<div className='inventory-edit__form__column'>
									<h2 className='inventory-edit__form__header'>
										Item Availabilty
									</h2>
									<RadioButtons
										labelName='Status'
										items={["In Stock", "Out of Stock"]}
										error-status={false}
										fieldName='status'
										defaultValue={`${
											formData.current.status
										}`}
										onChange = {(event) => showQuantityFunc(event.target.value)}
									/>

									{showQuantity && (
										<InputComponent
											labelName='Quantity'
											defaultValue='0'
											fieldName='quantity'
											error-quantity={false}
										/>
									)}

									<DropdownSelect
										labelName='Warehouse'
										items={[
											"Please select a Warehouse",
											"Manhattan",
											"Washington",
											"Jersey",
											"SF",
											"Santa Monica",
											"Seattle",
											"Miami",
											"Boston",
										]}
										defaultValue='Please select a Warehouse'
										error={false}
										fieldName='warehouse_name'
									/>
								</div>
							</div>
							<div className='inventory-edit__form__row'>
								<div className='inventory-edit__form__buttons'>
									<ButtonEl
										title='Cancel'
										buttonType='cancel'
										onClick={backButtonHandler}
									/>
									<ButtonEl
										title='+ Add Item'
										type='submit'
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}

export default AddInventory;