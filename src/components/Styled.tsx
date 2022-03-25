import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { IconButton, styled } from '@mui/material';

export const StyledRoot = styled("div")({
    position: "relative",
    overflow: "hidden",
});

export const StyledItem = styled("div")({
    position: "absolute",
    height: "100%",
    width: '100%',
    //    flexGrow: 1
});

export const StyledItemWrapper = styled("div")({
    position: 'relative',
    width: '100%',
    height: '100%',
});

export const StyledIndicators = styled("div")({
    width: "100%",
    marginTop: "10px",
    textAlign: "center"
});

export const StyledFiberManualRecordIcon = styled(FiberManualRecord)({
    fontSize: "15px",
});

export const StyledIndicatorIconButton = styled(
    IconButton,
    { shouldForwardProp: (propName: string) => !propName.startsWith('$') }
)<{ $active: boolean }>(({ $active }) => ({
    cursor: "pointer",
    transition: "200ms",
    padding: 0,
    color: $active ? "#494949" : "#afafaf",
    '&:hover': {
        color: $active ? "#494949" : "#1f1f1f",
    },
    '&:active': {
        color: $active ? "#494949" : "#1f1f1f",
    }
}));

export const StyledIconButton = styled(
    IconButton,
    { shouldForwardProp: (propName: string) => !propName.startsWith('$') }
)<{ $alwaysVisible: boolean; $fullHeightHover: boolean }>(({ $alwaysVisible }) => ({
    margin: "0 10px",
    position: "relative",
    backgroundColor: "#494949",
    top: "calc(50% - 20px) !important",
    color: "white",
    fontSize: "30px",
    transition: "200ms",
    cursor: "pointer",
    opacity: $alwaysVisible ? '1' : '0',
    '&:hover': {
        opacity: "0.6 !important",
    },
}));

export const StyledButtonWrapper = styled(
    "div",
    { shouldForwardProp: (propName: string) => !propName.startsWith('$') }
)<{ $next: boolean; $prev: boolean; $fullHeightHover: boolean }>(({ $next, $prev, $fullHeightHover }) => ({
    position: "absolute",
    height: "100px",
    backgroundColor: "transparent",
    zIndex: 1,
    top: "calc(50% - 70px)",
    '&:hover': {
        '& button': {
            backgroundColor: "black",
            filter: "brightness(120%)",
            opacity: "0.4"
        }
    },
    ...($fullHeightHover ? {
        height: "100%", // This is 100% - indicator height - indicator margin
        top: "0"
    } : undefined),
    ...($next ? { right: 0 } : undefined),
    ...($prev ? { left: 0 } : undefined),
}));