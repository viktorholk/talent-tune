<script>
  let companyName = "Company Name";
  let companyDescription = "Company Description";
  let companyLogo = "path/to/company-logo.png";
  let companyLocation = "Company Location";
  let companyWebsite = "https://www.company-website.com";
</script>

<main>
  <h1>{companyName}</h1>
  <img src={companyLogo} alt="Company Logo" />
  <p>{companyDescription}</p>
  <p>Location: {companyLocation}</p>
  <a href={companyWebsite} target="_blank">Visit Website</a>
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
  }
</style>
