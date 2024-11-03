import React from "react";
import { Alert, Box, Typography } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';

const OrderCompletion = () => {

	return (
		<Box display="flex" justifyContent="center">
			<Box>
				<br />
				<Alert severity="success">
					<AlertTitle>Success</AlertTitle>
					<Typography variant='body3'>Your order has been placed!</Typography>
				</Alert>
			</Box>
		</Box>
	);
};

export default OrderCompletion;