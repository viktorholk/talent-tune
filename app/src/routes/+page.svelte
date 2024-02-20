<script  lang="ts">
import {
    post
} from '$lib/actions/fetching';
import SvelteMarkdown from 'svelte-markdown'
export let data;

const user = data.user;

let id = "";
let messages = []


let streaming = false;


const streamCompletion = async (formData) => {
    streaming = true


    let payload;
    let endpoint;
    if (id) {

        payload = {
            message: formData.get('message')
        }
        endpoint = `/assistant/chat/${id}`
    } else {
        payload = {
            resume: formData.get('resume'),
            jobDescription: formData.get('jobDescription')
        }

        endpoint = "/assistant/initialize/"
    }

    const response = await post(
        endpoint,
        payload,
        data.token
    );

    if (!id) {
      id = response.headers.get('x-assistant-id');
    }

    const messagesClone = [...messages] 

    let fullMessage = "";

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const {
            done,
            value
        } = await reader.read();
        if (done) {
            break;
        }


        const decodedChunk = decoder.decode(value, {
            stream: true
        });
        fullMessage += decodedChunk;
        messages = [...messagesClone, {
            role: "assistant",
            message: fullMessage
        }]
    }


    streaming = false;
}



const handleChat = async e => {

    const formData = new FormData(e.target);

    const message = formData.get('message');

    if (message.length > 0) {

      messages = [...messages, {
          role: "user",
          message: message
      }]

      await streamCompletion(formData);
    }


    e.target.reset();
}



const handleProcess = async e => {
    const formData = new FormData(e.target)

    id = "";
    messages = []


    await streamCompletion(formData);

    e.target.reset();
}  

</script> 

<div class="container mx-auto px-4">
   {#if false}
   <h1>Deez nuts</h1>
   {:else}
   <div class="flex">
      <div class="w-1/3">
         <form class="flex flex-col items-center justify-center" method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleProcess}>
            <textarea disabled={streaming} name="resume" class="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Paste your resume here"></textarea>
            <textarea  disabled={streaming} name="jobDescription" class="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Paste the job description here"></textarea>
            <button  disabled={streaming} type="submit"class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
            Process
            </button>
         </form>
      </div>
      <div class="flex-1 px-5 gap-4">

         <div class="flex flex-col flex-col-reverse gap-4 bg-gray-100 min-h-64 max-h-96 mb-2 overflow-y-scroll p-2 rounded-xl">
      {#if messages.length == 0}
      <p class="text-center">Please paste your resume and the job description to get started.</p>
      <h1 class="text-center text-2xl font-bold text-indigo-600">Welcome to Talent Tune</h1>
      {/if}
            {#each [...messages].reverse() as { role, message}}
            {#if role == "assistant"}
            <SvelteMarkdown source={message} isInline/>
            <h3 class="text-indigo-600 font-bold text-2xl">Assistant</h3>
            {:else}
            <div class="flex flex-col text-right">
               <p class="text-sm">{message}</p>
               <h3 class="text-indigo-600 font-bold text-xl italic">{data.user.name}</h3>
            </div>
            {/if}
            {/each}
         </div>
         <form  method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleChat}>
            <textarea disabled={!id || streaming} name="message" class="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Message"></textarea>
            <div class="flex justify-end">
               <button disabled={!id || streaming} class={`  font-bold py-3 px-6 rounded-full ${!id || streaming ? 'bg-gray-100 text-gray-300' : 'text-white bg-indigo-600 hover:bg-indigo-700'}`}>
               Chat 
               </button>
            </div>
         </form>
      </div>
   </div>
   {/if}
</div>
