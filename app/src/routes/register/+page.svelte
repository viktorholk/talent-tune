<script>
	export let form;
</script>
<h1>register</h1>
<form method="POST" enctype="multipart/form-data" >
	<label for="email">email</label>
	<input type="text" id="email" name="email" required/>

    <label for="name">name</label>
	<input type="text" id="name" name="name" required/>

	<label for="password">password</label>
	<input type="password" id="password" name="password" required/>

    <label for="password">password again</label>
	<input required/>

	<div class="button-group">
		<button type="submit">register</button>
		<button>login</button>
		{#if form?.error}
			<p>{form.error}</p>
		{/if}
	</div>
</form>