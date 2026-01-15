"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { MessageContext } from '@/data/context/MessageContext';
import { UserDetailContext } from '@/data/context/UserDetailContext';
import { useModel } from '@/data/context/ModelContext';
import Image from 'next/image';
import { ArrowRight, Link, Loader, Loader2Icon } from 'lucide-react';
import Lookup from '@/data/Lookup';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import ModelSelector from './ModelSelector';


const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext<any>(MessageContext);
  const { userDetail, setUserDetail } = useContext<any>(UserDetailContext);
  const { selectedModel, setSelectedModel } = useModel();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const UpdateMessages= useMutation(api.workspace.UpdateMessages)
  const router = useRouter();

  useEffect(() => {
    if (!userDetail?.name) {
      router.push('/');
    }
  }, [userDetail, router]);

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      if (!convex) {
        console.warn("Convex not available, using local storage");
        const savedMessages = localStorage.getItem(`workspace-${id}`);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
        return;
      }
      
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id as any,
      });
      // console.log("Workspace data:", result);
      setMessages(result?.message );
      console.log("Messages set:", messages);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(()=>{
    if(messages.length > 0){
       const role= messages[messages.length-1].role;
        if(role === 'user'){
          GetAiResponse()
        }
    }
  },[messages])
  const GetAiResponse= async ()=>{
    setLoading(true)
    const PROMPT= JSON.stringify(messages)+ Prompt.CHAT_PROMPT
    const result = await axios.post('/api/ai-chat',{
       prompt:PROMPT,
       modelId: selectedModel.id
    })
    const aiResponse={role:'ai',content:result.data.result}
    const newMessages = [...messages,aiResponse];
    setMessages(newMessages);
    // console.log("ai:",result.data.result)
    
    // Save to Convex if available, otherwise use localStorage
    if (UpdateMessages) {
      await UpdateMessages({
        message: newMessages,
        workspaceId:id as any
      });
    } else {
      localStorage.setItem(`workspace-${id}`, JSON.stringify(newMessages));
    }
    setLoading(false)
  }

  const onGenerate=(input:any )=>{
      setMessages((prev: any )=>[...prev,{role:'user',content:input}]);
      setUserInput('');
  }

  return (
    <div className='relative h-[76vh] flex flex-col'>
      {/* Model Selector */}
      <div className='mb-4 p-3 bg-gray-50 rounded-lg border'>
        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel}
        />
      </div>
      
      <div className='flex-1 overflow-y-scroll no-scrollbar'>

      {Array.isArray(messages) && messages?.map((msg: any, index: number) => {
        return (
          <div key={index} className='bg-[#272727] p-3 rounded-lg m-2 flex gap-5 itmes-start '>
            {msg.role === 'user' && (
              <Image
              src={userDetail?.picture}
              alt='User'
              width={35}
              height={35}
              className='rounded-full'
              />
            )}
            <h2 className='mt-1' >{msg.content}</h2>
            
          </div>
        );
      })}
      { loading&& <div className='bg-[#272727] p-3 rounded-lg  m-2 flex gap-5 itmes-start'>
              <Loader2Icon className='animate-spin'/>
              <h2>Generating response...</h2>
            </div>
      }
      </div>
      {/* Input */}
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3 bg-[#151515]">
        <div className="flex gap-2 ">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-24 max-h-56 resize-none"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onGenerate(userInput);
              }
            }}
          />
          {userInput && (
           <ArrowRight
             onClick={() => onGenerate(userInput)}
             className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
           />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;