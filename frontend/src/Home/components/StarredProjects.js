import { Badge, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import StarRateIcon from '@mui/icons-material/StarRate';
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 4
    }
}));


var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var j = 0; j < 3; i++) {
        var value = (hash >> (j * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

const StarredProjects = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    const [starredProjects, setStarredProjects] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/starred-projects/${currentUser?._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("data", data.starredProjects
                )
                setStarredProjects(data.starredProjects);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [currentUser]);

    console.log("starredProjects", starredProjects)
    const handleOpenProject = (id) => {
        console.log("project id", id)
        navigate(`/code-editor/${id}`);
    }
    return (
        <div>
            <div style={{ display: "flex", padding: 20, flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                {Object.entries(starredProjects).map(([id, name]) => {
                    return (
                        <div style={{
                            padding: 15
                        }}>
                            <StyledBadge badgeContent={<StarRateIcon color="starred" fontSize="small" />} >
                                <Fab variant="extended" style={{ backgroundColor: stringToColour(name) }} onClick={() => handleOpenProject(id)}>
                                    {name}
                                </Fab>
                            </StyledBadge>
                        </div>
                    )
                })
                }
            </div >

        </div >
    )
}

export default StarredProjects 