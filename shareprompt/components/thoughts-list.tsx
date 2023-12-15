"use client"
import { Box } from '@mui/material'
import Card from './card'
const ThoughtsList = () => {
    return <Box sx={{ padding: "20px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-around" }}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </Box>
}
export default ThoughtsList