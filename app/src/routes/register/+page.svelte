<script>
	export let form;
	let user = true;
	const toggleUser = () => (user = !user);

	import countries from 'i18n-iso-countries';
	import Locale from 'i18n-iso-countries/langs/en.json';
	countries.registerLocale(Locale);
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Talent Tune</h1>
			<h2 class="mt-2 mb-2 text-center text-xl font-extrabold text-gray-900">
				Register {user ? 'User' : 'Company'}
			</h2>
			<button
				class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				on:click={toggleUser}
			>
				Switch to {user ? 'Company' : 'User'}
			</button>
		</div>
		{#if user}
			<form class="mt-8 space-y-6" method="POST" enctype="multipart/form-data" action="../?/user">
				<input type="hidden" name="remember" value="true" />

				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email" class="sr-only">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
						/>
					</div>
					<div>
						<label for="name" class="sr-only">Name</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Name"
						/>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Password"
						/>
					</div>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<button
							type="submit"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Register
						</button>
					</div>
					<div class="text-sm">
						<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
							Already have an account? Log in
						</a>
					</div>
				</div>
				{#if form?.error}
					<p class="mt-2 text-center text-sm text-red-600">
						{form.error}
					</p>
				{/if}
			</form>
		{/if}
		{#if !user}
			<form class="mt-8 space-y-6" method="POST" enctype="multipart/form-data" action="?/company">
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="name" class="sr-only">name</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Name"
						/>
					</div>
					<div>
						<label for="email" class="sr-only">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
						/>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Password"
						/>
					</div>
					<div>
						<label for="companyName" class="sr-only">Company Name</label>
						<input
							id="companyName"
							name="companyName"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Company Name"
						/>
					</div>
					<div>
						<label for="companyDescription" class="sr-only">Company Description</label>
						<input
							id="companyDescription"
							name="companyDescription"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Description"
						/>
					</div>
					<div>
						<label for="companyVat" class="sr-only">Vat</label>
						<input
							id="Vat"
							name="Vat"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Vat"
						/>
					</div>
					<div>
						<label for="country" class="sr-only">Country</label>
						<select
							id="country"
							name="country"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						>
							{#each Object.keys(countries.getNames('en')) as country}
								<option value={country}>{countries.getName(country, 'en')}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="companyZip" class="sr-only">Zip code</label>
						<input
							id="companyZip"
							name="companyZip"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Zip code"
						/>
					</div>
					<div>
						<label for="companyCity" class="sr-only">City</label>
						<input
							id="companyCity"
							name="companyCity"
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="City"
						/>
					</div>
					<div>
						<label for="companyAddress" class="sr-only">Address</label>
						<input
							id="companyAddress"
							name="companyAddress"
							type="text"
							required
							class="appearance-none rounded-none relative rounded-b-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Address"
						/>
					</div>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<button
							formaction="/company"
							type="submit"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Register
						</button>
					</div>
					<div class="text-sm">
						<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
							Already have an account? Log in
						</a>
					</div>
				</div>
				{#if form?.error}
					<p class="mt-2 text-center text-sm text-red-600">
						{form.error}
					</p>
				{/if}
			</form>
		{/if}
	</div>
</div>
