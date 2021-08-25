import CardHeader from '@material-ui/core/CardHeader';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
    margin: '0px',
  },
  title: {
    color: 'white',
    fontSize: '1.0rem',
    display: 'flex',
    justifyContent: 'center',
  },
});
export default withStyles(styles)(CardHeader);
