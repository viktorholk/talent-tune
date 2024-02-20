<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import icon from '../../static/talenttuneicon.svg?raw';

	export let data;

  const user = data.user;
	
</script>

<head> </head>
<body>
   <div class="container max-w-screen-lg mx-auto">
   {#if $page.url.pathname != '/login' && $page.url.pathname != '/register'}
   <nav class="flex justify-between items-center p-4">
      <div class="flex items-center text-white">
         <div class="flex items-center ">
            <div class="flex items-center text-indigo-600 mr-3">
               <div class="w-14 h-14">
                  {@html icon}
               </div>
               <a href="/" class="text-2xl font-black">Talent Tune</a>
            </div>
            <div class="flex gap-4 text-black">
               <a href="/user/profile">Profile</a>
               <a href="/browse">Browse</a>
            </div>
         </div>
         <div>
         </div>
      </div>
      <div class="flex items-center">
      </div>
      <a href="/login" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition p-2">Logout</a>
   </nav>
   {/if}
   <main>
      <slot />
   </main>
</body>
