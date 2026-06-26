const projectsTemp = {
    echoesOfMateria : {
        title: "Echoes of Materia",
        genre: "First-Person collectathon",
        image:"Assets/EchoesOfMateriaMenu.png",
        mediaType: "image",
        overview: "A fun relaxing first-person collectathon game set in a world where dimensions merged.",
        role: "Game Developer<br> Scripter<br> Level Designer<br> Environment Designer<br> UI Designer",
        programs: "Unity<br> Sketchfab<br> Krita<br> FreeSounds"
    },

    librarynth : {
        title: "Li-brarynth",
        genre: "2D Speedrunner",
        image:"Assets/Li-brarynth.png",
        mediaType: "image",
        overview: "A small fun 2D speedrunner that takes you through the depths of a haunted library",
        role: "Game Developer<br> Scripter<br> Level Designer<br> Environment Designer<br> UI Designer",
        programs: "Unity<br> Krita<br> Piskel<br> FreeSounds" 
    },

    veiledBelow : {
        title: "Veiled Below",
        genre: "2D Platformer",
        image:"Assets/Veiled Below.png",
        mediaType: "image",
        overview: "My first 2D game that has a simple get to the end of the level structure.",
        role: "Game Developer<br> Scripter<br> Level Designer<br> Environment Designer<br> UI Designer",
        programs:"Unity<br> Krita<br> Piskel<br> FreeSounds"
    },

    bauhausPoster : {
        title: "Bauhaus Poster Illustration",
        genre: "Bauhaus Artwork",
        image:"Assets/Bauhaus_Poster_Sideways(Final-Product).jpg",
        mediaType: "image",
        overview: "A Bauhaus poster made during my research on the subject. Simple design as expected from Bauhaus.",
        role: "Artist<br>Layout Designer<br>Illustrator",
        programs:"Adobe Illustrator<br>Miro"
    },

    legoRenderRTX : {
        title: "Lego Devil Rendered",
        genre: "3D Modelling",
        image: "Assets/LegoRenderRTX.jpg",
        mediaType: "image",
        overview: "A Lego character 3D model created based on the folk tale Van Hunks and the Devil.",
        role: "3D Modeller<br>Texture Painter<br>Rendering Artist",
        programs: "Autodesk Maya<br>Substance Painter<br>Substance Stager<br>Apple Quicktime Player"
    },

    legoRenderVid : {
        title: "Lego Devil Rendered Video",
        genre: "Rendering Video",
        image: "Assets/LegoRenderRTX.jpg",
        video: "Assets/legoRender.mp4",
        mediaType: "video",
        overview: "A Lego character 3D model created based on the folk tale Van Hunks and the Devil.",
        role: "3D Modeller<br>Texture Painter<br>Rendering Artist",
        programs: "Autodesk Maya<br>Substance Painter<br>Substance Stager<br>Apple Quicktime Player"
    },

    stopMotionVid : {
        title: "Stop Motion Video",
        genre: "Stop Motion",
        image: "Assets/Stop Motion Thumbnail.png",
        video: "Assets/Stop Motion.mp4",
        mediaType: "video",
        overview: "A stop motion video created within a short time period during my animation studies.",
        role: "Photographer<br>Character Designer<br>Model Maker/Set Builder<br>Rigger",
        programs: "Adobe Media Encoder<br>Phone Camera"
    },

    animationPoseStaff : {
        title: "Staff Wielding Pose",
        genre: "3D Animation",
        image: "Assets/01_Pose_Wielding a Staff 1.png",
        mediaType: "image",
        overview: "Animating character poses based on a topic given to me. Topic: Wielding Something.",
        role: "3D Animator<br>3D Modeller<br>Texture Painter",
        programs: "Autodesk Maya<br>Apple Quicktime Player"
    },

    animationKneeling : {
        title: "Kneeling Pose",
        genre: "3D Animation",
        image: "Assets/07_Pose_ Kneeling.png",
        mediaType: "image",
        overview: "Animating character poses based on a topic given to me. Topic: Kneeling.",
        role: "3D Animator<br>3D Modeller<br>Texture Painter",
        programs: "Autodesk Maya<br>Apple Quicktime Player"
    },

    challengeDrawing_01 : {
        title: "Drawing Challenge No.01",
        genre: "2D Artwork",
        image: "Assets/ChallengeDrawingNo.1.jpg",
        mediaType: "image",
        overview: "Drawing challenge I did with a friend with a couple of topics.<br>Topics: Ice, Animal Ears, Modern Clothing",
        role: "Artist",
        programs: "Krita"
    },

    chibiKazspect : {
        title: "2D Kazspect Ability",
        genre: "2D Artwork",
        image: "Assets/Chibi_GojoPose_Final.jpg",
        mediaType: "image",
        overview: "Drawing of my OC doing an attack referencing Gojo from JJK.",
        role: "Artist",
        programs: "Krita"
    },

    sneakingCharacter : {
        title: "2D Character Sneaking",
        genre: "2D Artwork",
        image: "Assets/SneakingPose_Colour.jpg",
        mediaType: "image",
        overview: "Drawing of a new character for a game concept sneaking around.",
        role: "Artist",
        programs: "Krita"
    }
};

const parameters = new URLSearchParams(window.location.search);
const projectKey = parameters.get("project");

const project = projectsTemp[projectKey];

const container = document.getElementById("Project-Content");

const visibleProjects = 4;
let startIndex = 0;

const multi_ProjectKeys = Object.keys(projectsTemp);

function renderThumbnails() {
    
    const thumbnailContainer = document.getElementById("thumbnailContainer");

    const visible = multi_ProjectKeys.slice(startIndex, startIndex + visibleProjects);

    thumbnailContainer.innerHTML = visible.map(key => `
        
        <a href="ProjectDetails.html?project=${key}">

            <img src="${projectsTemp[key].image}" alt="${projectsTemp[key].title}"
            class="Project-Thumbnail">

        </a>
        
    `).join("");

}



if (project) {

    const thumbnails = Object.entries(projectsTemp).map(([key, proj]) => `
    <a href="ProjectDetails.html?project=${key}">
    
        <img src="${proj.image}" alt="${proj.title}" 
        class="Project-Thumbnail ${key === projectKey ? 'Active-Thumbnail' : ''}">
    
    </a>
    
    `).join("");

    const mediaHTML = project.mediaType === "video" ? 
    `
    
        <video class="Card-Image" controls autoplay muted loop>

            <source src="${project.video}" type="video/mp4">
            Your Browser Does Not Support The Video.

        </video>
    
    ` : 
    `

        <img class="Card-Image" src="${project.image}" alt="${project.title}">
    
    `;

    container.innerHTML = `

    <div class="container Card-Layout">

        <div class="row mt-4">

            <div class="col-12 col-md-7 g-4">

                <h1 class="Card-Title">${project.title}</h1>

                <h2 class="Card-Genre">${project.genre}</h2>

                ${mediaHTML}
                
                <div class="Thumbnail-Wrap">

                    <button id="prev-btn" class="Thumnail-Arrow"> < </button>

                    <div class="Thumbnail-Container" id="thumbnailContainer">

                    </div>

                    <button id="next-btn" class="Thumnail-Arrow"> > </button>

                </div>

            </div>

            <div class="col-12 col-md-4 offset-md-1 g-4">

                <h2 class="overviewTitle">Overview</h2>

                <p class="Card-Overview">${project.overview}</p>

                <h2 class="roleTitle">Role</h2>

                <p class="Card-Role">${project.role}</p>

                <h2 class="programsTitle">Programs</h2>

                <p class="Card-Programs">${project.programs}</p>

            </div>

        </div>

    </div>

    `;

    renderThumbnails();

    document.getElementById("prev-btn").addEventListener("click", () => {
    
        if (startIndex > 0){
            startIndex--;
            renderThumbnails();
        }
    
    });

    document.getElementById("next-btn").addEventListener("click", () => {
    
        if (startIndex < multi_ProjectKeys.length - visibleProjects){
            startIndex++;
            renderThumbnails();
        }
    
    });

}

else{
    container.innerHTML = `<h1>Project not Found</h1>`;
}