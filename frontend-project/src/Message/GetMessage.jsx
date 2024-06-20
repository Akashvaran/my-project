import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetMessage.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/message');
        setMessages(res.data);
      } catch (err) {
        setError('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const unviewedMessages = messages.filter((msg) => !msg.viewed);
    if (unviewedMessages.length > 0) {
      toast.info(`You have ${unviewedMessages.length} new message(s)`);
    }
  }, [messages]);

  const markAsViewed = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/message/${id}/viewed`);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === id ? { ...msg, viewed: true } : msg
        )
      );
    } catch (err) {
      console.error('Error marking message as viewed', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="messages">
      <h2>Contact Messages</h2>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li key={message._id} className={message.viewed ? 'viewed' : 'unviewed'}>
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
              <p><strong>Date:</strong> {new Date(message.date).toLocaleString()}</p>
              <button onClick={() => markAsViewed(message._id)}>Mark as Viewed</button>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found</p>
      )}
      <ToastContainer />
    </div>
  );
};

export { Messages };
