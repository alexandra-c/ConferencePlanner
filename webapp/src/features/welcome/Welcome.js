import React, { useCallback, useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomTextField from 'components/common/inputs/CustomTextField';
import CustomIconButton from 'components/common/buttons/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { onTextBoxChange } from 'utils/propertyChangeAdapters';
import { useHistory } from 'react-router-dom';
import { emptyString } from 'utils/constants';
import { useEmail } from 'hooks/useEmail';

const validEmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const validateEmail = email => validEmailRegEx.test(email)

function Welcome() {
    const { t } = useTranslation()
    const history = useHistory()
    const [email, setEmail] = useEmail()
    const [textFieldValue, setTextFieldValue] = useState(email)
    const [isValid, setIsValid] = useState(true)
    const [makeTheJump, setMakeTheJump] = useState(false)

    useEffect(() => {
        if (email && makeTheJump) {
            history.push("/conferences")
        }
    }, [email, history, makeTheJump])

    const handleSubmit = useCallback(() => {
        if (validateEmail(textFieldValue)) {
            setIsValid(true)
            setMakeTheJump(true)
            setEmail(textFieldValue)
        } else {
            setIsValid(false)
            setMakeTheJump(false)
            setEmail(emptyString)
        }
    }, [setEmail, textFieldValue])

    const keyPressed = useCallback(({ keyCode }) => {
        if (keyCode === 13) {
            handleSubmit()
        }
    }, [handleSubmit])

    return (
        <Grid container justify="center" alignItems="center" alignContent="center" direction="column" spacing={10}>
            <Grid item xs={4}>
                <Typography variant="h5">{t("LandingPage.Title")}</Typography>
            </Grid>
            <Grid item container justify="center" alignItems="center" alignContent="center" direction="column" spacing={1}>
                <Grid item xs={4}>
                    <Typography variant="caption">{t("LandingPage.Subtitle")}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        debounceBy={0}
                        onKeyDown={keyPressed}
                        fullWidth
                        endAdornment={
                            <CustomIconButton size="small" color="theme" aria-label="go" onClick={handleSubmit}>
                                <KeyboardReturnIcon fontSize="small" />
                            </CustomIconButton>
                        }
                        value={textFieldValue}
                        onChange={onTextBoxChange(setTextFieldValue)}
                        helperText={!isValid && t("LandingPage.BadEmail")}
                        error={!isValid}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Welcome;