# Οδηγίες Εγκατάστασης

## Απαιτήσεις

Πριν ξεκινήσετε χρειάζεστε:
- Node.js (v18+)
- .NET SDK 8
- PostgreSQL

## Γρήγορη εγκατάσταση

Τρέξτε στο terminal από τον root φάκελο:
```bash
node setup.js
```

### Επόμενα βήματα

Μόλις τελειώσει το setup εμφανίζονται τα επόμενα commands που πρέπει να τρέξετε:

1. **Ξεκινήστε την database** (το Docker πρέπει να τρέχει - Desktop σε Win/Mac):
   ```bash
   cd backend/prodtrack-backend
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Τρέξτε τα migrations:**
   ```bash
   dotnet ef database update
   ```

3. **Ξεκινήστε το backend:**
   ```bash
   dotnet run
   ```
   Θα τρέχει στο http://localhost:5213 ή στο διαθέσιμο port που θα βρει.
   
   **Παράδειγμα output:**
   ```
   info: Microsoft.Hosting.Lifetime[14]
   Now listening on: http://localhost:5213
   ```
   
   **Σημείωση:** Τα environment variables μπαίνουν αυτόματα από το setup. Αλλάξτε τα μόνο αν βλέπετε διαφορετικό port.

4. **Ξεκινήστε το frontend** (ανοίξτε νέο terminal):
   ```bash
   cd frontend
   npm run dev
   ```

**Προσοχή**: Το setup script μόνο εγκαθιστά dependencies. Χρειάζεται ακόμα:
1. Database (Docker ή PostgreSQL)
2. Migrations  
3. Εκκίνηση των services (αναφέρονται στο log στο τέλος του setup)


## Production με Docker

### Development Database (για δοκιμή σε dev environment)

**ΠΡΟΣΟΧΗ: Το Docker πρέπει να τρέχει!**
- Windows/Mac: Ανοίξτε το Docker Desktop app και περιμένετε να ξεκινήσει
- Linux/VPS: Docker engine τρέχει ως service

```bash
cd backend/prodtrack-backend
docker-compose -f docker-compose.dev.yml up -d
```
Αυτό θα δημιουργήσει μόνο PostgreSQL container στην πόρτα 5432.

Αν πάρετε error "unable to get image postgres:latest":
- Windows/Mac: Ανοίξτε Docker Desktop
- Περιμένετε να φορτώσει
- Ξαναδοκιμάστε την εντολή ή απλά εγκαταστήστε την DB στο PostgreSQL της επιλογής σας και βάλτε τα ανάλογα connection strings στο appsettings.development

Αν πάρετε error "Bind for 0.0.0.0:5432 failed: port is already allocated":
- Σημαίνει ότι το port χρησιμοποιείται ήδη από άλλο container. Απλά σταματήστε το ή αλλάξτε το port στο appsettings.development και στο docker compose development.


### Full Production Setup
```bash
cd backend/prodtrack-backend
docker-compose -f docker-compose.production.yml up -d --build
```
Αυτό θα δημιουργήσει:
- Backend API στην πόρτα 8080
- PostgreSQL database
- Persistent volumes για data και uploads

**Προσοχή**: Αλλάξτε τα passwords στο production compose πριν χρήση!

## Δοκιμή

1. Backend: http://localhost:5213/swagger (dev) ή http://localhost:8080/swagger (production)
2. Frontend: http://localhost:3000
3. Default logins (Auto-seeded):
   - Admin: `admin` / `ProdTrack2025`
   - Operator: `operator` / `Operator2025`
   - Worker: `worker` / `Worker2025`
   
## Χειροκίνητη εγκατάσταση

### Backend (.NET)

1. Μπείτε στον φάκελο backend
```
cd backend/prodtrack-backend
```

2. Εγκαταστήστε τα packages
```bash
dotnet restore
```

3. Ρυθμίστε την βάση
Στο αρχείο `appsettings.Development.json` βάλτε τα στοιχεία της PostgreSQL (είναι ήδη μέσα αλλά τα αλλάζετε αν κάνατε κάποια αλλαγή):
```json
"ConnectionStrings": {
  "Database": "Host=localhost;Port=5432;Database=prodtrack;Username=postgres;Password=postgres"
}
```

4. Τρέξτε τα migrations
```bash
dotnet ef database update
```

5. Ξεκινήστε το backend
```
dotnet run
```

Θα τρέχει στο http://localhost:5213 ή στο διαθέσιμο port που θα βρει.

**Παράδειγμα output:**
```
info: Microsoft.Hosting.Lifetime[14]
Now listening on: http://localhost:5213
```

**Σημαντικό:** Το URL αυτό το βάζετε στο .env.local που βρίσκεται στον frontend φάκελο προσθέτοντας `/api` στο τέλος:
```
API_URL=http://localhost:5213/api
NEXT_PUBLIC_API_URL=http://localhost:5213/api
```

### Frontend (Next.js)

1. Μπείτε στον φάκελο frontend
```
cd frontend
```

2. Εγκαταστήστε τα packages
```bash
npm install
```

3. Δημιουργήστε το `.env.local`
Φτιάξτε το αρχείο `frontend/.env.local` με:
```bash
API_URL=http://localhost:5213/api
NEXT_PUBLIC_API_URL=http://localhost:5213/api
NEXT_PUBLIC_IMAGE_URL=http://localhost:5213
```

**Προσοχή:** Αν το backend τρέχει σε άλλη πόρτα, αλλάξτε το 5213 με την σωστή.

4. Ξεκινήστε το frontend
```bash
npm run dev
```
Θα τρέχει στο http://localhost:3000 ή στο διαθέσιμο port.

## Ρύθμιση Environment Variables

### Frontend (.env.local)
Το αρχείο `frontend/.env.local` χρειάζεται:
- `API_URL`: Το URL του backend API (για server-side calls)
- `NEXT_PUBLIC_API_URL`: Το ίδιο URL για client-side calls
- `NEXT_PUBLIC_IMAGE_URL`: Το URL για τις εικόνες (π.χ. http://localhost:5213)

Πώς βρίσκω την σωστή πόρτα του backend;
1. Ανοίξτε `backend/prodtrack-backend/Properties/launchSettings.json`
2. Κοιτάξτε το `applicationUrl` (π.χ. http://localhost:5213)
3. Προσθέστε `/api` στο τέλος για το .env.local

### Backend (appsettings.Development.json)
Τα βασικά settings που πρέπει να ρυθμίσετε:

**Database Connection:**
```json
{
  "ConnectionStrings": {
    "Database": "Host=localhost;Port=5432;Database=prodtrack;Username=postgres;Password=ΤΟ_PASSWORD_ΣΑΣ"
  }
}
```

**Παράμετροι:**
- Host: συνήθως localhost
- Port: 5432 (default PostgreSQL)
- Database: το όνομα της database
- Username/Password: από την εγκατάσταση PostgreSQL

**JWT Settings:**
```json
{
  "JWT": {
    "Issuer": "http://localhost:5213",
    "Audience": "http://localhost:5213", 
    "SigningKey": "ΒΑΛΤΕ_ΕΝΑ_ΜΑΚΡΥ_ΤΥΧΑΙΟ_STRING_32+_ΧΑΡΑΚΤΗΡΕΣ"
  }
}
```

**Παράμετροι:**
- Issuer/Audience: το URL που τρέχει το backend
- SigningKey: οποιοδήποτε μακρύ string (τουλάχιστον 32 χαρακτήρες, υπάρχει ήδη εάν θέλετε το αλλάζετε)

## Πρόβλημα με τις πόρτες;

Αν η πόρτα 5213 είναι πιασμένη, αλλάξτε την στο backend:
- Στο `Properties/launchSettings.json` αλλάξτε το `applicationUrl`
- Μετά ενημερώστε το `.env.local` του frontend με την νέα πόρτα

## Database

Το project χρησιμοποιεί PostgreSQL. Αν δεν έχετε:
- Windows: κατεβάστε από postgresql.org
- Mac: `brew install postgresql`

### Πρόβλημα με την πόρτα 5432;

Αν έχετε ήδη PostgreSQL που τρέχει:

**Λύση 1: Σταματήστε το άλλο PostgreSQL**
```bash
# Αν είναι Docker container
docker ps  # δείτε ποιο container τρέχει
docker stop [container_name]

# Αν είναι local service (Mac)
brew services stop postgresql
# Ή απλά πατήστε stop από το UI του Docker Desktop app στο container που εμποδίζει το PostgreSQL.
# Αν είναι local service (Windows)
net stop postgresql-x64-14
```

**Λύση 2: Χρησιμοποιήστε άλλη πόρτα**
Αν χρειάζεστε το άλλο PostgreSQL, τρέξτε το δικό σας σε διαφορετική πόρτα:
```bash
# Με Docker
docker run -p 5433:5432 -e POSTGRES_PASSWORD=postgres postgres

# Ή αλλάξτε το connection string
"Database": "Host=localhost;Port=5433;Database=prodtrack;Username=postgres;Password=postgres"
```

Μετά την εγκατάσταση:
1. Δημιουργήστε την database `prodtrack`
2. Τρέξτε τα migrations από το backend folder

### Πρόβλημα με "unable to get image 'postgres:latest'" στο local environment;
1. Βεβαιωθείτε ότι είναι ανοικτό το docker desktop.

## Production με Docker

### Development Database (για δοκιμή σε dev environment)

**ΠΡΟΣΟΧΗ: Το Docker πρέπει να τρέχει!**
- Windows/Mac: Ανοίξτε το Docker Desktop app και περιμένετε να ξεκινήσει
- Linux/VPS: Docker engine τρέχει ως service

```bash
cd backend/prodtrack-backend
docker-compose -f docker-compose.dev.yml up -d
```
Αυτό θα δημιουργήσει μόνο PostgreSQL container στην πόρτα 5432.

Αν πάρετε error "unable to get image postgres:latest":
- Windows/Mac: Ανοίξτε Docker Desktop
- Περιμένετε να φορτώσει
- Ξαναδοκιμάστε την εντολή ή απλά εγκαταστήστε την DB στο PostgreSQL της επιλογής σας και βάλτε τα ανάλογα connection strings στο appsettings.development

Αν πάρετε error "Bind for 0.0.0.0:5432 failed: port is already allocated":
- Σημαίνει ότι το port χρησιμοποιείται ήδη από άλλο container. Απλά σταματήστε το ή αλλάξτε το port στο appsettings.development και στο docker compose development.


### Full Production Setup
```bash
cd backend/prodtrack-backend
docker-compose -f docker-compose.production.yml up -d --build
```
Αυτό θα δημιουργήσει:
- Backend API στην πόρτα 8080
- PostgreSQL database
- Persistent volumes για data και uploads

**Προσοχή**: Αλλάξτε τα passwords στο production compose πριν χρήση!

## Δοκιμή

1. Backend: http://localhost:5213/swagger (dev) ή http://localhost:8080/swagger (production)
2. Frontend: http://localhost:3000
3. Default logins (Auto-seeded):
   - Admin: `admin` / `ProdTrack2025`
   - Operator: `operator` / `Operator2025`
   - Worker: `worker` / `Worker2025`

