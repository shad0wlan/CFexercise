# Backend API

## Δομή

Το backend είναι χτισμένο με ASP.NET Core 8 και χρησιμοποιεί PostgreSQL για την βάση.

### Controllers

- `AuthController` - login και JWT tokens
- `UserController` - διαχείριση χρηστών
- `MachineController` - μηχανήματα παραγωγής
- `EntryController` - καταχωρήσεις παραγωγής
- `ProductCodeController` - κωδικοί προϊόντων
- `ColorController`, `ExtraController`, `PackageTypeController`, `ProductionMaterialController` - βοηθητικά δεδομένα

### Models

Οι κύριες οντότητες:
- `User` - χρήστες με roles (Worker, Operator, Admin)
- `Machine` - μηχανήματα με εικόνες
- `Entry` - καταχωρήσεις με status tracking
- `ProductCode` - προϊόντα με θερμοκρασίες
- `Color`, `Extra`, `PackageType`, `ProductionMaterial` - lookup tables

### Authentication

JWT tokens με 3 επίπεδα πρόσβασης:
- Worker: δημιουργία entries
- Operator: επεξεργασία entries + διαχείριση προϊόντων  
- Admin: πλήρη πρόσβαση

### Database

Entity Framework με migrations στο `/Migrations`. Connection string στο `appsettings.Development.json`.

Για νέα migration: `dotnet ef migrations add [name]`

### Files

Upload εικόνων στο `/Uploads` folder. Το `FileService` διαχειρίζεται αποθήκευση και URLs.

### API Routes

Base URL: `/api`
- `/auth` - authentication
- `/users`, `/machines`, `/entries` κλπ
- Swagger docs στο `/swagger`

Όλα τα endpoints εκτός από login χρειάζονται JWT token.