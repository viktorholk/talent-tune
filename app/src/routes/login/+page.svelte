<script>
	export let form;
</script>
<h1>Login</h1>
<form method="POST" enctype="multipart/form-data" >
	<label for="email">Brugernavn</label>
	<input type="text" id="email" name="email" required/>
	<label for="password">Kodeord</label>
	<input type="password" id="password" name="password" required/>
	<div class="button-group">
		<button type="submit">Login</button>
		<button>Glemt Adgangskode</button>
		{#if form?.error}
			<p>{form.error}</p>
		{/if}
	</div>
</form>
