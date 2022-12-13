import {useState} from "react";
import {Grid, InputBase} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import * as React from "react";
import {useNavigate} from "react-router-dom";


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
                <InputBase
                    id="search-bar"
                    className="text"
                    onInput={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    placeholder="Search StackExchange"
                    fullWidth={true}
                    sx={{backgroundColor:"white", border: 1, borderRadius: 2, boxShadow: 1}}
                />
                </Grid>
                <Grid item xs={1} lg={1} sm={1} md={1} >
                    <IconButton onClick={handleSearchClick} type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
};


export default SearchStackExchange;