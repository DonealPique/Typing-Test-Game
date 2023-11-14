const typing_text = document.querySelector('.text-content p');
const inputField = document.querySelector('.input-box');
const errorTag = document.querySelector('.errors span');
const timeTag = document.querySelector('.time span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const button = document.querySelector('button');

let characterIndex = 0;
let errors = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = 0;
let currentParagraph = 0;

const paragraphs = [
    "The vibrant sunlight poured through the leaves, casting intricate patterns on the ground. Birds chirped in the distance, creating a melody that echoed through the serene forest. A gentle breeze carried the fragrance of blooming flowers, making the air crisp and refreshing.",

    "The bustling city streets were filled with the symphony of life—a cacophony of car horns, chatter, and footsteps. Skyscrapers reached towards the sky, their glass facades reflecting the golden hues of the setting sun. People hurried past, each with their own destination in mind, amidst the urban chaos.",

    "Amidst the vast expanse of the ocean, the waves danced gracefully, their rhythmic motion soothing to the soul. Seagulls glided effortlessly, their calls blending with the sound of crashing waves. The horizon melded the hues of the sky and sea into a stunning canvas of blues and golds.",

    "In the heart of the ancient forest, towering trees formed a majestic canopy overhead. Moss-covered stones adorned the forest floor, while elusive creatures scurried among the ferns. Sunlight filtered through the foliage, creating a mystical aura that enchanted every visitor.",

    "The tranquil countryside stretched far and wide, with rolling hills blanketed in lush greenery. A babbling brook snaked its way through the landscape, glistening under the midday sun. Wildflowers swayed gently in the breeze, painting the fields with bursts of color.",

    "High atop the snow-capped mountains, the air was crisp and thin, carrying the scent of pine. Majestic peaks pierced the sky, their rugged slopes a challenge for the adventurous. A lone eagle soared overhead, surveying the vast and awe-inspiring panorama.",

    "Within the bustling marketplace, vendors called out their wares, filling the air with a medley of voices. Aromatic spices intertwined with the aroma of freshly baked bread, enticing passersby. Colorful fabrics swayed in the wind, creating a vibrant tapestry of cultures.",

    "Under the starry night sky, the cityscape transformed into a glittering panorama. Skyscrapers twinkled with a myriad of lights, resembling a celestial canvas. The moon cast its silvery glow, lending an ethereal aura to the urban landscape.",

    "Deep within the canyon, the echoes of rushing water reverberated off the stone walls. The river carved its path, its turquoise waters weaving through the rugged terrain. Tall cliffs stood sentinel, their weathered faces a testament to the passage of time.",

    "Within the ancient ruins, whispers of bygone civilizations lingered in the air. Moss-covered columns stood as silent sentinels to a forgotten era. Symbols etched into weathered stone hinted at tales untold, shrouded in the mysteries of antiquity.",

    "Amidst the rolling plains, the tall grass swayed in harmony with the gentle breeze. Herds of grazing animals painted the landscape, their synchronized movements a dance of nature. The horizon stretched endlessly, meeting the sky in a seamless blend of colors.",

    "Beneath the sprawling canopy of stars, the campfire crackled, casting flickering shadows. Tales of bravery and adventure unfolded amidst the glow, captivating the eager listeners. The night air was filled with laughter and the warmth of camaraderie.",

    "Upon the tranquil lake, the reflection of the snow-capped peaks mirrored a picture-perfect scene. A solitary boat glided silently, leaving ripples that disrupted the mirrored surface. The tranquility of the surroundings enveloped the soul in serene calmness.",
    ,
    "Within the bustling metropolis, a symphony of sounds melded into a melodic chaos. Neon lights adorned skyscrapers, painting the night sky in vibrant hues. The city streets pulsed with energy, each corner holding a story, waiting to be discovered.",

    "At the edge of the forest, the first light of dawn painted the sky in hues of pink and gold. Birds greeted the morning with a chorus of songs, heralding the start of a new day. Dew-kissed leaves shimmered, reflecting the promise of fresh beginnings.",

    "Nestled in a secluded valley, a hidden waterfall cascaded gracefully into a crystal-clear pool. Sunbeams danced upon the water's surface, creating a dazzling spectacle. Lush vegetation adorned the surroundings, a sanctuary of serenity and beauty.",
    ,
    "In the heart of the desert, dunes stretched endlessly, shaped by the winds of time. The vast expanse painted a mesmerizing canvas of golden sands. The sun cast an intense glow, painting the horizon with fiery hues during the day, while the night sky revealed a celestial spectacle.",

    "Within the old library, shelves lined with weathered tomes stood as gatekeepers of knowledge. The scent of ancient parchment wafted through the air, inviting curious minds. Dusty corridors held secrets, waiting for those who sought the wisdom of ages past.",

    "Atop the cliff's edge, a panoramic view unveiled the grandeur of the valley below. The rugged landscape spread like a tapestry, embellished with a myriad of colors. A falcon soared majestically, mastering the art of flight against the backdrop of nature's masterpiece.",

    "Within the buzzing hive, diligent worker bees orchestrated a symphony of industry. Honeycombs glistened with golden nectar, a testament to their tireless labor. The air hummed with purpose, echoing the harmony of a thriving community.",

    "Beneath the starlit sky, a solitary lighthouse stood sentinel on the rocky coastline. Its beam of light pierced the darkness, guiding lost souls back to safety. The waves crashed against the shore, a constant reminder of the eternal dance between land and sea.",

    "Amidst the ancient temple ruins, carved stone sculptures stood as remnants of a glorious era. Enigmatic hieroglyphs adorned the walls, preserving tales of myth and legend. The silence carried the weight of history, inviting contemplation and wonder.",

    "Within the city park, vibrant flora intermingled with the laughter of children at play. Serene ponds reflected the azure sky, home to graceful swans and colorful koi. The rhythmic rustle of leaves provided a peaceful escape from the urban bustle.",

    "At the heart of the marketplace, vendors displayed a mosaic of goods, each telling its own story. Aromas of spices and exotic fruits mingled, enticing passersby to explore the bustling lanes. The tapestry of culture unfolded in a vibrant display of diversity.",

    "Deep within the caverns, stalactites hung like crystalline chandeliers, glistening in the faint glow of underground streams. Shadows danced on the walls, revealing the hidden beauty of the subterranean world. The silence held an eerie tranquility, a realm untouched by time.",

    "Within the quaint village, cobblestone streets weaved between charming cottages adorned with colorful blooms. The aroma of freshly baked bread wafted from the local bakery, welcoming all who passed by.",

    "High atop the mountain peak, a lone monastery overlooked the valley below. Prayer flags fluttered in the mountain breeze, while monks meditated in serene silence, surrounded by panoramic views.",

    "In the midst of the carnival, laughter and music filled the air as colorful rides spun in a whirl of excitement. The scent of cotton candy and popcorn added to the festive atmosphere.",

    "Within the art gallery, masterpieces adorned the walls, each stroke of paint telling a unique story. Visitors wandered amidst sculptures and canvases, lost in the world of creativity.",

    "Amidst the cherry blossom trees, petals danced in the spring breeze, creating a picturesque scene. Families gathered for hanami, enjoying picnics under the blooming sakura.",

    "In the midst of the thunderstorm, flashes of lightning illuminated the sky, followed by the rumbling echoes of thunder. Raindrops tapped against windows, creating a soothing melody.",

    "Within the bustling train station, commuters hurried to catch their trains amidst the symphony of announcements and clattering tracks. The station echoed with a sense of constant motion and purpose.",

    "Under the canopy of stars, a campfire crackled, casting a warm glow on faces that shared stories amidst the flickering light. The night sky revealed a galaxy of wonders overhead.",

    "Deep within the enchanted forest, ancient trees formed a labyrinth of shadows and whispers. Ethereal beings flitted between branches, elusive yet captivating.",

    "At the harbor, fishing boats bobbed rhythmically on the gentle waves, while seagulls soared overhead, seeking their morning catch. The salty air carried tales of distant voyages.",

    "Within the university library, rows of books stood as silent guardians of knowledge. Scholars and students delved into studies, their curiosity a beacon of intellectual pursuit.",

    "High in the alpine meadow, wildflowers swayed in the mountain breeze, painting the landscape in a vibrant palette. The distant melody of a shepherd's flute echoed through the valleys.",

    "At the heart of the city square, street performers dazzled passersby with their talents, drawing crowds that applauded their artistry. The square buzzed with life and creativity.",

    "Beneath the sprawling oak tree, a storyteller enthralled children with tales of heroes and mythical creatures, sparking their imagination amidst the rustling leaves.",

    "In the midst of the desert, the sand dunes shifted in an endless dance, sculpted by the whims of the wind. The vast expanse seemed to whisper secrets of time.",

    "Within the temple courtyard, monks chanted in unison, their voices reverberating against ancient walls. Incense perfumed the air, enveloping the space in tranquility.",

    "Amidst the carnival rides, neon lights illuminated the night, casting a colorful glow on the laughter-filled faces of thrill-seekers. The aroma of funnel cakes wafted through the air.",

    "In the heart of the vineyard, grapevines sprawled across the landscape, their luscious fruit ripening under the sun. A symphony of wine-making awaited the harvest.",

    "Deep within the tropical rainforest, a cacophony of wildlife filled the air with a chorus of calls. Exotic flora and fauna painted a vibrant tapestry of biodiversity.",

    "At the edge of the cliff, the ocean stretched endlessly, its waves crashing against the rocks below. Seabirds soared on ocean breezes, exploring the boundless horizon."
];

function getRandomParagraph() {
    return paragraphs[currentParagraph];
}

function randomParagraph() {
    const result = getRandomParagraph();
    typing_text.innerHTML = "";

    result.split("").forEach((span) => {
        let spanTag = `<span>${span}</span>`;
        typing_text.innerHTML += spanTag;
    });

    typing_text.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', () => inputField.focus());
    typing_text.addEventListener('click', () => inputField.focus());
}

function showNextParagraph() {
    currentParagraph++;

    if (currentParagraph >= paragraphs.length) {
        currentParagraph = 0;
    }

    timeLeft += 10;
    timeTag.innerText = timeLeft;
    randomParagraph();
}

function initTyping(event) {
    const characters = typing_text.querySelectorAll('span');
    let typedCharacter = inputField.value.split("")[characterIndex];

    if (characterIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedCharacter == null) {
            characterIndex--;

            if (characters[characterIndex].classList.contains('incorrect')) {
                errors--;
            }

            characters[characterIndex].classList.remove('correct', 'incorrect');
        } else {
            if (characters[characterIndex].innerText === typedCharacter) {
                characters[characterIndex].classList.add('correct');
            } else {
                errors++;
                characters[characterIndex].classList.add('incorrect');
            }
            characterIndex++;
        }

        characters.forEach(span => span.classList.remove('active'));
        characters[characterIndex].classList.add('active');

        errorTag.innerText = errors;

        cpmTag.innerText = characterIndex - errors;

        let wpm = Math.round((((characterIndex - errors) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
    } else {
        inputField.value = "";
        clearInterval(timer);
        showNextParagraph();
    } 
    {
    }
}

inputField.addEventListener('input', initTyping);

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    currentParagraph = 0;
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    characterIndex = 0;
    errors = 0;
    isTyping = 0;
    timeTag.innerText = timeLeft;
    errorTag.innerText = errors;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;

    const characters = typing_text.querySelectorAll('span');
    characters.forEach((span) => {
        span.classList.remove('correct', 'incorrect', 'active');
    });
}

button.addEventListener('click', resetGame);

randomParagraph();
