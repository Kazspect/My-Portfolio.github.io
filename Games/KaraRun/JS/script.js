// [Header("Board Var")]
let Board;
let boardWidth = 900;
let boardHeight = 300;
let context;

// [Header("Char Var")]
let karaWidth = 90;
let karaHeight = 90;
let karaX = 50;
let karaY = boardHeight - karaHeight;
let karaImg;

// [Header("Obstacles")]
let buildingArray = [];

let building_1Img;
let building_2Img;
let building_3Img;

let building_1Width = 40;
let building_2Width = 70;
let building_3Width = 100;

let buildingHeight = 70;
let buildingX = 900;
let buildingY = boardHeight - buildingHeight;

//[Header("BackGround")]
let cityBGImg;
let cloudsImg;

let cityBGX = 0;
let cloudsBGX = 0;

//[Header("Music")]
let backGroundMusic;
let isMuted = false;

// [Header("Physics")]
let buildingVelocityX = -6;
let jumpVelocityY = 0;
let gravity = .4;

// [Header("End State/Score")]
let gameOver = false;
let playerScore = 0;

let character = {
    x : karaX,
    y : karaY,
    width : karaWidth,
    height : karaHeight,

    charHitboxOffsetX: 28,
    charHitboxOffsetY: 0,
    charHitboxWidth: 38,
    charHitboxHeight: 90
}

window.onload =  function() {
    Board = document.getElementById("Board"); //[Gets the board from html]
    Board.height = boardHeight;
    Board.width = boardWidth;

    context = Board.getContext("2d"); //[allows drawing on the board canvas]

    //[Music]
    backGroundMusic =  new Audio("Assets/Music/Windmill Isle (Night) - Sonic Unleashed [OST].mp3");
    backGroundMusic.loop = true;
    backGroundMusic.volume = 0.5;
    const muteBttn = document.getElementById("MuteBttn");

    muteBttn.addEventListener("click", () => 
    {
        isMuted = !isMuted;
        backGroundMusic.muted = isMuted;
        muteBttn.textContent = isMuted ? "🔈" : "🔊";
    });

    cityBGImg = new Image();
    cityBGImg.src = "./Assets/CityBG.png";
    cloudsImg = new Image();
    cloudsImg.src = "./Assets/Cloud_2.png";

    karaImg = new Image();
    karaImg.src = "./Assets/KaraRight.png";

    karaImg.onload = function() 
    {
        context.drawImage(karaImg, character.x, character.y, character.width, character.height);
    }

    building_1Img = new Image();
    building_1Img.src = "./Assets/Building_1.png";

    building_2Img = new Image();
    building_2Img.src = "./Assets/Building_2.png";

    building_3Img = new Image();
    building_3Img.src = "./Assets/Building_3.png";

    requestAnimationFrame(Update);
    setInterval(placeBuilding, 1000); //This is in milliseconds
    document.addEventListener("keydown", playerInput);
}

function Update() {

    requestAnimationFrame(Update);

    if (gameOver)
    {
        return;
    }

    context.clearRect(0, 0, Board.width, Board.height);

    updateBackground();
    drawBackGround();  
    drawPlayer();
    drawBuildings();
    drawScore();

    buildingVelocityX = -Math.min(12, 6 + playerScore / 4500);
}

function playerInput(e)
{
    if (gameOver)
    {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && character.y == karaY)
    {
        jumpVelocityY = -10;

        if (backGroundMusic.paused)
        {
            backGroundMusic.play();
        }
    }
}

function drawBackGround()
{
    //[Places BackGrounds]
    context.drawImage(cloudsImg, 480, 60, 64, 64);
    context.drawImage(cloudsImg, 400, 60, 64, 64);
    context.drawImage(cloudsImg, 750, 100, 64, 64);
    context.drawImage(cloudsImg, 800, 10, 64, 64);

    context.drawImage(cityBGImg, cityBGX, 60, boardWidth + 230, boardHeight + 90);
    context.drawImage(cityBGImg, cityBGX + boardWidth, 60, boardWidth + 230, boardHeight + 90);

    context.drawImage(cloudsImg, 40, 20, 64, 64);
    context.drawImage(cloudsImg, 250, 50, 64, 64);
    context.drawImage(cloudsImg, 450, 30, 64, 64);
    context.drawImage(cloudsImg, 600, 70, 64, 64);
}

function updateBackground()
{
    cityBGX = buildingVelocityX * 0.15 + cityBGX;

    if (cityBGX <= -boardWidth)
    {
        cityBGX = 0;
    }

}

function drawPlayer()
{
    jumpVelocityY += gravity;
    character.y = Math.min(character.y + jumpVelocityY, karaY); //Applies gravity

    context.drawImage(karaImg, character.x, character.y, character.width, character.height);
}

function drawBuildings()
{
    for (let i = 0; i < buildingArray.length; i++) 
    {
        let building = buildingArray[i];

        building.x += buildingVelocityX;

        //[Places building images]
        context.drawImage(building.img, building.x, building.y, building.width, building.height);

        if (collisionDetection(character, building))
        {
            gameOver = true;
            karaImg.src = "Assets/KaraDeath.png";

            karaImg.onload = function()
            {
                context.drawImage(karaImg, character.x, character.y, character.width, character.height);
            }
        }
    }
}

function drawScore()
{
    context.fillStyle="dark blue";
    context.font="30px Impact";
    playerScore++;
    context.fillText(playerScore, 5, 30);
}

function placeBuilding()
{
    if (gameOver)
    {
        return;
    }

    let building = {
        img : null,
        x : buildingX,
        y : buildingY,
        width : null,
        height : buildingHeight,

        hitboxOffsetX: 0,
        hitboxOffsetY: 0,
        hitboxWidth: null,
        hitboxHeight: null
    }

    let buildingChance = Math.random();

    if (buildingChance > .85) //[buidling 3]
    {
        building.img = building_3Img;
        building.width = building_3Width;

        building.hitboxOffsetX = 0;
        building.hitboxOffsetY = 5;
        building.hitboxWidth = building.width - 0;
        building.hitboxHeight = building.height - 0;

        buildingArray.push(building);
    }
    else if (buildingChance > .6) //[buidling 2]
    {
        building.img = building_2Img;
        building.width = building_2Width;

        building.hitboxOffsetX = 5;
        building.hitboxOffsetY = 5;
        building.hitboxWidth = building.width - 8;
        building.hitboxHeight = building.height - 0;

        buildingArray.push(building);
    }
    else if (buildingChance > .45) //[buidling 1]
    {
        building.img = building_1Img;
        building.width = building_1Width;

        building.hitboxOffsetX = 6;
        building.hitboxOffsetY = 2;
        building.hitboxWidth = building.width - 10;
        building.hitboxHeight = building.height - 0;

        buildingArray.push(building);
    }

    if (buildingArray.length > 4)
    {
        buildingArray.shift(); //[Removes the first element from the array list.]
    }
}

function collisionDetection(objectA, objectB)
{
    let charHitbox = 
    {
        x: objectA.x + objectA.charHitboxOffsetX,
        y: objectA.y + objectA.charHitboxOffsetY,
        width: objectA.charHitboxWidth,
        height: objectA.charHitboxHeight
    };

    let buildingHitbox = 
    {
        x: objectB.x + objectB.hitboxOffsetX,
        y: objectB.y + objectB.hitboxOffsetY,
        width: objectB.hitboxWidth,
        height: objectB.hitboxHeight
    };

    return charHitbox.x < buildingHitbox.x + buildingHitbox.width && 
            charHitbox.x + charHitbox.width > buildingHitbox.x &&
            charHitbox.y < buildingHitbox.y + buildingHitbox.height &&
            charHitbox.y + charHitbox.height > buildingHitbox.y;
}

// context.strokeStyle = "green";
    // context.strokeRect(
    //         character.x + character.charHitboxOffsetX,
    //         character.y + character.charHitboxOffsetY,
    //         character.charHitboxWidth,
    //         character.charHitboxHeight
    //     )
    //[Code for visual character hitbox to be adjusted.]

    // context.strokeStyle = "red";
        // context.strokeRect(
        //     building.x + building.hitboxOffsetX,
        //     building.y + building.hitboxOffsetY,
        //     building.hitboxWidth,
        //     building.hitboxHeight
        // )
        //[Code for visual building hitbox to be adjusted.]
