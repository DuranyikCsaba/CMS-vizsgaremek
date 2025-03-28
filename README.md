<p align="center">
<img src="https://github.com/user-attachments/assets/9cee75f9-349d-47fa-aa5d-ed9f1d92f8c5" width="150px" height="200px">
</p>
<p align="center">
Szent István Katlikus Technikum
</p>
<p align="center">
Projekt Címe
Car Merchants' Site
</p>

## Projekt Csapat Tagjai
- Durányik Csaba
- Gamauf Marcell

## Projekt Leírása

Szoftver célja: A célunk az volt, hogy laikusok számára egy helyen biztosítsa az autóvásárlást a fenntartáshoz szükséges információkat és irányt mutasson a bonyolult és olykor érthetetlen autóvásárlási és ügyintézési folyamatokban. Sok más   használtautó weboldalt lehet találni az interneten de nem a leghatékonyabbat így  átgondoltuk és bele vágtunk a mi saját használtautó oldalunkba ahol elhelyezkedik a hirdetések feltöltése mellett: Fórum (Regisztrációhoz majd utána bejelentkezéshez  kötött) ahol autósok és nem autósok tudják megbeszélni a típus hibákat egyes autóknál  ami nagyban megkönnyíti a jövendőbeli autó tulajokat a vásárlásban vagy estleges  hiba feltárásban ,Hirdetések megtekintése nem kötött bejelentkezéshez azt az úgy  nevezett „mezei” felhasználó is megtudja tekinteni de hirdetést feltölteni csak a  bejelentkezett felhasználó tud, itt is megpróbáltunk arra törekedni hogy a lehető  legegyszerűbben és legáttekinthetőbben lehessen hirdetést feltölteni hozzá nem   értőknek is


## Rendszerkövetelmények
### Windows
- **Operációs rendszer**: Windows 7 vagy újabb
- **Processzor**: 1 GHz-es vagy gyorsabb processzor
- **RAM**: 2 GB
- **Szabad hely a merevlemezen**: Legalább 350 MB
- **Grafikai kártya**: Az alap grafikai funkciókhoz szükséges

### macOS
- **Operációs rendszer**: macOS 10.11 (El Capitan) vagy újabb
- **Processzor**: Intel alapú processzor
- **RAM**: 4 GB
- **Szabad hely a merevlemezen**: Legalább 350 MB

### Linux
- **Operációs rendszer**: A legfrissebb verziók valamelyikéből (pl. Ubuntu, Debian, Fedora)
- **Processzor**: 1 GHz-es vagy gyorsabb processzor
- **RAM**: 2 GB
- **Szabad hely a merevlemezen**: Legalább 350 MB

### Android
- **Operációs rendszer**: Android 5.0 (Lollipop) vagy újabb
- **Processzor**: ARM vagy x86 alapú
- **RAM**: Legalább 1 GB

### iOS
- **Operációs rendszer**: iOS 12 vagy újabb
- **Eszköz**: iPhone 5s vagy újabb

## Fejlesztéshez Használt Szoftverek
- **Visual Studio Code**: 1.98.2
- **Node.js**: 20.18.0
- **Angular CLI**: 16.2.16
- **XAMPP**: 8.1.1
- **Adatbázis**: MariaDB 3.4.0 (XAMPP-on futtatva)
- **ORM**: Sequelize 6.37.5
- **Backend keretrendszer**: Express.js 4.21.1
- **Autentikáció**: JSON Web Token (JWT) 9.0.2, bcrypt 5.1.1
- **Környezeti változók kezelése**: dotenv 16.4.7
- **Frontend kapcsolat**: CORS engedélyezése 2.8.5

## Üzembehelyezés Menete Fejlesztéshez
1. **Környezet Beállítása**:
   - Telepítsd a szükséges szoftvereket a fenti lista alapján.
   - Klónozd a projekt GitHub repository-ját:  
     [https://github.com/DuranyikCsaba/CMS-vizsgaremek](https://github.com/DuranyikCsaba/CMS-vizsgaremek)  
     Vagy töltsd le .zip állományként.

2. **Függőségek Telepítése**:
   - Nyisd meg a webalkalmazás mappáját.
   - Az első indítás előtt szükséges a `node_modules` telepítése mindkét komponensen.
   - Navigálj a backend/ mappába, majd futtasd az alábbi parancsot:  
     ```bash
     npm install
     ```
   - Navigálj a frontend/cms/ mappába, majd futtasd az alábbi parancsot:  
     ```bash
     npm install
     ```

3. **XAMPP Telepítése**:
   - Telepítsd a XAMPP-ot lokális adatbázis hozzáféréshez:  
     [XAMPP letöltés](https://www.apachefriends.org/hu/download.html)
   - Importáld a mellékelt adatbázist a lokális kiszolgálón.

4. **Backend Indítása**:
   - Terminálban navigálj a backend/ mappába, majd futtasd az alábbi parancsot:  
     ```bash
     npm run start
     ```

5. **Frontend Indítása**:
   - Terminálban navigálj a frontend/cms/ mappába, majd futtasd az alábbi parancsot:  
     ```bash
     ng serve -o
     ```
   - Nyisd meg a böngészőt és látogass el a `http://localhost:4200` címre.

6. **Kód Módosítása**:
   - Végezze el a szükséges módosításokat a kódban.

7. **Változtatások Ellenőrzése**:
   - Használj egység- és integrációs teszteket a kód ellenőrzésére.

8. **Kód Feltöltése**:
   - A változtatások véglegesítése után töltsd fel a kódot a GitHub-ra:  
     ```bash
     git add .
     git commit -m "Leírás a változtatásokról"
     git push origin [branch_name]
     ```
9. **Trello**:
   https://trello.com/invite/b/66ded61b7a42ce7477ae7965/ATTI5a9a44170a2bfbad1adee68e0734ca46C22A5B2B/projekt-dokumentacio-es-esemenynaplo
