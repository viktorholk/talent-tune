<script>
  let user = {
    name: "John Doe",
    age: 25,
    email: "johndoe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  };
</script>

<main class="flex flex-col items-center  py-6 sm:py-12">
  <div class="p-6 bg-white rounded shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-4">{user.name}</h1>
    <p class="mb-2"><span class="font-bold">Age:</span> {user.age}</p>
    <p class="mb-2"><span class="font-bold">Email:</span> {user.email}</p>
    <p class="mb-2"><span class="font-bold">Bio:</span> {user.bio}</p>
  </div>
</main>