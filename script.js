// Переключение вкладок
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const tab = link.dataset.tab;
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        tabContents.forEach(c => c.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});

// Покупки
let purchased = JSON.parse(localStorage.getItem('delayed_purchases') || '[]');

function updatePurchasedBar() {
    const bar = document.getElementById('purchased-bar');
    const list = document.getElementById('purchased-list');
    const count = document.getElementById('purchased-count');

    count.textContent = purchased.length;

    if (purchased.length === 0) {
        bar.classList.add('hidden');
        return;
    }

    bar.classList.remove('hidden');
    list.innerHTML = purchased.map(item =>
        `<span class="purchased-item">${item.name}<span class="purchased-item-type">(${item.type})</span></span>`
    ).join('');
}

function purchase(btn, name, type) {
    // Проверяем, не куплено ли уже
    const already = purchased.find(p => p.name === name);
    if (already) return;

    purchased.push({ name, type, date: Date.now() });
    localStorage.setItem('delayed_purchases', JSON.stringify(purchased));

    btn.textContent = 'Куплено ✓';
    btn.classList.remove('btn-free');
    btn.classList.add('btn-purchased');
    btn.disabled = true;

    updatePurchasedBar();
}

// При загрузке: помечаем уже купленные
function markPurchased() {
    document.querySelectorAll('.card').forEach(card => {
        const name = card.dataset.name;
        const btn = card.querySelector('.btn');
        if (purchased.find(p => p.name === name)) {
            btn.textContent = 'Куплено ✓';
            btn.classList.remove('btn-free');
            btn.classList.add('btn-purchased');
            btn.disabled = true;
        }
    });
}

markPurchased();
updatePurchasedBar();