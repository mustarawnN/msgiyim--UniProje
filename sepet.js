// Sepet sayfası yüklenince sepeti göster
window.onload = function () {
    displayCartItems();
};

// Sepetteki ürünleri yerleştir
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = ""; // Sepet içeriklerini temizle

    let totalPrice = 0; // Toplam fiyatı başlatıyoruz

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Sepetinizde ürün bulunmamaktadır.</p>";
        totalPriceElement.innerHTML = "Toplam Fiyat: 0₺"; // Eğer sepet boşsa, toplam fiyat 0₺ olacak
    } else {
        cart.forEach((product, index) => {
            // Fiyatı string'den sayıya dönüştürüyoruz (parseFloat)
            let productPrice = parseFloat(product.price.replace("₺", "").trim());

            // Eğer fiyat geçerli bir sayı değilse, NaN yerine 0₺ kullanıyoruz
            if (isNaN(productPrice)) {
                productPrice = 0; // Geçersiz fiyatı 0 olarak ayarlıyoruz
            }

            // Toplam fiyatı güncelle
            totalPrice += productPrice;

            const productCard = `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-danger">${productPrice.toFixed(2)}₺</p> <!-- Fiyat burada görünüyor -->
                            <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeItem(${index})">Sil</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += productCard;
        });

        // Toplam fiyatı güncelle
        totalPriceElement.innerHTML = `Toplam Fiyat: ${totalPrice.toFixed(2)}₺`; // Fiyatı iki ondalıklı haneli olarak gösteriyoruz
    }
}

// Sepetten tek ürün silme fonksiyonu
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Belirtilen ürünü sil
    localStorage.setItem("cart", JSON.stringify(cart)); // Güncel sepeti kaydet
    displayCartItems(); // Yeniden listele
}

// Ödeme sayfasına yönlendir
function goToCheckout() {
    alert("Ödeme sayfasına yönlendiriliyorsunuz.");
    // Burada ödeme sayfasına yönlendirme yapılabilir.
}



