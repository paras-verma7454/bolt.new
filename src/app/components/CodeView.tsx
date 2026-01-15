"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { MessageContext } from '@/data/context/MessageContext';
import { useModel } from '@/data/context/ModelContext';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

const CodeView = () => {
  const {id}=useParams()
  const [activeTab,setActiveTab]=useState('code')
  const [Files,setFiles]=useState(Lookup.DEFAULT_FILE)
  const {messages,setMessages}=useContext<any>(MessageContext)
  const {selectedModel} = useModel()
  const [loading,setLoading]=useState(false)
  const UpdateFiles=useMutation(api.workspace.UpdateFiles)
  const convex= useConvex();

  useEffect(()=>{
    id&&GetFiles()
  },[id])

  const GetFiles=async()=>{
    setLoading(true)
    
    if (!convex) {
      console.warn("Convex not available, using default files");
      setFiles(Lookup.DEFAULT_FILE);
      setLoading(false);
      return;
    }
    
    const result= await convex.query(api.workspace.GetWorkspace,{
      workspaceId:id as any
    })
    const mergeFiles= {...result?.fileData}
    setFiles(mergeFiles)
    setLoading(false)
  }

  useEffect(()=>{
    if(messages?.length > 0){
       const role= messages[messages.length-1].role;
        if(role === 'user'){
          GenerateAiCode()
        }
    }
  },[messages])
  const GenerateAiCode=async()=>{
    setActiveTab('code')
    setLoading(true)
    const PROMPT= JSON.stringify(messages)+" "+Prompt.CODE_GEN_PROMPT
    const result= await axios.post('/api/ai-code',{
      prompt: PROMPT,
      modelId: selectedModel.id
    })
    console.log("ai-code",result.data)
    const aiResponse=result.data

    const mergeFiles= {...Files,...aiResponse?.files}
    setFiles(mergeFiles)
    
    // Save to Convex if available, otherwise use localStorage
    if (UpdateFiles) {
      await UpdateFiles({
        workspaceId:id as any,
        fileData:aiResponse?.files
      });
    } else {
      localStorage.setItem(`workspace-files-${id}`, JSON.stringify(mergeFiles));
    }
    setLoading(false)
  }



  return (
    <div className='relative'>
      <div className='bg-[#181818] w-full p-2 border -mt-10'>
        <div className='flex gap-3 items-center justify-center flex-wrap shrink-0 bg-black p-1 w-[140px] rounded-full'>
          <h2 className={`text-sm cursor-pointer ${activeTab=='code'&& 'text-blue-500 bg-blue-500 bg-opacity-25  p-1 px-2 rounded-full  '}`}
          onClick={()=>setActiveTab('code')}>Code</h2>
          <h2 className={`text-sm cursor-pointer ${activeTab=='preview'&& 'text-blue-500 bg-blue-500 bg-opacity-25  p-1 px-2 rounded-full  '}`}
          onClick={()=>setActiveTab('preview')}>Preview</h2>
        </div>
      </div>
      <SandpackProvider template='react' theme={'dark'} 
      files={Files}
      options={{
        externalResources:['https://unpkg.com/@tailwindcss/browser@4']
      }}
      customSetup={{
        dependencies:{
          ...Lookup.DEPENDENCY
        }
      }}
      >
    <SandpackLayout>
     {activeTab=='code'&& <>

      <SandpackFileExplorer style={{height:'74vh'}} initialCollapsedFolder={["components/","/public/"]} />
      <SandpackCodeEditor style={{height:'74vh'}}/>
      </>}

      {activeTab=='preview'&& <>
      <SandpackPreview style={{height:'74vh'}} showNavigator={true}/>
      </>}
      
    </SandpackLayout>
  </SandpackProvider>
  { loading&& <div className='p-10 bg-gray-900 opacity-60 gap-1 absolute top-0 rounded-lg w-full h-full flex items-center justify-center'>
    <Loader2Icon className={`animate-spin  h-10 w-10 text-white `}/>
    <h2 className='text-white font-semibold text-xl'>Generating code...</h2>
  </div>}
    </div>
  )
}

export default CodeView