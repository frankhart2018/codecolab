import { useState } from "react";
import { Grid, InputBase, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import * as React from "react";
import { useNavigate } from "react-router-dom";


const SearchStackExchange = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearchClick = async () => {
        navigate(`/details/q=${searchQuery}`);
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={11} lg={11} sm={11} md={11} >
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex' }}

                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search StackExchange"
                            onInput={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            fullWidth={true}
                            inputProps={{ 'aria-label': 'Search StackExchange' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon onClick={handleSearchClick} />
                        </IconButton>
                    </Paper>

                </Grid>

            </Grid>
        </div>
    )
};


export default SearchStackExchange;