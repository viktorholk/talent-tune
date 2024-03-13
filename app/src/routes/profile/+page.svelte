<script lang="ts">
  import profileIcon from '$lib/assets/default-profile-picture.jpg';
  import { goto } from '$app/navigation';

  export let data;

  let profile = data.profile;

  import countries from 'i18n-iso-countries';
  import Locale from 'i18n-iso-countries/langs/en.json';
  countries.registerLocale(Locale);

  const user = data.user;

  function reloadPage() {
    const thisPage = window.location.pathname;

    goto('/').then(() => goto(thisPage));
  }

  let selectedFile: File | null = null;

  async function handleProfilePictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      let selectedProfilePicture = input.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(selectedProfilePicture as File);

      reader.onloadend = async function () {
        let base64data = reader.result;
        const payload = {
          picture: base64data,
          token: data.token
        };

        await fetch('/api/profile', {
          method: 'PATCH',
          body: JSON.stringify(payload)
        });

        reloadPage('/profile');
      };
    }
  }

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFile = input.files[0];
      await handleoploadfiles(event);
    }
  }

  async function handleoploadfiles(e: Event) {
    let reader = new FileReader();

    reader.readAsDataURL(selectedFile as File);
    reader.onloadend = async function () {
      let base64data = reader.result;
      const payload = {
        title: selectedFile?.name,
        encoded: base64data,
        token: data.token
      };

      await fetch('/api/profile/documents', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      reloadPage('/profile');
    };
  }

  function handleRemoveFile(id) {
    const payload = {
      id: id,
      token: data.token
    };

    return async () => {
      await fetch(`/api/profile/documents`, {
        method: 'DELETE',
        body: JSON.stringify(payload)
      });

      reloadPage('/profile');
    };
  }

  // User settings
  let editingEmail = user.email;
  let editingPassword = '';

  // Company settings
  let editingCompanyName = profile.name || '';
  let editingCompanyDescription = profile.description || '';
  let editingCompanyVat = profile.vat || '';
  let editingCompanyCountry = profile.country || '';
  let editingCompanyCity = profile.city || '';
  let editingCompanyAddress = profile.address || '';
  let editingCompanyZip = profile.zip || '';

  // Profile Settings
  let editingProfileFirstName = profile.firstName || '';
  let editingProfileLastName = profile.lastName || '';
  let editingProfileBio = profile.bio || '';
  let editingProfileTags = profile.tags?.join(', ') || '';

  let openTab = 0;
  function toggleTabs(tab) {
    openTab = tab;
  }

  async function handleSave() {
    if (openTab === 0) {
      let payload;
      if (user.company) {
        payload = {
          token: data.token,
          name: editingCompanyName,
          description: editingCompanyDescription,
          vat: editingCompanyVat,
          country: editingCompanyCountry,
          city: editingCompanyCity,
          address: editingCompanyAddress,
          zip: editingCompanyZip
        };
      } else {
        payload = {
          token: data.token,
          bio: editingProfileBio,
          firstName: editingProfileFirstName,
          lastName: editingProfileLastName,
          tags: editingProfileTags.split(',')
        };
      }

      await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify(payload)
      });
    } else if (openTab === 1) {
      const payload = {
        token: data.token,
        password: editingPassword
      };
      await fetch('/api/user', {
        method: 'PATCH',
        body: JSON.stringify(payload)
      });
    }
  }
</script>

<main class="flex flex-col items-center py-6 sm:py-12">
  <div class="p-6 bg-white rounded shadow-md w-full max-w-md">
    <div class="flex justify-center">
      <div class="inline-flex border-5 border-b rounded-xl mb-5">
        <div
          class="px-4 py-2 cursor-pointer rounded-l {openTab === 0
            ? 'border-5 border-b border-indigo-600 font-semibold'
            : ''}"
          on:click={() => toggleTabs(0)}
        >
          {user.company ? 'Company' : 'Profile'}
        </div>
        <div
          class="px-4 py-2 cursor-pointer rounded-r {openTab === 1
            ? 'border-5 border-b border-indigo-600 font-semibold'
            : ''}"
          on:click={() => toggleTabs(1)}
        >
          User
        </div>
      </div>
    </div>

    {#if openTab === 0}
      {#if user.company}
        <div class="flex flex-col gap-4">
          <div class="flex justify-between">
            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">Name</label>
              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingCompanyName}
              />
            </div>

            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">Vat Number</label>
              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingCompanyVat}
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="font-bold text-xs px-1">Description</label>

            <textarea
              class="bg-gray-100 flex-grow h-14 min-h-12 max-h-24 p-2 rounded"
              bind:value={editingCompanyDescription}
            />
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">Country</label>
              <select
                bind:value={editingCompanyCountry}
                class="bg-gray-100 rounded flex-grow w-full"
              >
                {#each Object.keys(countries.getNames('en')) as country}
                  <option value={country}>{countries.getName(country, 'en')}</option>
                {/each}
              </select>
            </div>

            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">City</label>

              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingCompanyCity}
              />
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">Address</label>

              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingCompanyAddress}
              />
            </div>

            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">Zip</label>

              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingCompanyZip}
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              on:click={() => handleSave()}>Save</button
            >
          </div>
        </div>
      {:else}
        <div class="flex flex-col gap-4">
          <div class="w-full flex flex-col justify-center items-center">
            <div class="w-24 h-24 rounded-3xl overflow-hidden">
              <img class="w-full" src={profile?.picture || profileIcon} />
            </div>

            <label for="pictureUpload" class="">
              <div class="flex justify-end">
                <div class="text-indigo-600 rounded font-bold p-2 m-3 cursor-pointer">
                  Change
                  <input
                    id="pictureUpload"
                    name="pictureUpload"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    on:change={handleProfilePictureChange}
                    class="hidden"
                  />
                </div>
              </div>
            </label>
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">First Name</label>

              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingProfileFirstName}
              />
            </div>

            <div class="flex flex-col">
              <label class="font-bold text-xs px-1">Last Name</label>

              <input
                type="text"
                class="bg-gray-100 flex-grow h-8 p-2 rounded"
                bind:value={editingProfileLastName}
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="font-bold text-xs px-1">Biography</label>

            <textarea
              class="bg-gray-100 flex-grow h-14 max-h-24 p-2 rounded"
              bind:value={editingProfileBio}
            />
          </div>

          <div class="flex flex-col">
            <label class="font-bold text-xs px-1">Tags (comma seperated)</label>

            <input
              type="text"
              class="bg-gray-100 flex-grow h-8 p-2 rounded"
              bind:value={editingProfileTags}
            />
          </div>

          <div class="flex justify-end">
            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              on:click={() => handleSave()}>Save</button
            >
          </div>

          <div>
            <h2 class="font-bold text-sm px-1">Your Documents</h2>

            <table class="w-full text-left border-collapse">
              <tbody>
                {#each data.profile.documents as document}
                  <tr class="">
                    <td class="border-b border-grey-light">
                      <a href={`/documents/${document._id}`} class="text-blue-500 hover:underline"
                        >{document.title}</a
                      >
                    </td>
                    <td class="border-b border-grey-light">
                      <div class="flex justify-center items-center">
                        <div
                          on:click={handleRemoveFile(document._id)}
                          class="text-red-500 hover:scale-125 hover:cursor-pointer transition ease-on-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>

            <label for="fileUpload" class="">
              <div class="flex justify-end">
                <div class="text-indigo-600 rounded font-bold p-2 mt-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 inline"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    />
                  </svg>
                  Upload
                  <input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    on:change={handleFileChange}
                    class="hidden"
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      {/if}
    {:else}
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-bold w-24 text-xs">Email</label>
          <input
            type="email"
            class="bg-gray-100 text-gray-300 flex-grow h-8 p-2 rounded"
            value={user.email}
            disabled
          />
        </div>

        <div class="flex justify-between items-center">
          <label class="font-bold w-24 text-xs">Password</label>
          <input
            type="email"
            class="bg-gray-100 flex-grow h-8 p-2 rounded"
            placeholder="**********"
            bind:value={editingPassword}
          />
        </div>

        <div class="flex justify-end">
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
            on:click={() => handleSave()}>Save</button
          >
        </div>
      </div>
    {/if}
  </div>
</main>
