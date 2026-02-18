function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');

    // Reset search setelah ganti tab
    document.getElementById('search').value = '';
    filterMenu();
}

function filterMenu() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const activeTab = document.querySelector('.tab-content.active');
    const menuItems = activeTab.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const nama = item.querySelector('h3').textContent.toLowerCase();
        if (nama.includes(searchValue)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

async function loadMenu() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // Render Makanan
        const makananList = document.getElementById('makanan-list');
        data.makanan.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('menu-item');
            div.innerHTML = `
                <h3>${item.nama}</h3>
                <p class="price">Rp ${item.harga.toLocaleString()}</p>
            `;
            makananList.appendChild(div);
        });

        // Render Minuman
        const minumanList = document.getElementById('minuman-list');
        data.minuman.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('menu-item');
            div.innerHTML = `
                <h3>${item.nama}</h3>
                <p class="price">Rp ${item.harga.toLocaleString()}</p>
            `;
            minumanList.appendChild(div);
        });

        // Render Cemilan
        const cemilanList = document.getElementById('cemilan-list');
        data.cemilan.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('menu-item');
            div.innerHTML = `
                <h3>${item.nama}</h3>
                <p class="price">Rp ${item.harga.toLocaleString()}</p>
            `;
            cemilanList.appendChild(div);
        });

        // Event listener untuk search
        document.getElementById('search').addEventListener('input', filterMenu);

    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

loadMenu();