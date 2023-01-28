import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function App() {
  return (
    <Button variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
  );
}

export default App;
