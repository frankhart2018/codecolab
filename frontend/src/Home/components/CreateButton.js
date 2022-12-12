import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import defer from './form/defer';
import RFTextField from "./form/RFTextField";
import FormFeedback from "./form/FormFeedback";
import FormButton from "./form/FormButton";
import { projectName, required, description } from "./form/validation";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { createProjectThunk } from '../../services/project-thunk';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, fontSize: 24 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function CreateButton({ owner_id, handleProjectList }) {

    const [open, setOpen] = React.useState(false);
    const [sent, setSent] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const validate = (values) => {
        const errors = required(["name", "description"], values);
        if (!errors.name) {
            const nameError = projectName(values.name);
            if (nameError) {
                errors.name = nameError;
            }
        }
        if (!errors.description) {
            const descriptionError = description(values.description);
            if (descriptionError) {
                errors.description = descriptionError;
            }
        }

        return errors;
    };
    
    const handleSubmit = async (e) => {
        const data = {
            name: e.name,
            owner_id: owner_id,
            description: e.description
        }
        const response = await dispatch(createProjectThunk(data));
        if (response?.payload?.status === 201) {
            enqueueSnackbar(response?.payload?.message, { variant: "success" });
            setSent(false);
            handleProjectList();

        }
        else {
            enqueueSnackbar("Project already exists", { variant: "error" });
            setSent(false);
        }
        setOpen(false);
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                style={{ float: 'right', marginRight: '20px' }}
                onClick={handleClickOpen}
            >
                Create Project
            </Button>
            <div>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        New Project
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Form
                            onSubmit={handleSubmit}
                            subscription={{ submitting: true }}
                            validate={validate}
                        >
                            {({ handleSubmit: handleSubmit2, submitting }) => (
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit2}
                                    noValidate
                                    sx={{ mt: 6 }}
                                >
                                    <Field
                                        autoComplete="name"
                                        autoFocus
                                        component={RFTextField}
                                        disabled={submitting || sent}
                                        fullWidth
                                        label="Name"
                                        margin="normal"
                                        name="name"
                                        required
                                        size="large"
                                    />
                                    <Field
                                        component={RFTextField}
                                        disabled={submitting || sent}
                                        fullWidth
                                        label="Description"
                                        margin="normal"
                                        name="description"
                                        required
                                        size="large"
                                    />
                                    <Field
                                        fullWidth
                                        size="large"
                                        component={RFTextField}
                                        disabled={true}
                                        defaultValue='Python'
                                        name="language"
                                        autoComplete="language"
                                        label="Language"
                                        type="text"
                                        margin="normal"
                                    />
                                    <FormSpy subscription={{ submitError: true }}>
                                        {({ submitError }) =>
                                            submitError ? (
                                                <FormFeedback error sx={{ mt: 2 }}>
                                                    {submitError}
                                                </FormFeedback>
                                            ) : null
                                        }
                                    </FormSpy>
                                    <FormButton
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={submitting || sent}
                                        size="large"
                                        color="secondary"
                                        fullWidth
                                    >
                                        {submitting || sent ? "In progress…" : "Create Project"}
                                    </FormButton>
                                </Box>
                            )}
                        </Form>
                    </DialogContent>

                </BootstrapDialog>
            </div>
        </>
    );
}
export default defer(CreateButton);