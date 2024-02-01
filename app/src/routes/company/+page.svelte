<script>
    let jobs = [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "UX Designer",
        "Marketing Specialist",
        "Financial Analyst",
        "Graphic Designer",
        "Content Writer",
        "Sales Representative",
        "Human Resources Manager"
    ];
</script>

<ul>
    <h1>company</h1>
    {#each jobs as job}
        <li>{job}</li>
    {/each}
</ul>
