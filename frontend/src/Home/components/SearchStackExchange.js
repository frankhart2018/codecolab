import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createQuestionThunk, getQuestionsThunk} from "../../services/search-thunks";
import {Grid, InputBase} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import * as React from "react";
import Paper from "./form/Paper";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";


const SearchStackExchange = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState("");
    const {currentSearch} = useSelector((state) => state.searchDetails)
    const handleSearchClick = async () => {
        await dispatch(getQuestionsThunk(searchQuery))
        currentSearch.forEach((search) => {
            dispatch(createQuestionThunk(search))
        })
    }

    return (
        <div>
            {/*<Paper*/}
            {/*    component="form"*/}
            {/*    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}*/}
            {/*    background={"light"}>*/}
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
                <Link to={`/details/q=${searchQuery}`} style={{ textDecoration: 'none'}}>
                    <IconButton onClick={handleSearchClick} type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Link>
                </Grid>
            </Grid>
            {/*</Paper>*/}
        </div>
    )
};


export default SearchStackExchange;