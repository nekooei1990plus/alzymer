# Alzymer Backend - Engineering Management System

## 📋 Overview

پروژه Alzymer یک سیستم مدیریت مهندسی است که با استفاده از تکنولوژی‌های مدرن و قدرتمند طراحی شده است. این بخش Backend شامل API های RESTful برای مدیریت کاربران، عملکردهای اپلیکیشن و ارتباط با پایگاه داده می‌باشد.

## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | `^11.0.13` | Backend Framework |
| **Fastify** | `^5.2.2` | HTTP Server Platform |
| **Prisma** | `^6.5.0` | ORM & Database Toolkit |
| **PostgreSQL** | - | Primary Database |
| **TypeScript** | `^5.8.3` | Programming Language |
| **Vite** | `^6.2.5` | Build Tool |
| **Bun** | Latest | JavaScript Runtime |

## 📁 Project Structure

```
src/
├── modules/                    # Business Modules
│   ├── aaa/                   # Authentication & Authorization
│   ├── application-function/  # عملکردهای اپلیکیشن
│   ├── error/                 # مدیریت خطا
│   ├── prisma/                # ORM Configuration
│   └── validators/            # اعتبارسنجی‌های سفارشی
├── common/                    # Shared Components
│   ├── dto/                   # Data Transfer Objects
│   ├── decorators/            # Custom Decorators
│   ├── scripts/               # Database Scripts
│   └── utils.ts               # Utility Functions
├── libs/                      # Custom Libraries
│   ├── aes/                   # رمزنگاری AES
│   ├── bitty/                 # پردازش داده
│   ├── modbus/                # ارتباط Modbus
│   └── get-port/              # مدیریت پورت‌ها
├── config.ts                  # Application Configuration
├── constants.ts               # ثوابت پروژه
└── main.ts                    # Application Entry Point
```

## 🛠️ Installation & Setup

### Prerequisites
- **Bun** (Latest version)
- **PostgreSQL** (v12+)
- **Node.js** (v18+) - Optional

### 1. Install Dependencies
```bash
bun install
```

### 2. Environment Configuration
Create `.env` file:
```env
NODE_ENV=development
DATABASE_CONNECTION_URL=postgresql://postgres:123456@localhost:5432/engineering
swaggerApiPath=/api
swaggerApiDocPath=/api-docs
serverPort=4000
jwtSecret=your-secret-key
uploadDirectory=upload
backupDirectory=backup
aesSecretInHex=5ca2b0cc581e4f50d91e722b3c365130a1de0de2064f7a7e561824cd29372a1f
simulation=false
mockDataPath=./data/mock-data.json
tftpPort=69
tftpFileNameExported=5ca2b0cc581e4f50d91e722b3c365130a1de0de2064f7a7e561824cd29372a1f.json
nemobusTimeoutInMs=1000
```

### 3. Database Setup
```bash
# Generate Prisma Client
bunx prisma generate

# Push database schema
bunx prisma db push

# Optional: Seed database
bunx prisma db seed
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
bun run dev
```
Server starts on: `http://localhost:4000`

### Production Build
```bash
# Build application
bun run build

# Start production server
bun start
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `bun --watch src/main.ts` | Development server with hot reload |
| `build` | `vite build` | Production build |
| `start` | `bun dist/main.js` | Start production server |
| `test` | `jest` | Run tests |
| `test:cov` | `jest --coverage` | Run tests with coverage |
| `lint` | `oxlint --fix ./src && eslint --fix .` | Code linting |
| `typecheck` | `tsc --project ./tsconfig.json` | TypeScript type checking |

## 📚 API Documentation

### Swagger/OpenAPI
- **Development**: `http://localhost:4000/api-docs`
- **API Base**: `http://localhost:4000/api`

### Main Endpoints

#### Authentication (AAA)
- `POST /aaa/login` - کاربر وارد سیستم
- `POST /aaa/changePassword` - تغییر رمز عبور
- `POST /aaa/me` - اطلاعات کاربر فعلی

#### Application Functions
- `POST /applicationFunction/readApplicationFunction` - خواندن عملکردهای اپلیکیشن

## 🏗️ Architecture & Design Patterns

### Module-Based Architecture
```typescript
@Module({
  imports: [
    // Dependencies
  ],
  controllers: [XController],
  providers: [XService],
  exports: [XService]
})
export class XModule {}
```

### Configuration Management
```typescript
export class Config {
  @IsString()
  public DATABASE_CONNECTION_URL!: string
  
  @IsPort()
  public serverPort!: string
  
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  public simulation!: boolean
}
```

### Custom Libraries
- **AES Encryption**: رمزنگاری داده‌های حساس
- **Modbus TCP**: ارتباط با دستگاه‌های صنعتی
- **Bitty Parser**: پردازش داده‌های باینری

## 🔒 Security Features

- **JWT Authentication**: احراز هویت مبتنی بر توکن
- **Role-Based Access Control**: کنترل دسترسی بر اساس نقش
- **AES Encryption**: رمزنگاری داده‌های حساس
- **Input Validation**: اعتبارسنجی ورودی‌ها
- **Environment Variables**: حفظ اطلاعات محرمانه

## 🧪 Testing

### Running Tests
```bash
# Unit tests
bun run test

# Test coverage
bun run test:cov

# Prepare test environment
bun run test:prepare
```

### Test Structure
```typescript
describe('ServiceName', () => {
  let service: ServiceName;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceName],
    }).compile();
    
    service = module.get<ServiceName>(ServiceName);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## 🚀 Deployment

### Docker Support
```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 4000
CMD ["bun", "start"]
```

### Production Environment
```bash
# Build for production
bun run build

# Set production environment
export NODE_ENV=production

# Start server
bun start
```

## 📝 Development Guidelines

### Code Style
- **TypeScript strict mode** enabled
- **ESLint + OXLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for version control

### Module Creation
1. Create module directory in `src/modules/`
2. Follow NestJS module pattern
3. Include proper DTOs, Services, Controllers
4. Add comprehensive tests
5. Update documentation

### Naming Conventions
- **Files**: kebab-case (`user-management.service.ts`)
- **Classes**: PascalCase (`UserManagementService`)
- **Variables**: camelCase (`userManagement`)
- **Constants**: SCREAMING_SNAKE_CASE (`DATABASE_URL`)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **Developer**: nekooei1990plus
- **Repository**: [GitHub](https://github.com/nekooei1990plus/alzymer)
- **Issues**: [GitHub Issues](https://github.com/nekooei1990plus/alzymer/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using NestJS, Fastify, and Prisma**