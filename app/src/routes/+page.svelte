<script  lang="ts">
import {
    writable
} from 'svelte/store'
import {
    browser
} from "$app/environment"
import {
    post
} from '$lib/actions/fetching';
export let data;

const user = data.user;

let id = "";
let messages = [];


let streaming = false;
let dispatching = false;

const resumeInputStore = writable(browser && localStorage.getItem('resumeInput') || '');
const jobDescriptionInputStore = writable(browser && localStorage.getItem('jobDescriptionInput') || '');

resumeInputStore.subscribe(value => {
    if (browser)
        localStorage.setItem('resumeInput', value);
});

jobDescriptionInputStore.subscribe(value => {
    if (browser)
        localStorage.setItem('jobDescriptionInput', value);
});


const stickyScroll = () => {
    const element = document.getElementById("assistantChat");
    element.scrollTop = element.scrollHeight;
}

const streamCompletion = async (formData) => {
    streaming = true
    dispatching = true;

    stickyScroll();

    let payload;
    let endpoint;
    if (id) {

        payload = {
            message: formData.get('message'),
            id: id
        }
        endpoint = `/api/assistant/chat`
    } else {
        payload = {
            resume: formData.get('resume'),
            jobDescription: formData.get('jobDescription')
        }

        endpoint = "/api/assistant/initialize"
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({...payload, token: data.token}),
      })

    dispatching = false;

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

        stickyScroll();
    }

    streaming = false;
}



const handleChat = async e => {
    const formData = new FormData(e.target);

    const message = formData.get('message');

    e.target.reset();

    if (message.length > 0) {

        messages = [...messages, {
            role: "user",
            message: message
        }]

        stickyScroll();

        await streamCompletion(formData);
    }


}



const handleProcess = async e => {
    const formData = new FormData(e.target)

    id = "";
    messages = []

    await streamCompletion(formData);

}
const handleCreateJobListing = async e => {
    const formData = new FormData(e.target)


    const payload ={
      title: formData.get('title'),
      description: formData.get('description'),
      tags: formData.get('tags').split(','),
      token: data.token
    }

    const response = await fetch("/api/job-listings/create", {
      method: 'POST',
      body: JSON.stringify(payload),
      })

    if (response.status === 201)
      e.target.reset();

}


</script> 

<div class="container mx-auto px-4">
    {#if user.isCompany}

    <h1 class="text-center font-bold text-indigo-600 text-2xl">Create Job Listing</h1>

         <form class="flex flex-col" method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleCreateJobListing}>
        <label for="title" class="font-bold text-black">Title</label>
            <input id="title" name="title" class="w-full p-2 mb-4 border border-gray-300 rounded-md" placeholder=""/>

            <label for="description" class="font-bold text-black">Description</label>
            <textarea   id="description" name="description" class="w-full min-h-64 p-2 mb-4 border border-gray-300 rounded-md" placeholder=""></textarea>


        <label for="tags" class="font-bold text-black">Tags (comma seperated)</label>
            <input id="tags" name="tags" class="w-full p-2 mb-4 border border-gray-300 rounded-md" placeholder="tag1,tag2,tag3"/>



            <div class="flex justify-center">
            <button  disabled={streaming} type="submit"class="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
           Create 
            </button>

            </div>
                     </form>
   {:else}

   <div class="flex">
      <div class="w-1/3">
         <form class="flex flex-col" method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleProcess}>
        <label for="resume" class="font-bold text-black">Resume</label>
            <textarea disabled={streaming} id="resume" name="resume" class="w-full min-h-64  p-2 mb-4 border border-gray-300 rounded-md" placeholder="Paste your resume here" bind:value={$resumeInputStore}></textarea>

            <label for="jobDescription" class="font-bold text-black">Job Description</label>
            <textarea  disabled={streaming} id="jobDescription" name="jobDescription" class="w-full min-h-64 p-2 mb-4 border border-gray-300 rounded-md" placeholder="Paste the job description here" bind:value={$jobDescriptionInputStore}></textarea>
            <div class="flex justify-center">
            <button  disabled={streaming} type="submit"class="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
            Process
            </button>

            </div>
                     </form>
      </div>
      <div class="flex-1 px-5 gap-4">

            <p class="font-bold text-black">Assistant Chat</p>
         <div id="assistantChat" class="flex flex-col gap-4 bg-gray-100 min-h-64 max-h-96 mb-4 overflow-y-scroll p-2 rounded-xl">



      {#if messages.length == 0}

      <h1 class="text-center text-2xl font-bold text-indigo-600">Welcome to Talent Tune</h1>
      <p class="text-center">Please paste your resume and the job description to get started.</p>
      {/if}
            {#each messages as { role, message}}
            <div>
            {#if role == "assistant"}
            <h3 class="text-indigo-600 font-bold text-2xl">Assistant</h3>
            {@html message}
            {:else}
            <div class="flex flex-col text-right">
               <h3 class="text-indigo-600 font-bold text-xl italic">{data.user.name}</h3>
               <p class="text-sm">{message}</p>
            </div>
            {/if}
            </div>
            {/each}

{#if dispatching}
<div class="flex items-center justify-center flex-1">
<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" class="w-32 h-32"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="rgb(67 56 202)" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
</div>
{/if}


         </div>

         <form  method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleChat}>
            <label for="message" class="font-bold text-black">Message</label>
         <div class="flex">

            <textarea disabled={!id || streaming} name="message" class="w-full h-12 min-h-12 max-h-32 p-2 border border-gray-300 rounded-md" placeholder=""></textarea>
            <div class="flex justify-end">
               <button disabled={!id || streaming} class={`mx-2 px-5 h-12 font-bold rounded ${!id || streaming ? 'bg-gray-100 text-gray-300' : 'text-white bg-indigo-600 hover:bg-indigo-700'}`}>
              Reply 
               </button>
            </div>

            </div>
         </form>
      </div>
   </div>
   {/if}
</div>
