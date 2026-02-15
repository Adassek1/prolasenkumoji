function sklonuj(cislo, tvary) {
    cislo = Math.abs(cislo);
    if (cislo === 1) return cislo + " " + tvary[0];
    if (cislo >= 2 && cislo <= 4) return cislo + " " + tvary[1]; 
    return cislo + " " + tvary[2]; 
}

function updateCounter() {
    const startDate = new Date('2024-09-01T16:47:00');
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();

    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months--;
    }
    if (months < 0) { months += 12; years--; }

    const textRoky = sklonuj(years, ["rok", "roky", "let"]);
    const textMesice = sklonuj(months, ["měsíc", "měsíce", "měsíců"]);
    const textDny = sklonuj(days, ["den", "dny", "dní"]);
    const textHodiny = sklonuj(hours, ["hodinu", "hodiny", "hodin"]);

    const fullCountElement = document.getElementById('full-count');
    const secondsElement = document.getElementById('seconds-count');

    if (fullCountElement) {
        fullCountElement.innerText = `${textRoky}, ${textMesice}, ${textDny} a ${textHodiny}`;
    }
    
    if (secondsElement) {
        const diffInMs = now - startDate;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        secondsElement.innerText = "(" + diffInSeconds.toLocaleString() + " sekund)";
    }
}

setInterval(updateCounter, 1000);
updateCounter();

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const icons = ['❤️', '💖', '💗', '💕', '✨'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    const fallDuration = Math.random() * 3 + 2;
    heart.style.animationDuration = fallDuration + 's';

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), fallDuration * 1000);
}

setInterval(createFallingHeart, 2000); 

const loveButton = document.getElementById('love-button');
if (loveButton) {
    loveButton.addEventListener('click', () => {
        for (let i = 0; i < 40; i++) {
            setTimeout(createFallingHeart, i * 30);
        }
        
        const originalText = loveButton.innerText;
        loveButton.innerText = "Miluju Tě! 💖";
        setTimeout(() => {
            loveButton.innerText = originalText;
        }, 2000);
    });
}

const beautyButton = document.getElementById('beauty-button');
const beautyOverlay = document.getElementById('beauty-overlay');
const closeBtn = document.querySelector('.close-overlay');

if (beautyButton && beautyOverlay) {
    beautyButton.addEventListener('click', () => {
        beautyOverlay.style.display = 'flex';
        for(let i=0; i<20; i++) setTimeout(createFallingHeart, i*100);
    });

    closeBtn.addEventListener('click', () => {
        beautyOverlay.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === beautyOverlay) {
            beautyOverlay.style.display = 'none';
        }
    });
}

function showStep(stepNumber) {
    const steps = document.querySelectorAll('.beauty-step');
    steps.forEach(step => step.style.display = 'none');

    const currentStep = document.getElementById('step-' + stepNumber);
    if (currentStep) {
        currentStep.style.display = 'block';
        
        for(let i=0; i<15; i++) setTimeout(createFallingHeart, i*50);
    }
}

beautyButton.addEventListener('click', () => {
    showStep(1); 
    beautyOverlay.style.display = 'flex';
});

const galleryButton = document.getElementById('gallery-button');
const galleryOverlay = document.getElementById('gallery-overlay');
const closeGallery = document.getElementById('close-gallery');

if (galleryButton) {
    galleryButton.addEventListener('click', () => {
        galleryOverlay.style.display = 'block';

        const galleryImages = document.querySelectorAll('.final-gallery img');
        
        galleryImages.forEach((img, index) => {
            img.classList.remove('reveal');
            void img.offsetWidth; 
            
            img.classList.add('reveal');
            
            img.style.animationDelay = `${index * 0.1}s`;
        });

        // 3. Tvoje srdíčková smršť
        for(let i=0; i<30; i++) setTimeout(createFallingHeart, i*50);
    });
}

// Zbytek (zavírání) zůstává stejný
if (closeGallery) {
    closeGallery.addEventListener('click', () => {
        galleryOverlay.style.display = 'none';
    });
}

let loveLevel = 0;
const loveBar = document.getElementById('love-bar');
const loveStatus = document.getElementById('love-status');
const chargeBtn = document.getElementById('charge-btn');

chargeBtn.addEventListener('click', () => {
    if (loveLevel < 100) {
        loveLevel += 5; 
        
        if (loveLevel > 100) loveLevel = 100;
        updateUI();

        if (loveLevel === 100) {
            triggerMaxEffect();
        }
    } else {
        triggerMaxEffect();
    }
});

setInterval(() => {
    if (loveLevel > 0 && loveLevel < 100) {
        
        if (loveLevel < 70) {
            loveLevel -= 0.5;
        } else {
            loveLevel -= 1;
        }

        if (loveLevel < 0) loveLevel = 0;
        
        updateUI();
    }
}, 100);

function updateUI() {
    loveBar.style.width = Math.floor(loveLevel) + '%';
    
    if (loveLevel < 100) {
        loveStatus.innerText = `Aktuální nabití: ${Math.floor(loveLevel)} %`;
        loveBar.classList.remove('maxed');
        chargeBtn.innerText = "Klikej, miluj a nabijej! ✨";
    }
}

function triggerMaxEffect() {
    loveStatus.innerHTML = "<strong>Kapacita přetečena! Nabila jsi naší Lásku! ❤️</strong>";
    loveBar.classList.add('maxed');
    chargeBtn.innerText = "Láska je na MAXU! 💖";
    
    if (typeof createFallingHeart === "function") {
        for(let i=0; i<30; i++) setTimeout(createFallingHeart, i*50);
    }
}

let hasKey = false;
const hiddenKey = document.getElementById('hidden-key');
const safeIcon = document.getElementById('safe-icon');
const safeHint = document.getElementById('safe-hint');
const letterSmall = document.getElementById('letter-small');
const letterOverlay = document.getElementById('letter-overlay');

// 1. Sebrání klíče
hiddenKey.addEventListener('click', () => {
    hasKey = true;
    hiddenKey.style.display = 'none'; 
    safeHint.innerText = "Našla jsi klíč! Teď zkus odemkout zámek.";
    safeHint.style.color = "#ff4d6d"; 
});

// 2. Otevření trezoru
safeIcon.addEventListener('click', () => {
    if (hasKey) {
        safeIcon.innerText = "🔓"; 
        safeHint.innerText = "Zámek je odemčený, vyletí dopis...";
        letterSmall.style.display = "block"; 
    } else {
        safeHint.innerText = "Zámek je zamčený. Musíš najít klíč!";
    }
});

letterSmall.addEventListener('click', () => {
    // Používáme 'flex', aby fungovalo centrování z CSS
    letterOverlay.style.display = 'flex'; 
});

// 4. Zavření dopisu (křížkem nebo kliknutím mimo)
document.querySelector('.close-letter').addEventListener('click', () => {
    letterOverlay.style.display = 'none';
});

letterOverlay.addEventListener('click', (e) => {
    // Pokud klikneš na to tmavé pozadí (ne na papír), zavře se to
    if (e.target === letterOverlay) {
        letterOverlay.style.display = 'none';
    }
});