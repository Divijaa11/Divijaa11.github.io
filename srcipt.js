fetch("content.json")
  .then((response) => response.json())
  .then((data) => {
    const topbar = document.querySelector(".topbar");
    topbar.textContent = data.name;
    const navbar = document.querySelector(".navbar");
    data.tabs.forEach((tab) => {
      const tabElement = document.createElement("a");
      tabElement.href = tab.link;
      tabElement.textContent = tab.label;
      tabElement.className = "nav-tab";
      navbar.appendChild(tabElement);
    });
    const name = document.getElementById("name");
    name.textContent = data.fullName;
    const role = document.getElementById("role");
    role.textContent = data.role;
    const aboutSection = document.getElementById("about");
    const aboutMe = document.createElement("h3");
    aboutMe.textContent = data.about.title;
    aboutSection.appendChild(aboutMe);
    data.about.paragraphs.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      aboutSection.appendChild(paragraph);
    });
    const skillsSection = document.getElementById("skills");
    const skills = document.createElement("h3");
    skills.textContent = data.skills.title;
    skillsSection.appendChild(skills);
    const skillsContainer = document.createElement("div");
    skillsContainer.className = "skill-container";
    skillsSection.appendChild(skillsContainer);
    data.skills.categories.forEach((category) => {
      const skillCategoryContainer = document.createElement("div");
      const categoryTitle = document.createElement("h4");
      categoryTitle.textContent = category.category;
      skillCategoryContainer.appendChild(categoryTitle);

      const skillList = document.createElement("ul");
      category.skills.forEach((skill) => {
        const listItem = document.createElement("li");

        if (skill.link) {
          const link = document.createElement("a");
          link.href = skill.link;
          link.textContent = skill.name;
          link.target = "_blank";
          listItem.appendChild(link);
        } else {
          listItem.textContent = skill.name;
        }

        skillList.appendChild(listItem);
      });
      skillCategoryContainer.appendChild(skillList);
      skillsContainer.appendChild(skillCategoryContainer);
    });
    const certificationsSection = document.getElementById("certifications");

    const title = document.createElement("h4");
    title.textContent = data.certifications.title;
    certificationsSection.appendChild(title);

    const container = document.createElement("div");
    container.classList.add("certifications-container");
    certificationsSection.appendChild(container)

    data.certifications.items.forEach((cert) => {
      console.log("cert",cert)
      const card = document.createElement("div");
      card.classList.add("certification-card");

      const image = document.createElement("img");
      image.src = cert.image;
      image.alt = cert.name;
      card.appendChild(image);

      const name = document.createElement("p");
      name.textContent = cert.name;
      card.appendChild(name);

      container.appendChild(card);
    });

    const projectsSection = document.getElementById("projects");

    const projectsTitle = document.createElement("h3");
    projectsTitle.textContent = data.projects.title;
    projectsSection.appendChild(projectsTitle);

    data.projects.categories.forEach(category => {
      const categoryTitle = document.createElement("h4");
      categoryTitle.textContent = category.category;
      projectsSection.appendChild(categoryTitle);

      const projectContainer = document.createElement("div");
      projectContainer.classList.add("project-container");

      category.projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const name = document.createElement("h5");
        name.textContent = project.name;
        projectCard.appendChild(name);

        const description = document.createElement("p");
        description.textContent = project.description;
        projectCard.appendChild(description);

        if (project.contributions && project.contributions.length > 0) {
          const contributionsList = document.createElement("ul");
          project.contributions.forEach(contribution => {
            const listItem = document.createElement("li");
            listItem.textContent = contribution;
            contributionsList.appendChild(listItem);
          });
          projectCard.appendChild(contributionsList);
        }

        const tech = document.createElement("p");
        tech.textContent = `Technologies: ${project.technologies.join(", ")}`;
        tech.classList.add("technologies");
        projectCard.appendChild(tech);

        if (project.link) {
          const link = document.createElement("a");
          link.href = project.link;
          link.textContent = "View Project";
          link.target = "_blank";
          projectCard.appendChild(link);
        }

        projectContainer.appendChild(projectCard);
      });

      projectsSection.appendChild(projectContainer);
    });

     const contactSection = document.getElementById("contact");

     const contactTitle = document.createElement("h3");
     contactTitle.textContent = data.contact.title;
     contactSection.appendChild(contactTitle);
 
     data.contact.details.forEach(detail => {
       const contactLink = document.createElement("a");
       contactLink.href = detail.link;
       contactLink.textContent = detail.name;
       contactLink.target = "_blank"; 
       contactLink.style.display = "block"; 
       contactSection.appendChild(contactLink);
     });

  })
  .catch((error) => console.error("Error loading JSON:", error));
