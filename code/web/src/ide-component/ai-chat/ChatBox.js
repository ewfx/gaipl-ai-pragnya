import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import Markdown from 'markdown-to-jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingDots from './LoadingDots';
import './ChatBox.scss'
import Lottie from 'lottie-react';
import loadingAnim from '../img/loading.json';


const ChatBox = ({initialMessage, chatSessionid}) => {
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
            credentials: "include",
            body: JSON.stringify({
              message: input
            })
          })
            .then(response => response.json())
            .then(data => {
              setLoading(false);
              console.log(document.cookie)
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

      /*setTimeout(() => {
        const aiMessage = {
          position: 'left',
          type: 'text',
          text: <div className='custom-markdown'>
          <Markdown>{markdownContent}</Markdown>
        </div>,
          date: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
      }, 1500);*/

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
          <div className="loading-section" style={{ display: 'flex', justifyContent: 'flex-start' }} id='loading-dots'>
            {<div className="loading"><Lottie className="loading-animation" animationData={loadingAnim} loop={true}/>
                <div className="loading-text loading04">
                  <span>A</span>
                  <span>n</span>
                  <span>a</span>
                  <span>l</span>
                  <span>y</span>
                  <span>z</span>
                  <span>i</span>
                  <span>n</span>
                  <span>g</span>
                </div>
            </div>}
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
        <div onClick={handleSend} disabled={loading} className='send-icon'>
        <svg fill="green" height="25px" width="25px" version="1.1" id="Layer_1"  
	        viewBox="0 0 600 512" >
        <g>
            <g>
            <path  strokeWidth="4" d="M508.645,18.449c-2.929-2.704-7.133-3.51-10.826-2.085L6.715,204.446c-3.541,1.356-6.066,4.515-6.607,8.264
                c-0.541,3.75,0.985,7.496,3.995,9.796l152.127,116.747c-0.004,0.116-0.575,0.224-0.575,0.342v83.592
                c0,3.851,2.663,7.393,6.061,9.213c1.541,0.827,3.51,1.236,5.199,1.236c2.026,0,4.181-0.593,5.931-1.756l56.12-37.367
                l130.369,99.669c1.848,1.413,4.099,2.149,6.365,2.149c1.087,0,2.186-0.169,3.248-0.516c3.27-1.066,5.811-3.672,6.786-6.974
                L511.571,29.082C512.698,25.271,511.563,21.148,508.645,18.449z M170.506,321.508c-0.385,0.36-0.7,0.763-1.019,1.163
                L31.659,217.272L456.525,54.557L170.506,321.508z M176.552,403.661v-48.454l33.852,25.887L176.552,403.661z M359.996,468.354
                l-121.63-93.012c-1.263-1.77-2.975-3.029-4.883-3.733l-47.29-36.163L480.392,60.86L359.996,468.354z"/>
            </g>
        </g>
        </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
