# Alzymer Frontend - Alzymer Management System

## 📋 Overview

رابط کاربری مدرن و واکنش‌گرا برای سیستم مدیریت مهندسی Alzymer. این پروژه با استفاده از Nuxt 3 و Vue 3 طراحی شده و تجربه کاربری بهینه برای مدیریت پروژه‌های مهندسی ارائه می‌دهد.

## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Nuxt** | `^3.17.5` | Full-Stack Framework |
| **Vue** | `^3.5.13` | Progressive JavaScript Framework |
| **Quasar UI** | `^2.1.12` | Vue.js Component Library |
| **UnoCSS** | `^66.0.0` | Utility-First CSS Framework |
| **Pinia** | `^3.0.1` | State Management |
| **VeeValidate** | `^4.15.0` | Form Validation |
| **TypeScript** | Latest | Programming Language |
| **Bun** | Latest | JavaScript Runtime |

## 📁 Project Structure

```
├── components/              # Vue Components
│   ├── ui/                 # UI Components
│   ├── forms/              # Form Components  
│   └── layout/             # Layout Components
├── pages/                  # Nuxt Pages (Auto-routing)
├── layouts/                # Application Layouts
├── middleware/             # Route Middleware
├── plugins/                # Nuxt Plugins
├── composables/            # Vue Composables
├── stores/                 # Pinia Stores
├── assets/                 # Static Assets
│   ├── css/               # Stylesheets
│   ├── images/            # Images
│   └── icons/             # Icon Files
├── public/                 # Public Static Files
├── types/                  # TypeScript Definitions
├── utils/                  # Utility Functions
└── server/                 # Server-side Logic
    └── api/               # API Routes
```

## 🛠️ Installation & Setup

### Prerequisites
- **Bun** (Latest version)
- **Node.js** (v18+) - Optional

### 1. Install Dependencies
```bash
bun install
```

### 2. Environment Configuration
Create `.env` file:
```env
# API Configuration
NUXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NUXT_PUBLIC_APP_NAME=Alzymer Engineering System

# Development
NUXT_PUBLIC_DEV_MODE=true

# Internationalization
NUXT_PUBLIC_DEFAULT_LOCALE=fa
NUXT_PUBLIC_FALLBACK_LOCALE=en

# App Configuration
NUXT_PUBLIC_APP_VERSION=0.1.0
```

### 3. Development Setup
```bash
# Generate type definitions
bun run postinstall

# Start development server
bun run dev
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
bun run dev
```
Server starts on: `http://localhost:3000`

### Production Build & Deploy
```bash
# Build for production
bun run build

# Preview production build
bun run start
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nuxt dev` | Development server with HMR |
| `build` | `nuxt build` | Production build |
| `start` | `bun run .output/server/index.mjs` | Start production server |
| `typecheck` | `nuxt typecheck` | TypeScript type checking |
| `lint` | `eslint --fix .` | Code linting and fixing |
| `api` | `dotenv npx tsx scripts/generate-api.ts` | Generate API client |

## 🎨 UI Framework & Design System

### Quasar UI Components
```vue
<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      
      <q-card-actions align="right">
        <q-btn flat color="primary" @click="handleClick">
          تایید
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
```

### UnoCSS Utility Classes
```vue
<template>
  <div class="
    flex items-center justify-center 
    min-h-screen bg-gradient-to-br 
    from-blue-500 to-purple-600
  ">
    <h1 class="text-4xl font-bold text-white">
      سیستم مدیریت مهندسی
    </h1>
  </div>
</template>
```

### Persian/RTL Support
```scss
// assets/css/main.scss
.rtl-layout {
  direction: rtl;
  text-align: right;
}

.persian-font {
  font-family: 'Vazir', 'Tahoma', sans-serif;
}
```

## 🗂️ State Management with Pinia

### Store Structure
```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      user.value = response.user
      token.value = response.token
      
      await navigateTo('/dashboard')
    } catch (error) {
      throw new Error('ورود ناموفق')
    }
  }
  
  const logout = () => {
    user.value = null
    token.value = null
    navigateTo('/login')
  }
  
  return {
    user: readonly(user),
    token: readonly(token),
    login,
    logout
  }
})
```

## 📱 Responsive Design & Mobile Support

### Breakpoints (UnoCSS)
```typescript
// uno.config.ts
export default defineConfig({
  theme: {
    breakpoints: {
      'xs': '320px',
      'sm': '640px', 
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  }
})
```

### Responsive Components
```vue
<template>
  <div class="
    grid grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3 
    gap-4 p-4
  ">
    <q-card 
      v-for="item in items" 
      :key="item.id"
      class="hover:shadow-lg transition-shadow"
    >
      <!-- Content -->
    </q-card>
  </div>
</template>
```

## 🌐 Internationalization (i18n)

### Language Configuration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  i18n: {
    locales: [
      { code: 'fa', iso: 'fa-IR', file: 'fa.json', dir: 'rtl' },
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' }
    ],
    defaultLocale: 'fa',
    strategy: 'prefix_except_default'
  }
})
```

### Translation Files
```json
// locales/fa.json
{
  "auth": {
    "login": "ورود",
    "logout": "خروج",
    "username": "نام کاربری",
    "password": "رمز عبور"
  },
  "dashboard": {
    "title": "داشبورد",
    "welcome": "خوش آمدید"
  }
}
```

### Using Translations
```vue
<template>
  <div>
    <h1>{{ $t('dashboard.title') }}</h1>
    <p>{{ $t('dashboard.welcome', { name: user.name }) }}</p>
  </div>
</template>
```

## 📊 Data Visualization

### ECharts Integration
```vue
<script setup>
import * as echarts from 'echarts'

const chartContainer = ref()

onMounted(() => {
  const chart = echarts.init(chartContainer.value)
  
  const option = {
    title: { text: 'نمودار پیشرفت پروژه' },
    xAxis: { type: 'category', data: months },
    yAxis: { type: 'value' },
    series: [{
      name: 'پیشرفت',
      type: 'line',
      data: progressData
    }]
  }
  
  chart.setOption(option)
})
</script>

<template>
  <div ref="chartContainer" class="w-full h-96"></div>
</template>
```

### D3.js Custom Visualizations
```vue
<script setup>
import * as d3 from 'd3'

const svgRef = ref()

onMounted(() => {
  const svg = d3.select(svgRef.value)
  
  // Custom D3 visualization logic
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', d => d.value)
    .attr('fill', 'steelblue')
})
</script>
```

## 🔧 Development Tools & Workflow

### Code Quality
- **ESLint**: Code linting with Antfu config
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting
- **Oxlint**: Additional linting

### Development Experience
- **Hot Module Replacement**: Instant updates
- **Auto-imports**: Automatic component imports
- **TypeScript IntelliSense**: Full IDE support
- **Vue DevTools**: Debugging support

### Build Optimization
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Built-in image optimization
- **Compression**: Gzip/Brotli compression

## 🧪 Testing Strategy

### Component Testing
```typescript
// tests/components/Button.test.ts
import { mount } from '@vue/test-utils'
import Button from '~/components/ui/Button.vue'

describe('Button Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: { label: 'تست' }
    })
    
    expect(wrapper.text()).toContain('تست')
  })
  
  it('emits click event', async () => {
    const wrapper = mount(Button)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### E2E Testing with Playwright
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can login', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('[data-testid="username"]', 'admin')
  await page.fill('[data-testid="password"]', 'password')
  await page.click('[data-testid="login-btn"]')
  
  await expect(page).toHaveURL('/dashboard')
})
```

## 🚀 Deployment

### Static Site Generation
```bash
# Generate static site
bun run generate

# Deploy to static hosting
cp -r .output/public/* /path/to/hosting/
```

### Server-Side Rendering
```bash
# Build for SSR
bun run build

# Start production server
bun run start
```

### Docker Deployment
```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
```

### Environment Variables
```bash
# Production environment
NODE_ENV=production
NUXT_PUBLIC_API_BASE_URL=https://api.alzymer.com
NUXT_PUBLIC_APP_URL=https://alzymer.com
```

## 🎯 Performance Optimization

### Core Web Vitals
- **FCP**: First Contentful Paint < 1.5s
- **LCP**: Largest Contentful Paint < 2.5s  
- **CLS**: Cumulative Layout Shift < 0.1
- **FID**: First Input Delay < 100ms

### Optimization Techniques
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Route-based splitting
- **Prefetching**: Link prefetching
- **Caching**: Browser and CDN caching
- **Tree Shaking**: Dead code elimination

## 📚 Key Features

### 🔐 **Authentication & Authorization**
- JWT token-based authentication
- Role-based access control
- Persian/English login forms
- Secure session management

### 📊 **Dashboard & Analytics**
- Real-time data visualization
- Persian date picker (Jalali calendar)
- Responsive charts and graphs
- Interactive data tables

### 🎨 **UI/UX Features**
- Material Design components (Quasar)
- Dark/Light theme support
- RTL/LTR language switching  
- Mobile-first responsive design
- Accessibility (a11y) compliance

### 📱 **Mobile Support**
- Progressive Web App (PWA) ready
- Touch-friendly interfaces
- Offline capabilities
- Native-like experience

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow coding standards
4. Write tests for new features
5. Commit changes (`git commit -m 'feat: add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

### Code Style Guidelines
- Use **Composition API** for Vue components
- Follow **Vue 3 best practices**
- Write **TypeScript** with strict types
- Use **Pinia** for state management
- Follow **Persian UI/UX patterns**

## 📞 Support & Links

- **Developer**: nekooei1990plus
- **Repository**: [GitHub](https://github.com/nekooei1990plus/alzymer)
- **Issues**: [GitHub Issues](https://github.com/nekooei1990plus/alzymer/issues)
- **Documentation**: [Nuxt 3 Docs](https://nuxt.com)
- **UI Library**: [Quasar Framework](https://quasar.dev)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Nuxt 3, Vue 3, and Quasar UI**

*سیستم مدیریت مهندسی مدرن و کارآمد* 🚀