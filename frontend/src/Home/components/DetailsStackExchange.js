import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from "react";
import {Divider, Stack} from "@mui/material";
import NavBar from "./NavBar";
import { useParams } from 'react-router';
import {createQuestionThunk} from "../../services/search-thunks";
import {useDispatch} from "react-redux";

const KEY = 'Zv*dAp7WeF3GFkGdRgaZeA(('
const REMOTE_API_BASE = 'https://api.stackexchange.com/2.3/'
const SEARCH_QUESTION = 'search/advanced?page=1&pagesize=5&order=desc&sort=relevance&site=stackoverflow&filter=!6Wfm_gRpwPVC8'

const DetailsStackExchange = () => {
    const [currentSearch, setCurrentSearch] = useState([]);
    const currentSearchQuery = useParams()
    const dispatch = useDispatch();

    useEffect( () => {
        const getQuestions = async () => {
            const res = await fetch(`${REMOTE_API_BASE}${SEARCH_QUESTION}&${currentSearchQuery["*"]}&key=${KEY}`);
            const data = await res.json();
            setCurrentSearch(data.items);
            data.items.forEach(search => {
                    dispatch(createQuestionThunk(search))
                })
        }
        getQuestions();
    }, [currentSearchQuery, dispatch])

    return (
        <>
            <NavBar/>
        <List dense sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
            {currentSearch.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <>
                    <ListItem
                        key={value.question_id}
                    >
                        <ListItemButton sx={{ width: '100%', maxWidth: "100%"}}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value + 1}`}
                                    src={value['owner']['profile_image']}
                                />
                            </ListItemAvatar>
                            <Stack spacing={0}>
                                <ListItemText id={labelId} primary={`${value['title']}`} />
                                <a href={value['link']} target="_blank" rel="noopener noreferrer"><ListItemText id={labelId} primary={`${value['link']}`} /></a>
                            </Stack>
                        </ListItemButton>
                    </ListItem>
                <Divider variant="inset" component="li" />
                </>
                );
            })}
        </List>
        </>
    );
}

export default DetailsStackExchange