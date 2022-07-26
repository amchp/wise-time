import React from 'react'
import { Grid, Button } from '@mui/material/';
import { FaWindowClose } from "react-icons/fa";
const VideoContainer = ({ cambiarEstado }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1/2,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Grid container sx={{ ...style }} >
            <Grid container item direction="row" justifyContent="flex-end">
                <Button onClick={cambiarEstado}><FaWindowClose/></Button>
            </Grid>
            <iframe width={560*(3/2)} height={315*(3/2)} src="https://www.youtube.com/embed/0_KtopuHSEk?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Grid>
    )
}

export default VideoContainer