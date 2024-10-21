import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const ItemDisplay = () => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 400 }}>
			<CardMedia sx={{ height: 175 }} image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/300px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg" />
			<CardContent>
				<Typography gutterBottom variant='h5'>Book</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>This is a description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in nisl id ante mollis lacinia. Ut ultrices mollis elit id rutrum. Nunc nisi risus, laoreet quis risus quis, pellentesque eleifend quam. Cras accumsan, orci sagittis elementum pretium, mi erat lacinia quam, quis molestie augue lacus sit amet dui. Integer suscipit interdum nisl, eget sagittis mi mollis et. Maecenas mollis, nisl sollicitudin auctor venenatis, libero diam tempor orci, quis malesuada turpis odio vel leo. Etiam quam turpis, dictum nec felis ultricies, posuere vehicula risus. Ut finibus nisi neque, sed tincidunt lorem cursus at. In placerat, erat a eleifend aliquet, felis elit pellentesque dolor, quis porttitor orci massa a risus. Nullam sit amet placerat nisl. Fusce nec diam vehicula, porttitor sapien ac, accumsan elit. </Typography>
			</CardContent>
		</Card>
    );
}

export default ItemDisplay;