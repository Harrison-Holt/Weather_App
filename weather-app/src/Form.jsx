import { Box, TextField, Button } from "@mui/material";

function Form({ value, onChange, onSubmit }) {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, p: 5}}>
            <TextField
                label="Enter a city"
                name="city"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                />
                <Button variant="contained" type="submit" sx={{ m: 2 }}>Show Weather</Button>
            </Box>
    )
}

export default Form; 