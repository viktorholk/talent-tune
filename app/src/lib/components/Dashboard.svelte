<script>
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  import { goto } from '$app/navigation';
  import MultiSelect from 'svelte-multiselect';
  export let data;

  let id = '';
  let messages = [];

  var streaming = false;
  var dispatching = false;

  const documents = data.user?.profile?.documents?.map((doc) => {
    return {
      label: doc.title,
      _id: doc._id
    };
  });

  let selected = [];

  const resumeInputStore = writable((browser && localStorage.getItem('resumeInput')) || '');
  const jobDescriptionInputStore = writable(
    (browser && localStorage.getItem('jobDescriptionInput')) || ''
  );

  resumeInputStore.subscribe((value) => {
    if (browser) localStorage.setItem('resumeInput', value);
  });

  jobDescriptionInputStore.subscribe((value) => {
    if (browser) localStorage.setItem('jobDescriptionInput', value);
  });

  const stickyScroll = () => {
    const element = document.getElementById('assistantChat');
    element.scrollTop = element.scrollHeight;
  };

  const streamCompletion = async (formData) => {
    streaming = true;
    dispatching = true;

    stickyScroll();

    let payload;
    let endpoint;
    if (id) {
      payload = {
        message: formData.get('message'),
        id: id
      };
      endpoint = `/api/assistant/chat`;
    } else {
      payload = {
        resume: formData.get('resume'),
        jobDescription: formData.get('jobDescription'),
        instructions: `You will only output in valid HTML format. You dont need <html> and <body> elements.
        You will use TailwindCSS classes for styling. You dont need to import TailwindCSS.
        That means for headers e.g you will use font-bold text-xl.
        Text formatting: You can use HTML tags such as <h1>, <h2>, <p>, and <strong> to format and style text.
        Tables and lists: You can use the <table> and <ul>/<ol> tags to create tables and lists respectively.`,
        documents: selected.map((d) => d._id)
      };

      endpoint = '/api/assistant/initialize';
    }

    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ ...payload, token: data.token })
    })
      .then(async (response) => {
        dispatching = false;

        if (!id) {
          id = response.headers.get('x-assistant-id');
        }

        const messagesClone = [...messages];

        let fullMessage = '';

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const decodedChunk = decoder.decode(value, {
            stream: true
          });
          fullMessage += decodedChunk;
          messages = [
            ...messagesClone,
            {
              role: 'assistant',
              message: fullMessage
            }
          ];

          stickyScroll();
        }

        streaming = false;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChat = async (e) => {
    const formData = new FormData(e.target);

    const message = formData.get('message');

    e.target.reset();

    if (message.length > 0) {
      messages = [
        ...messages,
        {
          role: 'user',
          message: message
        }
      ];

      stickyScroll();

      await streamCompletion(formData);
    }
  };

  const handleProcess = async (e) => {
    const formData = new FormData(e.target);

    id = '';
    messages = [];

    collapsed = true;

    await streamCompletion(formData);
  };
  const handleCreateJobListing = async (e) => {
    const formData = new FormData(e.target);

    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      tags: formData.get('tags').split(','),
      token: data.token
    };

    const response = await fetch('/api/job-listings', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.status === 201) {
      // Navigate to the newly created job listing
      const { _id } = await response.json();
      goto(`/job-listings/${_id}`);
    }
  };

  let collapsed = undefined;
</script>

<div class="flex flex-col w-full">
  <div class={collapsed ? 'hidden' : ''}>
    <form method="POST" enctype="multipart/form-data" on:submit|preventDefault={handleProcess}>
      <div class="flex gap-2">
        <div class="w-1/2">
          <label for="resume" class="font-bold text-black">Resume</label>
          <textarea
            disabled={streaming}
            id="resume"
            name="resume"
            class="w-full min-h-64 max-h-96 p-2 border border-gray-300 rounded-md"
            placeholder="Paste your resume here"
            bind:value={$resumeInputStore}
          ></textarea>
        </div>

        <div class="w-1/2">
          <label for="jobDescription" class="font-bold text-black">Job Description</label>
          <textarea
            disabled={streaming}
            id="jobDescription"
            name="jobDescription"
            class="w-full min-h-64 max-h-96 p-2 mb-4 border border-gray-300 rounded-md"
            placeholder="Paste the job description here"
            bind:value={$jobDescriptionInputStore}
          ></textarea>
        </div>
      </div>

      <div class="flex-grow">
        <label for="attachedDocuments" class="font-bold text-black">Attached Documents</label>
        <MultiSelect
          id="attachedDocuments"
          bind:selected
          options={documents || []}
          key={(i) => i._id}
        />
      </div>

      <div class="flex justify-center mt-2">
        <button
          type="submit"
          class=" text-indigo-600 p-1 text-2xl rounded flex items-center font-bold justify-center hover:scale-105 transition ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
          Process
        </button>
      </div>
    </form>
  </div>

  <div class="border border-gray-100 {!id ? 'hidden' : ''}"></div>

  <div
    class="flex justify-center text-indigo-600 cursor-pointer {!id ? 'hidden' : ''}"
    on:click={() => (collapsed = !collapsed)}
  >
    {#if collapsed}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    {/if}
  </div>

  <div class={collapsed === undefined ? 'hidden' : ''}>
    <p class="font-bold text-black">Assistant Chat</p>
    <div
      id="assistantChat"
      class="flex flex-col gap-4 bg-gray-100 min-h-64 max-h-96 mb-4 overflow-y-scroll p-2 rounded-xl"
    >
      {#if messages.length == 0}
        <h1 class="text-center text-2xl font-bold text-indigo-600">Welcome to Talent Tune</h1>
        <p class="text-center">Please paste your resume and the job description to get started.</p>
      {/if}
      {#each messages as { role, message }}
        <div>
          {#if role == 'assistant'}
            <h3 class="text-indigo-600 font-bold text-2xl">Assistant</h3>
            {@html message}
          {:else}
            <div class="flex flex-col text-right">
              <h3 class="text-indigo-600 font-bold text-xl italic">
                {data.user.profile?.firstName}
                {data.user.profile?.lastName}
              </h3>
              <p class="text-sm">{message}</p>
            </div>
          {/if}
        </div>
      {/each}

      {#if dispatching}
        <div class="flex items-center justify-center flex-1">
          <svg
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            class="w-32 h-32"
            viewBox="0 0 100 100"
            enable-background="new 0 0 0 0"
            xml:space="preserve"
          >
            <path
              fill="rgb(67 56 202)"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      {/if}
    </div>

    <form
      class="mb-5"
      method="POST"
      enctype="multipart/form-data"
      on:submit|preventDefault={handleChat}
    >
      <label for="message" class="font-bold text-black">Message</label>
      <div class="flex">
        <textarea
          disabled={!id || streaming}
          name="message"
          class="w-full h-12 min-h-12 max-h-32 p-2 border border-gray-300 rounded-md"
          placeholder=""
        ></textarea>
        <div class="flex justify-end">
          <button
            disabled={!id || streaming}
            class={`mx-2 px-5 h-12 font-bold rounded ${!id || streaming ? 'bg-gray-100 text-gray-300' : 'text-white bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Reply
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
