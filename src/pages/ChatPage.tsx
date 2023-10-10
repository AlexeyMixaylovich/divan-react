import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { socket } from '../socket';
// import { ConnectionManager } from '../components/ConnectionManager';
import { formateDate } from '../helpers/date';

export type TMessage = {
  created: string,
  id: string,
  message: string
  creatorType: 'user'
  status: 'created' | 'read'
};

export type TSyncData = {
  items: TMessage[]
  newItems: TMessage[]
  newItemsCount: number
};
export type TInMessageData = {
  item: TMessage
};
export type TPaginationData = {
  items: TMessage[]
  direction: 'old' | 'new'
};

function Message({ message }: { message:TMessage }) {
  // const status = (message.status === 'created')
  //   ? 'доставлено'
  //   : 'прочитано';
  const isBot = message.creatorType !== 'user';
  const handleClickOld = () => {
    const data = {
      id: message.id,
      limit: 2,
      direction: 'old',
    };
    socket.emit('request_pagination', data);
  };
  const handleClickNew = () => {
    const data = {
      id: message.id,
      limit: 2,
      direction: 'new',
    };
    socket.emit('request_pagination', data);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? 'secondary.light' : 'primary.light',
        }}
      >
        <Typography onClick={handleClickOld} variant="body1">{`${message.message}`}</Typography>
        <Typography onClick={handleClickNew} variant="caption">{`${formateDate(message.created)} ${message.id}`}</Typography>

      </Paper>
    </Box>
  );
}

function mergeMessages(prev: TMessage[], incoming: TMessage[]) {
  const newPrev = [...prev];
  const newIncoming = incoming.filter((m) => {
    const index = prev.findIndex(({ id }) => id === m.id);
    if (index === -1) {
      return true;
    }
    newPrev[index] = m;
    return false;
  });

  return {
    newPrev, newIncoming,
  };
}
export function ChatUI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TMessage[]>([]);

  const handleSend = (prefix: string) => {
    if (input.trim() !== '') {
      const data = {
        message: prefix + input,
        externalId: new Date().toISOString(),
      };
      socket.emit('in_message', data, (...args:any[]) => {
        console.log('in_message_res', args);
      });
      setInput('');
    }
  };

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  };
  function handleFileUpload(event:any) {
    const file = event.target.files[0];
    const data = {
      type: 'bla bla',
      file,
    };
    socket.emit('upload', data, (...args:any[]) => {
      console.log('status', args);
    });
  }

  useEffect(() => {
    function onSyncEvent(data: TSyncData) {
      console.log('onSyncEvent', data);
      const { newItems, items } = data;

      setMessages((previous) => {
        const { newPrev, newIncoming } = mergeMessages(previous, newItems);
        const res = mergeMessages(newPrev, items);

        return [...res.newIncoming, ...res.newPrev, ...newIncoming];
      });
    }
    function onOutMessageEvent(data: TInMessageData) {
      console.log('onOutMessageEvent', data);
      const { item } = data;
      setMessages((previous) => {
        const res = mergeMessages(previous, [item]);

        return [...res.newPrev, ...res.newIncoming];
      });
    }
    function onPagination(data: TPaginationData) {
      console.log('onPagination', data);

      const { items, direction } = data;

      setMessages((previous) => {
        const res = mergeMessages(previous, items);
        if (direction === 'old') {
          return [...res.newIncoming, ...res.newPrev];
        }
        return [...res.newPrev, ...res.newIncoming];
      });
    }

    socket.on('sync', onSyncEvent);
    socket.on('out_message', onOutMessageEvent);
    socket.on('pagination', onPagination);

    return () => {
      socket.off('sync', onSyncEvent);
      socket.off('out_message', onOutMessageEvent);
      socket.off('pagination', onPagination);
    };
  }, []);
  return (

    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* <ConnectionManager /> */}

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder="Type a message"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="medium"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleSend('')}
            >
              User
            </Button>
            <Button
              fullWidth
              size="medium"
              color="error"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => handleSend('employee')}
            >
              Employee
            </Button>
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
