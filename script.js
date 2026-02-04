fetch("content.json")
  .then((response) => response.json())
  .then((data) => {
    const navbar = document.querySelector(".navbar");
    data.tabs.forEach((tab) => {
      const tabElement = document.createElement("a");
      tabElement.href = tab.link;
      tabElement.textContent = tab.label;
      tabElement.className = "nav-tab";
      navbar.appendChild(tabElement);
    });

    const aboutSection = document.getElementById("about");
    const aboutMe = document.createElement("h3");
    aboutMe.textContent = data.about.title;
    aboutSection.appendChild(aboutMe);

    data.about.paragraphs.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      aboutSection.appendChild(paragraph);
    });

    if (data.about.resume) {
      const resumeBtn = document.createElement("a");
      resumeBtn.href = data.about.resume;
      resumeBtn.textContent = "View Resume";
      resumeBtn.className = "resume-btn";
      resumeBtn.target = "_blank";
      aboutSection.appendChild(resumeBtn);
    }

    // Experience Section
    const experienceSection = document.getElementById("experience");
    if (data.experience) {
      const expTitle = document.createElement("h3");
      expTitle.textContent = data.experience.title;
      experienceSection.appendChild(expTitle);

      const expContainer = document.createElement("div");
      expContainer.className = "experience-container";

      data.experience.items.forEach((item) => {
        const expCard = document.createElement("div");
        expCard.className = "experience-card";

        if (item.isGroup) {
          // Group (Company-level) View
          expCard.classList.add("experience-group");

          const expHeader = document.createElement("div");
          expHeader.className = "experience-header group-header";

          const companyName = document.createElement("h4"); /* Company is key here */
          companyName.className = "company-name-title";
          companyName.textContent = item.company;

          const duration = document.createElement("span");
          duration.className = "experience-duration";
          duration.textContent = item.duration;

          expHeader.appendChild(companyName);
          expHeader.appendChild(duration);
          expCard.appendChild(expHeader);

          const rolesContainer = document.createElement("div");
          rolesContainer.className = "group-roles-container";

          item.roles.forEach(roleItem => {
            const roleDiv = document.createElement("div");
            roleDiv.className = "role-entry";

            const roleTitle = document.createElement("h5");
            roleTitle.className = "role-title";
            roleTitle.textContent = roleItem.role;
            roleDiv.appendChild(roleTitle);

            if (roleItem.duration) {
              const rDur = document.createElement("span");
              rDur.className = "role-duration";
              rDur.textContent = roleItem.duration;
              roleDiv.appendChild(rDur);
            }

            if (roleItem.description && roleItem.description.length > 0) {
              const descList = document.createElement("ul");
              roleItem.description.forEach((point) => {
                const li = document.createElement("li");
                li.textContent = point;
                descList.appendChild(li);
              });
              roleDiv.appendChild(descList);
            }
            rolesContainer.appendChild(roleDiv);
          });
          expCard.appendChild(rolesContainer);

        } else {
          // Single Role View - Standardized to match Group View
          expCard.classList.add("experience-group");

          const expHeader = document.createElement("div");
          expHeader.className = "experience-header group-header";

          const companyName = document.createElement("h4");
          companyName.className = "company-name-title";
          companyName.textContent = item.company;

          const duration = document.createElement("span");
          duration.className = "experience-duration";
          duration.textContent = item.duration;

          expHeader.appendChild(companyName);
          expHeader.appendChild(duration);
          expCard.appendChild(expHeader);

          // Container for the single role
          const rolesContainer = document.createElement("div");
          rolesContainer.className = "group-roles-container";

          const roleDiv = document.createElement("div");
          roleDiv.className = "role-entry";

          const roleTitle = document.createElement("h5");
          roleTitle.className = "role-title";
          roleTitle.textContent = item.role;
          roleDiv.appendChild(roleTitle);

          if (item.description && item.description.length > 0) {
            const descList = document.createElement("ul");
            item.description.forEach((point) => {
              const li = document.createElement("li");
              li.textContent = point;
              descList.appendChild(li);
            });
            roleDiv.appendChild(descList);
          }

          rolesContainer.appendChild(roleDiv);
          expCard.appendChild(rolesContainer);
        }

        expContainer.appendChild(expCard);
      });
      experienceSection.appendChild(expContainer);
    }


    const skillsSection = document.getElementById("skills");
    const skills = document.createElement("h3");
    skills.textContent = data.skills.title;
    skillsSection.appendChild(skills);

    const skillsContainer = document.createElement("div");
    skillsContainer.className = "skill-container";
    skillsSection.appendChild(skillsContainer);

    data.skills.categories.forEach((category) => {
      const skillCategoryContainer = document.createElement("div");
      skillCategoryContainer.className = "skill-category";

      const categoryTitle = document.createElement("h4");
      categoryTitle.textContent = category.category;
      skillCategoryContainer.appendChild(categoryTitle);

      const skillList = document.createElement("ul");
      category.skills.forEach((skill) => {
        const listItem = document.createElement("li");

        // Icon Support
        if (skill.icon) {
          const icon = document.createElement("i");
          icon.className = skill.icon;
          icon.style.marginRight = "8px";
          listItem.appendChild(icon);
        }

        if (skill.link) {
          const link = document.createElement("a");
          link.href = skill.link;
          link.textContent = skill.name;
          link.target = "_blank";
          listItem.appendChild(link);
        } else {
          const textNode = document.createTextNode(skill.name);
          listItem.appendChild(textNode);
        }

        skillList.appendChild(listItem);
      });
      skillCategoryContainer.appendChild(skillList);
      skillsContainer.appendChild(skillCategoryContainer);
    });

    const certificationsSection = document.getElementById("certifications");

    const title = document.createElement("h3");
    title.textContent = data.certifications.title;
    certificationsSection.appendChild(title);

    const container = document.createElement("div");
    container.classList.add("certifications-container");
    certificationsSection.appendChild(container);

    data.certifications.items.forEach((cert) => {
      const card = document.createElement("div");
      card.classList.add("certification-card");

      const isPdf = cert.image.toLowerCase().endsWith('.pdf');

      if (isPdf) {
        const pdfContainer = document.createElement("div");
        pdfContainer.style.height = "180px";
        pdfContainer.style.display = "flex";
        pdfContainer.style.flexDirection = "column";
        pdfContainer.style.alignItems = "center";
        pdfContainer.style.justifyContent = "center";
        pdfContainer.style.background = "rgba(0,0,0,0.05)"; // subtle contrast
        pdfContainer.style.cursor = "pointer";

        // PDF Icon SVG
        pdfContainer.innerHTML = `
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary);">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
             <polyline points="14 2 14 8 20 8"></polyline>
             <line x1="16" y1="13" x2="8" y2="13"></line>
             <line x1="16" y1="17" x2="8" y2="17"></line>
             <polyline points="10 9 9 9 8 9"></polyline>
           </svg>
           <span style="margin-top:12px; font-size:0.85rem; color:var(--text-secondary);">View Certificate (PDF)</span>
        `;

        pdfContainer.addEventListener('click', () => {
          window.open(cert.image, '_blank');
        });

        card.appendChild(pdfContainer);
      } else {
        const image = document.createElement("img");
        image.src = cert.image;
        image.alt = cert.name;
        image.loading = "lazy";
        card.appendChild(image);
      }

      const name = document.createElement("p");
      name.textContent = cert.name;
      card.appendChild(name);

      container.appendChild(card);
    });

    const projectsSection = document.getElementById("projects");

    const projectsTitle = document.createElement("h3");
    projectsTitle.textContent = data.projects.title;
    projectsSection.appendChild(projectsTitle);

    data.projects.categories.forEach((category) => {
      const projectSectionContainer = document.createElement("div");
      projectSectionContainer.className = "project-section-container";

      if (category.category) {
        const categoryTitle = document.createElement("h4");
        categoryTitle.textContent = category.category;
        projectSectionContainer.appendChild(categoryTitle);
      }

      const projectContainer = document.createElement("div");
      projectContainer.classList.add("project-container");

      category.projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        // Domain Eyebrow (Above Title)
        if (project.domain) {
          const eyebrow = document.createElement("div");
          eyebrow.className = "project-eyebrow";
          eyebrow.textContent = project.domain;
          projectCard.appendChild(eyebrow);
        }

        const name = document.createElement("h5");
        name.textContent = project.name;
        projectCard.appendChild(name);

        const description = document.createElement("p");
        description.textContent = project.description;
        projectCard.appendChild(description);

        if (project.contributions && project.contributions.length > 0) {
          const contributionsList = document.createElement("ul");
          project.contributions.forEach((contribution) => {
            const listItem = document.createElement("li");
            listItem.textContent = contribution;
            contributionsList.appendChild(listItem);
          });
          projectCard.appendChild(contributionsList);
        }

        if (project.technologies) {
          const techContainer = document.createElement("div");
          techContainer.className = "tech-container";

          project.technologies.forEach(tech => {
            const badge = document.createElement("span");
            badge.className = "tech-badge";
            badge.textContent = tech;
            techContainer.appendChild(badge);
          });

          projectCard.appendChild(techContainer);
        }

        if (project.link) {
          const link = document.createElement("a");
          link.href = project.link;
          link.textContent = "View Project";
          link.target = "_blank";
          projectCard.appendChild(link);
        }

        projectContainer.appendChild(projectCard);
      });
      projectSectionContainer.appendChild(projectContainer);
      projectsSection.appendChild(projectSectionContainer);
    });

    // Education Section
    const educationSection = document.getElementById("education");
    if (data.education) {
      const eduTitle = document.createElement("h3");
      eduTitle.textContent = data.education.title;
      educationSection.appendChild(eduTitle);

      const eduGrid = document.createElement("div");
      eduGrid.className = "education-grid";

      data.education.items.forEach((item) => {
        const eduCard = document.createElement("div");
        eduCard.className = "education-card";

        const institution = document.createElement("h4");
        institution.textContent = item.institution;

        const degree = document.createElement("p");
        degree.className = "edu-degree";
        degree.textContent = item.degree;

        const meta = document.createElement("div");
        meta.className = "edu-meta";

        const duration = document.createElement("span");
        duration.textContent = item.duration;

        const gpa = document.createElement("span");
        gpa.textContent = `GPA: ${item.gpa}`; // Fixed string interpolation

        meta.appendChild(duration);
        meta.appendChild(gpa);

        eduCard.appendChild(institution);
        eduCard.appendChild(degree);
        eduCard.appendChild(meta);

        eduGrid.appendChild(eduCard);
      });
      educationSection.appendChild(eduGrid);
    }

    const contactContainer = document.getElementById("social-links");

    data.contact.details.forEach((detail) => {
      const contactLink = document.createElement("a");
      contactLink.href = detail.link;
      contactLink.textContent = detail.name; // Now includes explicit email
      contactLink.target = "_blank";
      contactContainer.appendChild(contactLink);
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');

    if (lightbox) {
      document.querySelectorAll('.certification-card img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          lightbox.classList.add('active');
          lightboxImg.src = img.src;
        });
      });

      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('active');
        }
      });
    }

    // Contact Form Handling (AJAX)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            alert("Thank you! Your message has been sent.");
            contactForm.reset();
          } else {
            alert("Oops! There was a problem submitting your form.");
          }
        } catch (error) {
          alert("Oops! There was a problem submitting your form.");
        } finally {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-tab').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-theme');
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
      });
    }

    // Scroll Spy & Animation Logic

    // 1. Animation Observer (Triggers when element appears)
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeInObserver.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .project-card, .certification-card, .tech-container').forEach(el => {
      el.classList.add('fade-in-section');
      fadeInObserver.observe(el);
    });

    // 2. Scroll Spy Observer (Triggers when section is active)
    const scrollSpyOptions = {
      threshold: 0.2,
      rootMargin: "-20% 0px -60% 0px"
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          // Update Nav
          navMenu.querySelectorAll('.nav-tab').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, scrollSpyOptions);

    document.querySelectorAll('section').forEach(section => {
      scrollSpyObserver.observe(section);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
