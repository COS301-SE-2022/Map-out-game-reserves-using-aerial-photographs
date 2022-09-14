<a name="readme-top"></a>
<div align = "center">
  <a href="https://github.com/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs/">
    <img src="https://user-images.githubusercontent.com/82899425/190245331-a8bdba36-c95e-43ce-81a1-c044752b134b.png" alt="Logo" height="220">
    <br />
  </a> 

[![codecov](https://codecov.io/gh/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs/branch/develop/graph/badge.svg?token=G5PT5BHCO4)](https://codecov.io/gh/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs)

[![Default Test](https://github.com/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs/actions/workflows/nxtest.yml/badge.svg)](https://github.com/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs/actions/workflows/nxtest.yml)

[![Dependencies](https://img.shields.io/librariesio/github/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs)](https://libraries.io/github/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs)
<!-- [![Issues](https://img.shields.io/github/issues/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs)](https://github.com/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs/issues) -->

<h1>Map Out Game Reserves Using Aerial Photographs</h1>

"The Map Out Game Reserves Using Aerial Photographs" application is an Angular desktop application that aims to take videography of game parks from drones and use intelligent image stitching and AI-driven recognition focus to create an interactive map. This assists in not only animal-preservation but park-preservation too.

  >This project is affiliated with the University of Pretoria COS301 Software Engineering module. The team in charge of its development is <a href="#The Dylpickles">The Dylpickles</a>.
 
 <!-- TODO: ADD IN DEMO RECORDINGS!!!!-->
 <a href="https://github.com/github_username/repo_name">View most recent demo</a>
 ·
 <a href="#Docs">Explore the docs</a>
 ·
 [Email us](mailto:thedylpickles1@gmail.com)
 <!-- <mailto:thedylpickles1@gmail.com> -->
 
 </div>
 
 <!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#indepth-project description">A more in-depth project description</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#demos">Demos</a></li>
    <li>
      <a href="#Docs">Documentation</a>
      <ul>
        <li><a href="#SRS">Software Requirements Specification</a></li>
        <li><a href="#architectural">Architectural Requirements</a></li>
        <li><a href="#coding-stds">Coding Standards</a></li>
        <li><a href="#user-manual">User Manual</a></li>
        <li><a href="#installation-manual">Installation Manual</a></li>
      </ul>
    </li>
    <li>
      <a href="#project-management">Project Management</a>
      <ul>
        <li><a href="#project-board">Project Board</a></li>
        <li><a href="#pert-charts">PERT Charts</a></li>
      </ul>
    </li>
    <li><a href="#The Dylpickles">The Team</a></li>
  </ol>
</details>

<a name="indepth-project description"></a>
<h2>The Dylpickles - A more in-depth project description</h2>

A system for taking in aerial footage of various types and performing both image stitching and satellite map overlays. This is to help in the effort to conserve the state of national parks in South Africa and allows a user to manage footage and maps associated with parks and provide secure access to imagery assets. Some advanced features include the generation of 3D point clouds from the 2D images, splitting videos into frames for stitching, georeferncing of images to be overlayed onto existing maps and object recognition to highlight artifacts of interest.

Nature conservation and anti-poaching initiatives are a major focus area in our society. From movement sensing cameras, to tracking collars on animals, technology plays a major role in the conservation of endangered animals.
While the small satellite industry is doing extremely well in terms of earth imaging in higher and higher spatial and temporal resolution, they can not be used to resolve anything less than 0.5m per pixel currently. High resolution aerial footage largely solves this issue but doesn’t have the same field of view of a satellite. 
In order to solve this problem, we plan on bridging this gap by taking multiple aerial images and using their identifiable features to overlay and join images into a detailed bigger picture. This will be optimised by either supervised or unsupervised image recognition machine learning techniques. This will allow for various analysis to be performed, such as snare and trap detection, localised water scarcity, changes in animal paths and tracking changes in vegetation health among others.

Drones allow for a more up to date set of images of a landscape, this allows much higher temporal resolution and can help mitigate many issues currently faced in conservation. A key mission in the project will be that of tracking changes in an area over time, so a large part of the project will be focused on optimising that core functionality.

<p align="right"><a href="#readme-top">Back to top</a></p>

<a name="built-with"></a>
<h3>Built with</h3>

<!-- https://github.com/alexandresanlim/Badges4-README.md-Profile#readme -->

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![AmazonAWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![AmazonDynamo](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)](https://aws.amazon.com/dynamodb/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![GraphQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=Jasmine&logoColor=white)](https://jasmine.github.io/)
[![Latex](https://img.shields.io/badge/LaTeX-47A141?style=for-the-badge&logo=LaTeX&logoColor=white)](https://www.latex-project.org/)
[![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://www.linux.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)](https://www.python.org/)
[![Tensorflow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)

<!--TODO: DO WE USE NESTJS?
https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white-->
<!--TODO: DO WE USE DJANGO?
https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green-->

<p align="right"><a href="#readme-top">Back to top</a></p>

<a name="getting-started"></a>

<h2>Getting Started</h2>

```sh
npm install 
npm start
```

<p align="right"><a href="#readme-top">Back to top</a></p>

<a name="demos"></a>

<h2>Demos</h2>
<!-- TODO: ADD IN DEMO RECORDINGS!!!!-->

<a name="Docs"></a>
<h2>Documentation</h2>

<a name="SRS"></a>
<h3>Functional Requirements (SRS)</h3>
<a href="https://drive.google.com/file/d/1A-zZJGLOnGaVaDLI2wWaVRxTWAIY9--m/view?usp=sharing">Version 1</a><br/>
<a href="https://drive.google.com/file/d/1hQEqsjVKGEA6bgIgqMEVHkNoJNtx4yqa/view?usp=sharing">Version 2</a><br/>
<a href="https://drive.google.com/file/d/1nhVyc_dyepSc26Eq_GtWMRxwuGvDG1rl/view?usp=sharing">Version 3</a><br/>

<a name="architectural"></a>
<h3>Architectural Requirements</h3>
<a href="https://drive.google.com/file/d/1e-WkXni-e-zc_NSjDJw0AZE73m-PvhV-/view?usp=sharing">Version 1</a><br/>
<a href="https://drive.google.com/file/d/1UlkzT1v6qDIlQyOasSALRpOcDg4wKJ_m/view?usp=sharing">Version 2</a><br/>

<a name="coding-stds"></a>
<h3>Coding Standards</h3>
<a href="https://drive.google.com/file/d/1JzXJ_9kVZoqfU8mCXWa-8tOkUgZt_YO6/view?usp=sharing">Version 1</a><br/>
<a href="https://drive.google.com/file/d/1yOeuRyyG7H1HrlFbTXZQvgh7Uvb5MSpc/view?usp=sharing">Version 2</a><br/>

<a name="user-manual"></a>
<h3>User Manual</h3>
<a href="https://drive.google.com/file/d/10GUkj-MJ_sZCM_SJ1v5H1Q3gyMxPlain/view?usp=sharing">Version 1</a><br/>
<a href="https://drive.google.com/file/d/13FJf7pFlKzQywgaQBbDzcvXdB-wjSSEF/view?usp=sharing">Version 2</a><br/>

<a name="installation-manual"></a>
<h3>Technical Installation Manual</h3>
<a href="https://drive.google.com/file/d/1p42xaO1aWfH4uEBDKKeEXU7Zo2g64_Qw/view?usp=sharing">Version 1</a><br/>

<p align="right"><a href="#readme-top">Back to top</a></p>

<a name="project-management"></a>
<h2>Project Management</h2>
<a name="project-boards"></a>
<h3>Project Board</h3>
<a href="https://github.com/COS301-SE-2022/Map-out-game-reserves-using-aerial-photographs/projects/1">The Dylpickles Project Board</a><br/>

<a name="pert-charts"></a>
<h3>Pert Charts</h3>
<a href="https://drive.google.com/drive/folders/1ViOZM8pTN3BRzcnq7dvTfDCxHX95ooWK?usp=sharing">The Dylpickles PERT Charts</a><br/>

<p align="right"><a href="#readme-top">Back to top</a></p>

<a name="The Dylpickles"></a>
<h2>The Dylpickles</h2>

| Member | Profile |
|:-:|-|
| Ben Pietersen <br> <img src="https://avatars.githubusercontent.com/u/58931477?v=4" align="left" width="500px"/>| [![LinkeIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ben-pietersen-6a775713b/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OomBen) <br/> Has an elective background in GIS and remote sensing as well as educational experience with multispectral and hyperspectral satellite image processing using ENVI and ESA’s SNAP software. Industry experience includes over a year of data analysis and statistics for an IT solutions company based in Rosebank. Knowledge relevant to the project includes satellite image mapping, processing, filtering and analysis. |
| Chiara Goncalves <br> <img src="https://avatars.githubusercontent.com/u/93533302?v=4" align="left" width="500px"/>| [![LinkeIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chiara-goncalves-a1771223a/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chichi091) <br/> Has a background in web development and an elective in computer graphics. Has experience working with Angular projects and database design and implementation. Trained in Java, C++, Python, and JavaScript. Skilled at designing creative solutions to problems. Knowledge of South African nature reserves and various habitats and biomes within the reserves. |
| Dylan Pietersen <br> <img src="https://avatars.githubusercontent.com/u/61905387?v=4" align="left" width="500px"/>| [![LinkeIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dylan-pietersen-84462a174/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dylan2894) <br/> Has an elective background in Software Development and Informatics. Well versed full-stack developer. Proficient with various programming languages such as C/C++, JavaScript, Java and Python. Proficient in various front-end JavaScript frameworks such as Angular, React and Ionic. Has project experience with the MEAN, MERN as well as the LAMP technology stacks. Creative individual with an interest in genuinely adding value back to the wildlife and conservation community. |
| Dylan Spies <br> <img src="https://avatars.githubusercontent.com/u/64324515?v=4" align="left" width="500px"/>| [![LinkeIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dylan-spies-0a257722b/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dylanspies) <br/> Has a passion for Computer Software and Hardware for the past 6 and a half years and enjoys the problem solving aspect of programming. Is comfortable with Java, C/C++, Javascript, Python, and Assembly. Has had experience with the Angular framework and should be able to pick up any frameworks and languages with relative ease.Has elective background in Geology and an overall passion for animals and nature conservation. |
| Steven Schormann <br> <img src="https://avatars.githubusercontent.com/u/93655532?v=4" align="left" width="500px"/>| [![LinkeIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/steven-schormann-385208205/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Steven-Schormann) <br/> Has a passion for problem solving and experience in full stack Software Development. Proficient in Java, C++, Javascript, python and capable of learning whatever might be required. Has an interest in machine learning with an elective in Artificial Intelligence. |
| Zoe Liebenberg <br> <img src="https://avatars.githubusercontent.com/u/82899425?s=400&u=9822f2e3a3ba398acf53bc4913b1524137c5a0cc&v=4" align="left" width="500px"/>| [![LinkeIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zoe-liebenberg-3ba6a623a) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ZoeLiebenberg) <br/> Has had experience working with drones. Has been working with computers and programming for the past 5 and a half years. Able to pick up coding languages quickly and easily. Has a passion for mathematics and problem solving. Handy in web development and interacting with databases. Extremely detail oriented and will ensure that every detail is planned towards the bigger picture. |

<p align="right"><a href="#readme-top">Back to top</a></p>
