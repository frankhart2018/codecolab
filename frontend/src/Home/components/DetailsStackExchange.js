import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {Divider, Stack, Typography} from "@mui/material";
import NavBar from "./NavBar";
import { useParams } from 'react-router';
import {createQuestionThunk, updateQuestionThunk} from "../../services/search-thunks";
import {useDispatch} from "react-redux";
import {createQuestion} from "../../services/search-service";

const KEY = 'Zv*dAp7WeF3GFkGdRgaZeA(('
const REMOTE_API_BASE = 'https://api.stackexchange.com/2.3/'
const SEARCH_QUESTION = 'search/advanced?page=1&pagesize=5&order=desc&sort=relevance&site=stackoverflow&filter=!6Wfm_gRpwPVC8'

const DetailsStackExchange = () => {
    const [checked, setChecked] = useState([1]);
    const [currentSearch, setCurrentSearch] = useState([]);
    const currentSearchQuery = useParams()
    const dispatch = useDispatch();

    useEffect( () => {
        const getQuestions = async () => {
            const res = await fetch(`${REMOTE_API_BASE}${SEARCH_QUESTION}&${currentSearchQuery["*"]}&key=${KEY}`);
            const data = await res.json();
            setCurrentSearch(data.items);
            currentSearch.forEach(search => {
                    dispatch(createQuestionThunk(search))
                })
        }
        getQuestions();
    }, [currentSearchQuery])

    const getLocalSearch = async (question_id) => {
        const res = await fetch(`http://localhost:4000/api/get-search/${question_id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        })
        const data = await res.json();
        console.log(question_id, data.search['upvotes'])
        return data.search
    }


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    // useEffect(() => {
    //     const updateLocalSearch = () => {
    //         currentSearch.forEach(search => {
    //             dispatch(updateQuestionThunk(search))
    //         })
    //     }
    //     updateLocalSearch();
    // }, [currentSearch])

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
                        secondaryAction={
                        <>
                        <ThumbUpIcon onClick={handleToggle(value)} checked={checked.indexOf(value) !== -1}/>
                            <ThumbDownIcon/>
                        </>
                        }
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
                                <Stack direction="row">
                                        <Typography gutterBottom>
                                            Upvotes: {getLocalSearch(value.question_id)['upvotes']}
                                            {/*{getLocalSearch(value.question_id)['upvotes']}*/}
                                            {/*Upvotes: {getLocalSearch(value.question_id)[0]['upvotes']}*/}
                                        </Typography>
                                    <Divider variant="inset" component="li" orientation="vertical"/>
                                    <Typography gutterBottom>
                                        {/*Downvotes: {localSearch.downvotes}*/}
                                    </Typography>
                                </Stack>
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