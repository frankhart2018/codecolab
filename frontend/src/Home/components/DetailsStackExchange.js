import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useState} from "react";
import {useSelector} from "react-redux";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {Divider, Stack, Typography} from "@mui/material";
import NavBar from "./NavBar";

const DetailsStackExchange = () => {
    const [checked, setChecked] = useState([1]);
    const {currentSearch} = useSelector((state) => state.searchDetails)
    const {localSearch} = useSelector((state) => state.searchDetails)

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
                                        Upvotes: {localSearch.upvotes}
                                    </Typography>
                                    <Divider variant="inset" component="li" orientation="vertical"/>
                                    <Typography gutterBottom>
                                        Downvotes: {localSearch.downvotes}
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