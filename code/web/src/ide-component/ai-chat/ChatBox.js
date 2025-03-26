import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import Markdown from 'markdown-to-jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingDots from './LoadingDots';
import './ChatBox.css'
import { Send } from 'lucide-react';


const ChatBox = ({initialMessage}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const markdownContent = "To resolve high CPU utilization on a database server, follow these detailed steps:\n\n1. **Check Running Queries**:\n   - Use the command to identify currently running queries and their CPU consumption:\n     - For MySQL:\n       ```sql\n       SHOW FULL PROCESSLIST;\n       ```\n     - For SQL Server:\n       ```sql\n       EXEC sp_who2;\n       ```\n   - Look for queries that are taking a long time to execute or consuming a lot of CPU resources.\n\n2. **Optimize Queries**:\n   - Analyze the queries identified as problematic:\n     - Use `EXPLAIN` (MySQL) or `EXPLAIN ANALYZE` (PostgreSQL) to understand how the queries are executed and to find optimization opportunities.\n   - Consider adding indexes to columns that are frequently queried or used in JOINs, or rewriting queries for better performance.\n\n3. **Restart Unnecessary Services**:\n   - Identify and stop non-essential services that may be running on the database server:\n     - On Linux, use:\n       ```bash\n       systemctl stop <service_name>\n       ```\n     - On Windows, stop services via Task Manager.\n\n4. **Monitor CPU Utilization**:\n   - Use system monitoring tools to check real-time CPU usage:\n     - On Linux, use:\n       ```bash\n       top\n       ```\n     - On Windows, use Task Manager.\n   - Identify any processes that are consuming excessive CPU and assess whether they are necessary.\n\n5. **Optimize Indexing and Execution Plans**:\n   - Review and optimize indexing strategies to ensure that queries run efficiently.\n   - Use tools to analyze query execution plans and adjust them as needed.\n\n6. **Scale Resources if Needed**:\n   - If the CPU usage is consistently high and optimization does not resolve the issue, consider scaling your resources:\n     - Increase the CPU allocation or move to a larger instance if you are using cloud services.\n\n7. **Enable Query Caching**:\n   - Implement database caching mechanisms to reduce the load caused by repetitive query executions:\n     - For MySQL, enable and configure query caching.\n\n8. **Review Configuration Settings**:\n   - Check database configuration settings and ensure they are optimized for your workload. This may involve adjusting parameters related to memory allocation, connection limits, and buffer sizes.\n\n9. **Regular Maintenance**:\n   - Schedule regular maintenance tasks such as database statistics updates, index rebuilding, and cleanup of old data to keep performance optimal.\n\nBy following these steps, you can effectively address high CPU utilization on your database server and improve overall performance. If the issue persists, consider consulting with a database administrator or a performance tuning specialist for more in-depth analysis.";
    useEffect(() => {
    if(initialMessage){
        setMessages([{
            position: 'left',
            type: 'text',
            text: `${initialMessage}`,
            date: new Date(),
            notch:false
          }])
          return;
    }

    setMessages([])
  }, [initialMessage]); 

  

  useEffect(() => {
    const messageBoxes = document.querySelectorAll('.rce-container-mbox');
    if (messageBoxes.length > 1) {
      const loadingDots = document.getElementById('loading-dots');
      let scrollTo = messageBoxes[messageBoxes.length - 2];
      if(loadingDots){
        scrollTo = loadingDots;
      }
      scrollTo.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Scrolls to the top of the last message
      });
    }
  }, [messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSend()
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        position: 'right',
        type: 'text',
        text: input,
        date: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Show loading message
      setLoading(true);

        fetch("http://localhost:9000/ai-connect/message", {
            method: "POST",
            mode: "cors",  // Ensures cross-origin request
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              message: input
            })
          })
            .then(response => response.json())
            .then(data => {
              setLoading(false);
              const aiMessage = {
                position: 'left',
                type: 'text',
                text: <div className='custom-markdown'>
                <Markdown>{data.answer}</Markdown>
              </div>,
                date: new Date(),
              };
              setMessages((prev) => [...prev, aiMessage]);
            }).catch((error) => {
              setLoading(false);
              const aiMessage = {
                position: 'left',
                type: 'text',
                text: <div className='custom-markdown'>
                <Markdown>{`Something went wrong with AI`}</Markdown>
              </div>,
                date: new Date(),
              };
            })
      };

      

      setInput('');
    }
  

  return (
    <div className="chat-box-container" id="chat-box-container">
      <div
        style={{
          overflowY: 'auto',
          padding: '10px',
          textAlign: 'start',
        }}

        className='chat-box-window'
      >
        {messages.map((msg, index) => (
          <MessageBox
            key={index}
            position={msg.position}
            type={msg.type}
            text={<div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>}
            date={msg.date}
          />
        ))}
         {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }} id='loading-dots'>
            <LoadingDots />
          </div>
        )}
        <div  />
        </div>
      <div className="chat-input-box d-flex">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1 }}
          onKeyDown={handleKeyDown}

        />
        <div onClick={handleSend}  onKeyDown={handleKeyDown} disabled={loading} className='send-icon' tabIndex={0} role="button" aria-label="Send Message">
            <Send color="green" />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
