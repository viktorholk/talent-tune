<script  lang="ts">

import { post } from '$lib/actions/fetching';
import SvelteMarkdown from 'svelte-markdown'
	export let data;

  const user = data.user;

  let id = "";
  let  messages =  []


  const handleChat = async e => {

    const formData = new FormData(e.target)

    const message = formData.get('message')

    messages = [...messages, {role: "user", message: message}]

      const response = await post(
        `/assistant/chat/${id}`,
        {
          message
        },
        data.token
      );

  e.target.reset();

      const messagesClone = [...messages]

      let fullMessage = "";

  const reader = response.body.getReader();
const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }


      const decodedChunk = decoder.decode(value, { stream: true });
      fullMessage += decodedChunk;
      messages = [...messagesClone, {role: "assistant", message: fullMessage}]
  }



  }



  const handleProcess = async e => {
    const formData = new FormData(e.target)
user.isCompany
    try {
      const response = await post(
        '/assistant/initialize',
        {
          resume: formData.get('resume'),
          jobDescription: formData.get('jobDescription')
        },
        data.token
      );

      id = response.headers.get("x-assistant-id")
      const messagesClone = [...messages]

      let fullMessage = "";

  const reader = response.body.getReader();
const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }


      const decodedChunk = decoder.decode(value, { stream: true });
      fullMessage += decodedChunk;
      messages = [...messagesClone, {role: "assistant", message: fullMessage}]
  }

  e.target.reset();


    } catch (error) { }



  }
  

</script> 

<div class="container mx-auto px-4">
   {#if false}
   <h1>Deez nuts</h1>
   {:else}
   <div class="flex">
      <div class="w-1/3">
         <form class="flex flex-col items-center justify-center" method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleProcess}>
            <textarea name="resume" class="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Paste your resume here"></textarea>
            <textarea name="jobDescription" class="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Paste the job description here"></textarea>
            <button type="submit"class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
            Process
            </button>
         </form>
      </div>
      <div class="flex-1 px-5 gap-4">
         <div class="flex flex-col gap-4 bg-gray-100 min-h-64 max-h-96 mb-2 overflow-y-scroll p-2">

        {#each messages as { role, message}, i}
        {#if role == "assistant"}
         <h3 class="text-indigo-600 font-bold text-2xl">Assistant</h3>
         <SvelteMarkdown source={message} isInline/>
         {:else}
         <div class="flex flex-col text-right">

         <h3 class="text-indigo-600 font-bold text-xl italic">{data.user.name}</h3>
         <p class="text-sm">{message}</p>
         </div>

        {/if}



        {/each}


         </div>
         <form  method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleChat}>
            <textarea disabled={!id} name="message" class="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Message"></textarea>
            <div class="flex justify-end">
<button disabled={!id} class={`bg-indigo-600 hover:bg-indigo-700 font-bold py-3 px-6 rounded-full ${!id ? 'bg-gray-100 text-black' : 'text-white'}`}>
            Chat 
            </button>

            </div>
                     </form>
      </div>
   </div>
   {/if}
</div>
