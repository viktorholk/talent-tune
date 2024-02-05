<script>
  let user = {
    name: "John Doe",
    age: 25,
    email: "johndoe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  };
</script>

<main>
  <h1>{user.name}</h1>
  <p>Age: {user.age}</p>
  <p>Email: {user.email}</p>
  <p>Bio: {user.bio}</p>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
</style>
