/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import { useNavigate, Link } from 'react-router-dom';
import { FormControlLabel, MenuItem } from '@mui/material';

const styles = {
	paper: {
		width: 'auto',
		padding: '2em',
	},
	input: {
		marginBottom: '1rem',
	},
};

const ItemForm = props => {
	let [items, setItems] = useState([]);
	let [itemDeleted, setItemDeleted] = useState(false);
	let [formInfo, setFormInfo] = useState({
		title: '',
		price: '',
		description: '',
		imgUrl: '',
		dateAdded: '',
		forSale: '',
		photo: '',
		itemCondition: '',
	});

	// axios for submitting form to create new item
	useEffect(() => {
		axios
			.get('http://localhost:8000/api/items')
			.then(response => {
				console.log('response: ', response);
				setItems(response.data.results);
			})
			.catch(err => console.log(err));
	}, [itemDeleted, props.formSubmitted]);

	// axios for tracking logged in user information
	let [loggedInUser, setLoggedInUser] = useState({});
	useEffect(() => {
		axios
			.get('http://localhost:8000/api/users/getloggedinuser', { withCredentials: true })
			.then(res => {
				console.log('res when getting logged in user', res);
				if (res.data.results) {
					//this means the user is logged in and can access this page
					setLoggedInUser(res.data.results);
				}
			})
			.catch(err => {
				//this means someone who is not logged in tried to access the page
				console.log('err when getting logged in user', err);
				navigate('/');
			});
	}, []);

	// axios for logging out a user
	const logout = () => {
		axios
			.get('http://localhost:8000/api/users/logout', { withCredentials: true })
			.then(res => {
				navigate('/');
			})
			.catch(err => {
				console.log('errrr logging out', err);
			});
	};
	// axios for deleting one item
	// const deleteItem = _id => {
	// 	axios
	// 		.delete(`http://localhost:8000/api/items/${_id}`)
	// 		.then(response => {
	// 			setItemDeleted(!itemDeleted);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	let [formErrors, setFormErrors] = useState({});
	const changeHandler = e => {
		if (e.target.type === 'dropdown') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.value,
			});
		} else if (e.target.type === 'checkbox') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.checked,
			});
		} else if (e.target.type === 'file') {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.files[0],
			});
		} else {
			setFormInfo({
				...formInfo,
				[e.target.name]: e.target.value,
			});
		}
	};
	const navigate = useNavigate();

	// if there are any errors, then save the errors to a state variable
	// when submitting an incomplete form -> response looks like this: response.data.errors
	// when submitting a complete form -> response looks like this: response.data.results
	const handleSubmit = e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', formInfo.title);
		formData.append('price', formInfo.price);
		formData.append('description', formInfo.description);
		formData.append('imgUrl', formInfo.imgUrl);
		formData.append('dateAdded', formInfo.dateAdded);
		formData.append('itemCondition', formInfo.itemCondition);
		formData.append('forSale', formInfo.forSale);
		formData.append('photo', formInfo.photo);

		// axios.post('http://localhost:8000/api/items', formData)
		axios({
			method: 'post',
			url: 'http://localhost:8000/api/items',
			data: formData,
		})
			.then(response => {
				console.log('Error response from submission form', response);
				if (response.data.errors) {
					setFormErrors(response.data.errors);
				} else {
					setFormErrors({});
					props.setFormSubmitted(props.formSubmitted);
					navigate('/');
				}
			})
			.catch(err => console.log(err));
	};

	// returning the create form from our Form.js
	return (
		<div>
			<div className='d-grid'>
				<div className='d-grid justify-content-end'>
					<button onClick={logout} className='btn btn-outline-primary shadow me-3'>
						Log Out
					</button>
				</div>
				<div className='d-grid justify-content-center'>
					<h2 className='welcomeFont'>Welcome, {loggedInUser.firstName}!</h2>
				</div>
			</div>
			<div>
				<Paper elevation={3} style={styles.paper}>
					<div className='text-center'>
						<h2 className='fw-bold bangers'>Add an Item ...</h2>
					</div>
					<form onSubmit={handleSubmit} encType='multipart/form-data'>
						<Grid container>
							<Grid container direction='row' spacing={2}>
								<Grid item xs={6} sm={8}>
									<FormGroup variant='outlined' style={styles.input}>
										{/* <label htmlFor=''>Item Title:</label> */}
										<TextField
											label='Item Title'
											onChange={changeHandler}
											type='text'
											name='title'
											id=''
											className='form-control'
											value={formInfo.title}
										/>
										<p className='text-danger'>{formErrors.title?.message}</p>
									</FormGroup>
								</Grid>
								<Grid item xs={6} sm={4}>
									<FormGroup variant='outlined' style={styles.input}>
										{/* <label htmlFor=''>Price:</label> */}
										<TextField
											label='Price $'
											onChange={changeHandler}
											type='number'
											name='price'
											id=''
											className='form-control'
											value={formInfo.price}
										/>
										<p className='text-danger'>{formErrors.price?.message}</p>
									</FormGroup>
								</Grid>
							</Grid>
						</Grid>
						<FormGroup variant='outlined' style={styles.input}>
							<TextField
								label='Description'
								onChange={changeHandler}
								type='text'
								name='description'
								id=''
								multiline
								rows={3}
								className='form-control'
								value={formInfo.description}
							/>
							<p className='text-danger'>{formErrors.description?.message}</p>
						</FormGroup>
						<Grid container>
							<Grid container direction='row' spacing={8}>
								<Grid item xs>
									<FormGroup variant='outlined' style={styles.input}>
										<input
											onChange={changeHandler}
											type='date'
											name='dateAdded'
											label='Date Added'
											id=''
											inputFormat='MM/dd/yyyy'
											className='form-control p-3'
											value={formInfo.dateAdded}
										/>
										<p className='text-danger'>
											{formErrors.dateAdded?.message}
										</p>
									</FormGroup>
								</Grid>
								<Grid item xs>
									<FormControl sx={{ m: 0, width: 300 }}>
										<InputLabel id='select-label'>Item Condition</InputLabel>
										<Select
											labelId='select-label'
											id='condition-select'
											label='Item Condition'
											name='itemCondition'
											value={formInfo.itemCondition}
											onChange={changeHandler}>
											<MenuItem value='Mint'>Mint</MenuItem>
											<MenuItem value='Like New'>Like New</MenuItem>
											<MenuItem value='Damaged Package'>
												Damaged Package
											</MenuItem>
											<MenuItem value='Loose'>Loose</MenuItem>
											<MenuItem value='Incomplete / Damaged'>
												Incomplete/Damaged
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs>
									<FormControl sx={{ m: 0, width: 200 }}>
										<Stack direction='row' alignItems='center' spacing={2}>
											<Button
												variant='contained'
												component='label'
												size='large'>
												Upload
												<input
													onChange={changeHandler}
													hidden
													type='file'
													accept='.png, .jpg, .jpeg'
													name='photo'
													id='formFile'
												/>
											</Button>
											<IconButton
												color='primary'
												aria-label='upload picture'
												component='label'
												size='large'>
												<input
													onChange={changeHandler}
													hidden
													accept='.png, .jpg, .jpeg'
													type='file'
													name='photo'
													id='formFile'
												/>
												<PhotoCamera fontSize='inherit' />
											</IconButton>
										</Stack>
									</FormControl>
									{/* <FormControl className='photoUpload'>
									<input
										onChange={changeHandler}
										type='file'
										accept='.png, .jpg, .jpeg'
										name='photo'
										className='form-control'
										id='formFile'
									/>
								</FormControl> */}
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid container spacing={0}>
								<Grid item>
									<FormGroup>
										<FormControlLabel
											control={
												<Switch
													onChange={changeHandler}
													type='checkbox'
													name='forSale'
													id='flexSwitchCheckDefault'
													value={formInfo.forSale}
												/>
											}
											label='For Sale'
										/>
									</FormGroup>
								</Grid>
							</Grid>
						</Grid>
						<div className='d-grid'>
							<div className='d-grid d-md-flex justify-content-between'>
								{/* <div className='box'>
								<select
									label='Item Condition'
									className='rounded ms-3 shadow'
									onChange={changeHandler}
									type='dropdown'
									name='itemCondition'
									value={formInfo.itemCondition}>
									<option value=''>Item Condition</option>
									<option value='Mint'>Mint</option>
									<option value='Like New'>Like New</option>
									<option value='Damaged Package'>Damaged Package</option>
									<option value='Loose'>Loose</option>
									<option value='Incomplete/Damaged'>Incomplete/Damaged</option>
								</select>
							</div> */}
							</div>
						</div>
						<div className=''>
							<div className='d-flex justify-content-end'>
								<input
									type='submit'
									value='Submit'
									className='btn btn-primary btn-lg mt-3 shadow'
								/>
							</div>
						</div>
					</form>
				</Paper>
			</div>
			<hr />
			<div>
				<Paper elevation={3} style={styles.paper}>
					<div
						style={{
							backgroundImage: `url(${process.env.PUBLIC_URL + '/background.png'})`,
							backgroundSize: 'cover',
							width: 'auto',
						}}>
						<div id='wrapper'>
							<h1 className='title2 text-center h1'>Your Items :</h1>
							<div className='module-section clearfix'>
								{/* <button className='btn arrow-guides fa-chevron-left'></button> */}
								<ul id='content'>
									{items.map((item, i) => {
										return (
											<Link to={`/items/${item._id}`}>
												<li key={i} className='carouselCard effect1'>
													<div
														className='inside-top'
														style={{
															backgroundImage: `url(${`http://localhost:8000/${item.photo}`})`,
															backgroundSize: '10em',
															backgroundPosition: 'center',
															backgroundRepeat: 'no-repeat',
															backgroundColor: 'rgb(51,51,51)',
															width: '250px',
														}}></div>
													{/* <img src={item.profilePicUrl} height = "100px" width= "100px"/> */}
													<div className='card-body text-center fixed-bottom'>
														<h5 className='card-title'>{item.title}</h5>
														<p className='card-text'>
															Price: ${item.price}
														</p>
													</div>
												</li>
											</Link>
										);
									})}
								</ul>
							</div>
							{/* <button className='btn arrow-guides-right fa-chevron-right'></button> */}
						</div>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default ItemForm;
