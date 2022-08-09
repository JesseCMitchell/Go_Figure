/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

function ChildModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<div className='text-center mt-5'>
				<h5>Already have an account?</h5>
			</div>
			<div className='text-center'>
				<Button onClick={handleOpen}>Login here!</Button>
			</div>
			<Modal hideBackdrop open={open} onClose={handleClose}>
				<Box sx={{ ...style, width: 300 }}>
					<p id='child-modal-description'>
						<LoginForm></LoginForm>
					</p>
					<Button onClick={handleClose}>Cancel</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default function NestedModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<a onClick={handleOpen} className='nav-link active fw-bold'>
				Sign Up
			</a>
			<Modal open={open} onClose={handleClose}>
				<Box sx={{ ...style, width: 400 }}>
					<h2 id='parent-modal-title' className='text-center'>
						Create an Account!
					</h2>
					<div id='parent-modal-description'>
						<RegistrationForm></RegistrationForm>
					</div>
					<div>
						<ChildModal />
					</div>
				</Box>
			</Modal>
		</div>
	);
}
