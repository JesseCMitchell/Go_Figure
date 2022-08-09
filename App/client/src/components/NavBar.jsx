/** @format */
import { orange } from '@mui/material/colors';
import React from 'react';
import NestedModal from './LoginModal';

const NavBar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light shadow'>
			<div className='container'>
				<a className='navbar-brand' href='/'>
					<img
						className='rounded shadow mb-0'
						src={process.env.PUBLIC_URL + '/logo.png'}
						alt=''
						style={{ width: '85px', height: '85px' }}
					/>
				</a>
				<div className='me-auto mb-0'>
					<h4 className='bangers navFontLg'>Go Figure!</h4>
					<h6 className='bangers navFontSm'>Collectible Marketplace</h6>
				</div>

				<a className='nav-link active fw-bold' href='/'>
					Dashboard
				</a>
				<a className='nav-link active fw-bold' href='/items/create'>
					My Collection
				</a>
				{/* <a className='nav-link active fw-bold' href='/users/login'>
							</a> */}
				<NestedModal></NestedModal>
			</div>
		</nav>
	);
};

export default NavBar;
