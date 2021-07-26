try {
    import { withStyles } from '@material-ui/core/styles';
    export default withStyles;
} catch (_) {
    import { withStyles } from '@material-ui/styles';
    export default withStyles;
}
