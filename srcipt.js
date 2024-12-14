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
  })
  .catch((error) => console.error("Error loading JSON:", error));
